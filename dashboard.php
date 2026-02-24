<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Madol Press | Admin Dashboard</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;700;800&display=swap"
        rel="stylesheet">

    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- CSS -->
    <link rel="stylesheet" href="css/admin.css">

    <!-- Dynamic Favicon -->
    <link id="dynamic-favicon" rel="icon" type="image/png" href="images/favicon-red.png">
</head>

<body>

    <div class="dashboard-container">

        <!-- Sidebar -->
        <div class="sidebar">
            <a href="index.php" class="sidebar-brand" style="text-decoration: none;">
                <i class="fa-solid fa-print"></i>
                Madol<span style="color: var(--primary-red);">Press</span>
            </a>

            <div class="sidebar-menu">
                <ul>
                    <li>
                        <a href="#" class="active" id="nav-dashboard"><i class="fa-solid fa-gauge-high"></i>
                            Dashboard</a>
                    </li>
                    <li>
                        <a href="#" id="nav-customers"><i class="fa-solid fa-users"></i> Customers</a>
                    </li>
                    <li>
                        <a href="#" id="nav-accounts"><i class="fa-solid fa-user-gear"></i> Accounts</a>
                    </li>

                    <li>
                        <a href="#" id="logout-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <header class="header">
                <div class="header-title">
                    <h2 id="view-title">Dashboard</h2>
                    <small style="color: #ccc; font-size: 0.7rem; opacity: 0.5;">System v0.4c</small>
                </div>

                <div class="user-profile">
                    <button id="theme-toggle"
                        style="background: none; border: none; cursor: pointer; font-size: 1.2rem; margin-right: 15px; color: var(--text-light);">
                        <i class="fa-solid fa-moon"></i>
                    </button>
                    <div class="user-info">
                        <h4 id="user-name-display">Administrator</h4>
                        <small>Super Admin</small>
                    </div>
                    <!-- Sample Avatar -->
                    <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="User"
                        class="user-img">
                </div>
            </header>

            <!-- Dashboard View -->
            <div id="dashboard-view">
                <!-- Cards -->
                <div class="stats-grid">
                    <div class="card">
                        <div class="card-info">
                            <h3 id="total-customers">54</h3>
                            <p>Customers</p>
                        </div>
                        <div class="card-icon icon-red">
                            <i class="fa-solid fa-users"></i>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-info">
                            <h3 id="total-projects">79</h3>
                            <p>Projects</p>
                        </div>
                        <div class="card-icon icon-blue">
                            <i class="fa-solid fa-clipboard-check"></i>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-info">
                            <h3>₦6k</h3>
                            <p>Income</p>
                        </div>
                        <div class="card-icon icon-purple">
                            <i class="fa-solid fa-wallet"></i>
                        </div>
                    </div>
                </div>

                <!-- Recent Projects -->
                <div class="recent-grid">
                    <div class="table-card">
                        <div class="card-header">
                            <h3>Recent Projects</h3>
                            <button id="add-project-btn" class="btn-main" style="border: none; cursor: pointer;">
                                <i class="fa-solid fa-plus"></i> Add Project
                            </button>
                        </div>

                        <!-- Add Project Form (Modal-like Inline) -->
                        <div id="project-form-container"
                            style="display: none; margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px; border: 1px solid #eee;">
                            <div style="display: flex; gap: 10px; align-items: flex-end; flex-wrap: wrap;">
                                <div style="flex: 1; min-width: 200px;">
                                    <label style="display: block; font-size: 0.8rem; margin-bottom: 5px;">Project
                                        Title</label>
                                    <input type="text" id="new-project-title" class="form-control" style="padding: 8px;"
                                        placeholder="e.g. Wedding Cards">
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; margin-bottom: 5px;">Initial
                                        Status</label>
                                    <select id="new-project-status" class="form-control" style="padding: 8px;">
                                        <option value="pending">Pending</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="review">Review</option>
                                    </select>
                                </div>
                                <button id="save-project-btn" class="btn-main"
                                    style="border: none; padding: 10px 20px;">Save</button>
                                <button id="cancel-project-btn"
                                    style="background: #ccc; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Cancel</button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Project Title</td>
                                        <td>Status</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody id="projects-table-body">
                                    <!-- Projects will be rendered here by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Accounts View (Login History) -->
            <div id="accounts-view" style="display: none;">
                <div class="recent-grid">
                    <div class="table-card">
                        <div class="card-header">
                            <h3>Login History</h3>
                            <p style="color: var(--text-light); font-size: 0.9rem;">Total history of admin logins</p>
                        </div>

                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <td>User Name</td>
                                        <td>Date</td>
                                        <td>Time</td>
                                    </tr>
                                </thead>
                                <tbody id="login-history-body">
                                    <!-- History will be rendered here by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Customers View -->
            <div id="customers-view" style="display: none;">
                <div class="recent-grid">
                    <div class="table-card">
                        <div class="card-header">
                            <h3>Potential Customers</h3>
                            <p style="color: var(--text-light); font-size: 0.9rem;">Quote requests from website</p>
                        </div>

                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Project Details</td>
                                        <td>Date</td>
                                    </tr>
                                </thead>
                                <tbody id="customers-table-body">
                                    <!-- Customers will be rendered here by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script src="js/admin.js?v=4"></script>
</body>

</html>