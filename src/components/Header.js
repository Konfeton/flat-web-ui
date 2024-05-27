// Header.js
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import '../Header.css'; // Import the CSS file for styling
import { jwtDecode } from 'jwt-decode'
import axios from "axios"; // import dependency
import {useNavigate} from "react-router-dom";

function Header() {
    const [userName, setUserName] = useState('');


    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.sub); // Assuming the token has a 'name' field
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserName('');
        // Optionally, you can also remove the default Authorization header
        delete axios.defaults.headers.common["Authorization"];
        alert('Logged out successfully');
        navigate("/");

    };

    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li className="nav-item-left">
                        <Link to="/">Home</Link>
                    </li>
                    {userName ? (
                        <>
                            <Link to="/dashboard">
                                <li className="nav-item-right">
                                    <span>Welcome, {userName}</span>
                                </li>
                            </Link>
                            <li className="nav-item-right">
                                <button onClick={handleLogout} className="btn btn-link">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item-right">
                                <Link to="/register">Register</Link>
                            </li>
                            <li className="nav-item-right">
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
