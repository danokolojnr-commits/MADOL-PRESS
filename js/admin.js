// Madol Press Admin Logic



document.addEventListener('DOMContentLoaded', () => {

    // Login Page Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('admin-name').value;
            const passwordInput = document.getElementById('admin-password').value;
            const errorDiv = document.getElementById('login-error');
            const submitBtn = document.getElementById('login-btn');

            // Reset UI
            errorDiv.style.display = 'none';
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;

            try {
                // Send credentials to PHP backend
                const formData = new FormData();
                formData.append('username', nameInput);
                formData.append('password', passwordInput);

                const response = await fetch('login_process.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Login successful! PHP has created a secure session.
                    window.location.href = 'dashboard.php';
                } else {
                    // Login failed
                    errorDiv.textContent = data.message;
                    errorDiv.style.display = 'block';
                }
            } catch (error) {
                console.error('Login Error:', error);
                errorDiv.textContent = 'System error. Please try again.';
                errorDiv.style.display = 'block';
            } finally {
                submitBtn.textContent = 'Login to Dashboard';
                submitBtn.disabled = false;
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
        // UI Updates are handled by PHP on dashboard.js load
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

    // Login History Logic (From MySQL Database)
    const renderLoginHistory = async () => {
        if (!historyBody) return;

        try {
            const response = await fetch('get_login_history.php');
            const result = await response.json();

            historyBody.innerHTML = '';

            if (result.success) {
                const logs = result.data;

                if (logs.length === 0) {
                    historyBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">No login history found.</td></tr>';
                } else {
                    logs.forEach(log => {
                        const tr = document.createElement('tr');
                        const dateObj = new Date(log.login_time);
                        const formattedDate = dateObj.toLocaleDateString();
                        const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        tr.innerHTML = `
                            <td>${log.username} <span style="font-size: 0.7rem; color: #888; text-transform: capitalize;">(${log.role})</span></td>
                            <td>${formattedDate}</td>
                            <td>${formattedTime}</td>
                        `;
                        historyBody.appendChild(tr);
                    });
                }
            } else {
                historyBody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:red;">Failed to load history.</td></tr>';
            }
        } catch (error) {
            console.error("Failed to load login history:", error);
            historyBody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:red;">System Error.</td></tr>';
        }
    };

    // Customers Logic (From MySQL Database)
    const renderCustomers = async () => {
        if (!customersBody) return;

        try {
            const response = await fetch('get_quotes.php');
            const result = await response.json();

            customersBody.innerHTML = '';

            if (result.success) {
                const customers = result.data;

                if (customers.length === 0) {
                    let colSpan = (typeof adminRoleGlobal !== 'undefined' && adminRoleGlobal === 'super') ? 5 : 4;
                    customersBody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;">No new quote requests found.</td></tr>`;
                } else {
                    customers.forEach(cust => {
                        const tr = document.createElement('tr');
                        // Format the timestamp nicely
                        const dateObj = new Date(cust.created_at);
                        const formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        let actionsHtml = '';
                        if (typeof adminRoleGlobal !== 'undefined' && adminRoleGlobal === 'super') {
                            actionsHtml = `<td><button class="btn btn-secondary delete-quote-btn" data-id="${cust.id}" style="padding: 5px 10px; font-size: 0.8rem; background: #ffebee; color: var(--primary-red); border: 1px solid var(--primary-red);"><i class="fa-solid fa-trash"></i></button></td>`;
                        }

                        tr.innerHTML = `
                            <td>${cust.name}</td>
                            <td><a href="mailto:${cust.email}" style="color: var(--primary-blue); text-decoration: none;">${cust.email}</a></td>
                            <td>${cust.message ? cust.message.substring(0, 50) + (cust.message.length > 50 ? '...' : '') : '-'}</td>
                            <td>${formattedDate}</td>
                            ${actionsHtml}
                        `;
                        customersBody.appendChild(tr);
                    });
                }

                // Update specific stats block for customers
                const statsCustomers = document.getElementById('total-customers');
                if (statsCustomers) statsCustomers.textContent = customers.length;

                // Add event listeners for delete buttons
                document.querySelectorAll('.delete-quote-btn').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const quoteId = e.currentTarget.getAttribute('data-id');
                        if (confirm('Are you sure you want to delete this quote request?')) {
                            const formData = new FormData();
                            formData.append('id', quoteId);

                            try {
                                const delResponse = await fetch('delete_quote.php', {
                                    method: 'POST',
                                    body: formData
                                });
                                const delResult = await delResponse.json();
                                if (delResult.success) {
                                    renderCustomers(); // Refresh
                                } else {
                                    alert(delResult.message);
                                }
                            } catch (err) {
                                alert('Failed to delete quote.');
                            }
                        }
                    });
                });

            } else {
                let colSpan = (typeof adminRoleGlobal !== 'undefined' && adminRoleGlobal === 'super') ? 5 : 4;
                customersBody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center; color:red;">Error loading quotes.</td></tr>`;
            }
        } catch (error) {
            console.error("Failed to load quotes:", error);
            customersBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:red;">System Error.</td></tr>';
        }
    };

    // Stats Logic
    const updateDashboardStats = () => {
        const statsProjects = document.getElementById('total-projects');
        const projects = JSON.parse(localStorage.getItem('madol_projects')) || [];
        if (statsProjects) statsProjects.textContent = projects.length;

        // Note: total-customers is now updated directly inside renderCustomers()
        // so it stays perfectly synced with the database.
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

        const isSuper = (typeof adminRoleGlobal !== 'undefined' && adminRoleGlobal === 'super');

        projects.forEach((proj, index) => {
            const tr = document.createElement('tr');

            // Status color mapping
            const statusColor = proj.status === 'review' ? 'purple' : proj.status === 'in progress' ? 'pink' : 'orange';

            // Role based UI rendering
            const titleHtml = isSuper ?
                `<input type="text" class="editable-title" value="${proj.title}" data-index="${index}">` :
                `<span>${proj.title}</span>`;

            const selectHtml = isSuper ? `
                        <select class="status-select" data-index="${index}">
                            <option value="pending" ${proj.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="in progress" ${proj.status === 'in progress' ? 'selected' : ''}>In Progress</option>
                            <option value="review" ${proj.status === 'review' ? 'selected' : ''}>Review</option>
                        </select>` : `<span style="text-transform: capitalize;">${proj.status}</span>`;

            const actionsHtml = isSuper ? `<td><i class="fa-solid fa-trash btn-delete" data-index="${index}"></i></td>` : `<td>-</td>`;

            tr.innerHTML = `
                <td>${titleHtml}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="status ${statusColor}"></span>
                        ${selectHtml}
                    </div>
                </td>
                ${actionsHtml}
            `;
            tableBody.appendChild(tr);
        });

        // Add Event Listeners to dynamic elements only for super users
        if (isSuper) {
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

            // Show Add Project Button
            const addBtnWrap = document.getElementById('add-project-btn');
            if (addBtnWrap) addBtnWrap.style.display = 'inline-block';
        } else {
            // Hide Add Project Button for Staff
            const addBtnWrap = document.getElementById('add-project-btn');
            if (addBtnWrap) addBtnWrap.style.display = 'none';
        }

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
    renderCustomers(); // Added so stats update immediately on load
    if (typeof adminRoleGlobal !== 'undefined' && adminRoleGlobal === 'super') {
        renderLoginHistory();
    }
    updateDashboardStats();

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'logout.php';
        });
    }

});
