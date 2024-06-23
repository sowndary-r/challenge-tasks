// AdminNavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.css'
function AdminNavBar() {
    return (
        <nav className="admin-nav">
             <Link to="/admin-login">Admin Login</Link>
        </nav>
    );
}

export default AdminNavBar;
