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
        if (!dashboardView || !customersView) return; // Core views

        // Hide all first
        if (dashboardView) dashboardView.style.display = 'none';
        if (accountsView) accountsView.style.display = 'none';
        if (customersView) customersView.style.display = 'none';

        // Remove active class
        if (navDashboard) navDashboard.classList.remove('active');
        if (navAccounts) navAccounts.classList.remove('active');
        if (navCustomers) navCustomers.classList.remove('active');

        if (view === 'dashboard') {
            if (dashboardView) dashboardView.style.display = 'block';
            if (navDashboard) navDashboard.classList.add('active');
            const user = localStorage.getItem('adminUser');
            if (user) viewTitle.textContent = `Welcome, ${user}`;
        } else if (view === 'accounts') {
            if (accountsView) accountsView.style.display = 'block';
            if (navAccounts) navAccounts.classList.add('active');
            viewTitle.textContent = 'Account Access History';
            renderLoginHistory();
        } else if (view === 'customers') {
            if (customersView) customersView.style.display = 'block';
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

    // Clear History Logic
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn && typeof adminRoleGlobal !== 'undefined' && adminRoleGlobal === 'super') {
        clearHistoryBtn.addEventListener('click', async () => {
            if (confirm('Are you SURE you want to clear all login history? This cannot be undone.')) {
                try {
                    const response = await fetch('clear_history.php', { method: 'POST' });
                    const result = await response.json();

                    if (result.success) {
                        alert(result.message);
                        renderLoginHistory(); // Refresh table
                    } else {
                        alert(result.message);
                    }
                } catch (err) {
                    console.error('Error clearing history:', err);
                    alert('Failed to clear history due to a system error.');
                }
            }
        });
    }

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

    // Clear All Quotes Logic
    const clearQuotesBtn = document.getElementById('clear-quotes-btn');
    if (clearQuotesBtn && typeof adminRoleGlobal !== 'undefined' && adminRoleGlobal === 'super') {
        clearQuotesBtn.addEventListener('click', async () => {
            if (confirm('Are you SURE you want to delete ALL customer quotes? This cannot be undone.')) {
                try {
                    const response = await fetch('clear_quotes.php', { method: 'POST' });
                    const result = await response.json();

                    if (result.success) {
                        alert(result.message);
                        renderCustomers(); // Refresh table
                    } else {
                        alert(result.message);
                    }
                } catch (err) {
                    console.error('Error clearing quotes:', err);
                    alert('Failed to clear quotes due to a system error.');
                }
            }
        });
    }

    // Stats Logic
    const updateDashboardStats = () => {
        const statsProjects = document.getElementById('total-projects');
        if (statsProjects) statsProjects.textContent = projects.length;

        // Note: total-customers is now updated directly inside renderCustomers()
        // so it stays perfectly synced with the database.
    };

    // Projects CRUD Logic (From MySQL Database)
    let projects = [];

    const fetchProjects = async () => {
        try {
            const response = await fetch('get_projects.php');
            const result = await response.json();
            if (result.success) {
                projects = result.data;
                renderProjects();
            } else {
                console.error("Failed to fetch projects");
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
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
                input.addEventListener('change', async (e) => {
                    const idx = e.target.getAttribute('data-index');
                    const projId = projects[idx].id;
                    const newTitle = e.target.value;

                    projects[idx].title = newTitle;

                    const formData = new FormData();
                    formData.append('id', projId);
                    formData.append('title', newTitle);

                    try {
                        await fetch('update_project.php', { method: 'POST', body: formData });
                    } catch (err) {
                        console.error('Failed to update title', err);
                    }
                });
            });

            document.querySelectorAll('.status-select').forEach(select => {
                select.addEventListener('change', async (e) => {
                    const idx = e.target.getAttribute('data-index');
                    const projId = projects[idx].id;
                    const newStatus = e.target.value;

                    projects[idx].status = newStatus;

                    const formData = new FormData();
                    formData.append('id', projId);
                    formData.append('status', newStatus);

                    try {
                        await fetch('update_project.php', { method: 'POST', body: formData });
                        updateDashboardStats();
                    } catch (err) {
                        console.error('Failed to update status', err);
                    }
                });
            });

            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const idx = e.target.getAttribute('data-index');
                    const projId = projects[idx].id;

                    if (confirm("Are you sure you want to delete this project?")) {
                        const formData = new FormData();
                        formData.append('id', projId);

                        try {
                            const res = await fetch('delete_project.php', { method: 'POST', body: formData });
                            const result = await res.json();
                            if (result.success) {
                                fetchProjects(); // Refresh from DB
                            } else {
                                alert(result.message);
                            }
                        } catch (err) {
                            console.error('Failed to delete project', err);
                        }
                    }
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
        saveBtn.addEventListener('click', async () => {
            const titleInput = document.getElementById('new-project-title');
            const statusSelect = document.getElementById('new-project-status');

            if (titleInput.value.trim() === '') {
                alert('Please enter a project title');
                return;
            }

            const formData = new FormData();
            formData.append('title', titleInput.value);
            formData.append('status', statusSelect.value);

            try {
                const response = await fetch('save_project.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Reset form
                    titleInput.value = '';
                    formContainer.style.display = 'none';
                    addBtn.style.display = 'block';

                    fetchProjects(); // Refresh table
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Failed to save project:", error);
                alert("System error. Try again.");
            }
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
    fetchProjects();
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
