// Madol Press Admin Logic

const ADMIN_PASSWORD = "0000";

document.addEventListener('DOMContentLoaded', () => {

    // Login Page Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('admin-name').value;
            const passwordInput = document.getElementById('admin-password').value;

            if (passwordInput === ADMIN_PASSWORD) {
                // Success
                localStorage.setItem('adminUser', nameInput);
                window.location.href = 'dashboard.html';
            } else {
                // Fail
                alert('Invalid Password. Access Denied.');
            }
        });
    }

    // Dashboard Logic
    const welcomeMsg = document.getElementById('welcome-msg');
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    if (welcomeMsg || userNameDisplay) {
        // Check auth
        const user = localStorage.getItem('adminUser');
        if (!user) {
            alert('Please login first.');
            window.location.href = 'admin.html';
            return;
        }

        // Update UI
        if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${user}`;
        if (userNameDisplay) userNameDisplay.textContent = user;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminUser');
            window.location.href = 'admin.html';
        });
    }

});
