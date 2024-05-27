import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import axiosInstance from "../util/axiosInstance";


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    let navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/login', formData);
            const token = response.data.token;

            // Save the token to localStorage or any other secure storage
            localStorage.setItem('token', token);

            // Set default authorization header
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            alert('Login successful');
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Login failed');
        }
    };

    return (
        <div className="container mt-5">
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>

            <div style={{height:360}}></div>
        </div>
    );
};

export default Login;
