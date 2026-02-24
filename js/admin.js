// Madol Press Admin Logic



document.addEventListener('DOMContentLoaded', () => {

    // Login Page Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('admin-name').value;
            const passwordInput = document.getElementById('admin-password').value;

            // Hardcoded Credentials
            const CREDENTIALS = {
                "0000": "super",
                "999": "regular"
            };

            if (CREDENTIALS[passwordInput]) {
                const role = CREDENTIALS[passwordInput];

                // Record Login Event
                const now = new Date();
                const loginEntry = {
                    name: nameInput,
                    role: role,
                    date: now.toLocaleDateString(),
                    time: now.toLocaleTimeString()
                };

                let logs = JSON.parse(localStorage.getItem('madol_login_logs')) || [];
                logs.unshift(loginEntry);
                localStorage.setItem('madol_login_logs', JSON.stringify(logs));

                // Success
                localStorage.setItem('adminUser', nameInput);
                localStorage.setItem('adminRole', role); // Store the role!
                window.location.href = 'dashboard.php';
            } else {
                // Fail
                alert('Invalid Password. Access Denied.');
            }
        });
    }

    // Dashboard Logic
    const viewTitle = document.getElementById('view-title');
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');
    const tableBody = document.getElementById('projects-table-body');
    const historyBody = document.getElementById('login-history-body');
    const customersBody = document.getElementById('customers-table-body');

    // View Selectors
    const dashboardView = document.getElementById('dashboard-view');
    const accountsView = document.getElementById('accounts-view');
    const customersView = document.getElementById('customers-view');

    // Navigation Links
    const navDashboard = document.getElementById('nav-dashboard');
    const navAccounts = document.getElementById('nav-accounts');
    const navCustomers = document.getElementById('nav-customers');

    if (viewTitle || userNameDisplay) {
        // Check auth
        const user = localStorage.getItem('adminUser');
        if (!user) {
            alert('Please login first.');
            window.location.href = 'admin.php';
            return;
        }

        // Update UI
        if (viewTitle) viewTitle.textContent = `Welcome, ${user}`;
        if (userNameDisplay) userNameDisplay.textContent = user;

        const userImg = document.querySelector('.user-img');
        if (userImg) userImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user)}&background=random&color=fff`;
    }

    // View Switching Logic
    const switchView = (view) => {
        if (!dashboardView || !accountsView || !customersView) return;

        // Hide all first
        dashboardView.style.display = 'none';
        accountsView.style.display = 'none';
        customersView.style.display = 'none';

        // Remove active class
        if (navDashboard) navDashboard.classList.remove('active');
        if (navAccounts) navAccounts.classList.remove('active');
        if (navCustomers) navCustomers.classList.remove('active');

        if (view === 'dashboard') {
            dashboardView.style.display = 'block';
            if (navDashboard) navDashboard.classList.add('active');
            const user = localStorage.getItem('adminUser');
            viewTitle.textContent = `Welcome, ${user}`;
        } else if (view === 'accounts') {
            accountsView.style.display = 'block';
            if (navAccounts) navAccounts.classList.add('active');
            viewTitle.textContent = 'Account Access History';
            renderLoginHistory();
        } else if (view === 'customers') {
            customersView.style.display = 'block';
            if (navCustomers) navCustomers.classList.add('active');
            viewTitle.textContent = 'Potential Customers';
            renderCustomers();
        }
    };

    if (navDashboard) navDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView('dashboard'); });
    if (navAccounts) navAccounts.addEventListener('click', (e) => { e.preventDefault(); switchView('accounts'); });
    if (navCustomers) navCustomers.addEventListener('click', (e) => { e.preventDefault(); switchView('customers'); });

    // Login History Logic
    const renderLoginHistory = () => {
        if (!historyBody) return;
        const logs = JSON.parse(localStorage.getItem('madol_login_logs')) || [];
        historyBody.innerHTML = '';

        logs.forEach(log => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${log.name}</td>
                <td>${log.date}</td>
                <td>${log.time}</td>
            `;
            historyBody.appendChild(tr);
        });
    };

    // Customers Logic
    const renderCustomers = () => {
        if (!customersBody) return;
        const customers = JSON.parse(localStorage.getItem('madol_customers')) || [];
        customersBody.innerHTML = '';

        customers.forEach(cust => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cust.name}</td>
                <td><a href="mailto:${cust.email}" style="color: var(--primary-blue); text-decoration: none;">${cust.email}</a></td>
                <td>${cust.details}</td>
                <td>${cust.date || '-'}</td>
            `;
            customersBody.appendChild(tr);
        });

        updateDashboardStats(); // Ensure count is correct
    };

    // Stats Logic
    const updateDashboardStats = () => {
        const statsCustomers = document.getElementById('total-customers');
        const statsProjects = document.getElementById('total-projects');

        const customers = JSON.parse(localStorage.getItem('madol_customers')) || [];
        const projects = JSON.parse(localStorage.getItem('madol_projects')) || [];

        if (statsCustomers) statsCustomers.textContent = customers.length;
        if (statsProjects) statsProjects.textContent = projects.length;
    };

    // Projects CRUD Logic
    let projects = JSON.parse(localStorage.getItem('madol_projects')) || [
        { id: 1, title: "Fashion Magazine Vol. 12", status: "review" },
        { id: 2, title: "Daily Times Newspaper", status: "in progress" },
        { id: 3, title: "University Yearbook 2026", status: "pending" }
    ];

    const saveProjects = () => {
        localStorage.setItem('madol_projects', JSON.stringify(projects));
        renderProjects();
    };

    const renderProjects = () => {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        projects.forEach((proj, index) => {
            const tr = document.createElement('tr');

            // Status color mapping
            const statusColor = proj.status === 'review' ? 'purple' : proj.status === 'in progress' ? 'pink' : 'orange';

            tr.innerHTML = `
                <td>
                    <input type="text" class="editable-title" value="${proj.title}" data-index="${index}">
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="status ${statusColor}"></span>
                        <select class="status-select" data-index="${index}">
                            <option value="pending" ${proj.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="in progress" ${proj.status === 'in progress' ? 'selected' : ''}>In Progress</option>
                            <option value="review" ${proj.status === 'review' ? 'selected' : ''}>Review</option>
                        </select>
                    </div>
                </td>
                <td>
                    <i class="fa-solid fa-trash btn-delete" data-index="${index}"></i>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Add Event Listeners to dynamic elements
        document.querySelectorAll('.editable-title').forEach(input => {
            input.addEventListener('change', (e) => {
                const idx = e.target.getAttribute('data-index');
                projects[idx].title = e.target.value;
                localStorage.setItem('madol_projects', JSON.stringify(projects));
            });
        });

        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const idx = e.target.getAttribute('data-index');
                projects[idx].status = e.target.value;
                saveProjects();
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                projects.splice(idx, 1);
                saveProjects();
            });
        });

        updateDashboardStats();
    };

    // Table Controls
    const addBtn = document.getElementById('add-project-btn');
    const formContainer = document.getElementById('project-form-container');
    const saveBtn = document.getElementById('save-project-btn');
    const cancelBtn = document.getElementById('cancel-project-btn');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            formContainer.style.display = 'block';
            addBtn.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            formContainer.style.display = 'none';
            addBtn.style.display = 'block';
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const titleInput = document.getElementById('new-project-title');
            const statusSelect = document.getElementById('new-project-status');

            if (titleInput.value.trim() === '') {
                alert('Please enter a project title');
                return;
            }

            const newProject = {
                id: Date.now(),
                title: titleInput.value,
                status: statusSelect.value
            };

            projects.push(newProject);
            saveProjects();

            // Reset form
            titleInput.value = '';
            formContainer.style.display = 'none';
            addBtn.style.display = 'block';
        });
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('madol_theme');

    // Apply stored theme on load
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeToggle.style.color = '#f1c40f'; // Yellow sun
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            // Update Icon
            if (isDark) {
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
                themeToggle.style.color = '#f1c40f';
                localStorage.setItem('madol_theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
                themeToggle.style.color = 'var(--text-light)';
                localStorage.setItem('madol_theme', 'light');
            }
        });
    }

    // Initial render
    renderProjects();
    updateDashboardStats();

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminUser');
            window.location.href = 'admin.php';
        });
    }

});
