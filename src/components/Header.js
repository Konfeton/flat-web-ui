// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'; // Import the CSS file for styling

function Header() {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li className="nav-item-left">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item-right">
                        <Link to="/news">News</Link>
                    </li>
                    <li className="nav-item-right">
                        <Link to="/statistics">Analytics</Link>
                    </li>
                    <li className="nav-item-right">
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
