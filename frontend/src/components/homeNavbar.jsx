import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.css'
function HomeNavBar() {
    return (
        <nav className="admin-nav">
             <Link to="/">Home</Link>
        </nav>
    );
}

export default HomeNavBar;