import React, { useState } from 'react';
import './AuthPop.css';

const AuthPopup = ({ onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Handle login logic
            console.log("Login submitted with:", formData.email, formData.password);
            // Add your actual authentication logic here
            onLoginSuccess(); // Call this when login is successful
        } else {
            // Handle signup logic
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            console.log("Signup submitted with:", formData);
            // Add your actual registration logic here
            onLoginSuccess(); // You might want to handle this differently for signup
        }
    };

    return (
        <div className="auth-popup-overlay">
            <div className="auth-popup">
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="auth-tabs">
                    <button
                        className={`tab-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="auth-content">
                    {isLogin ? (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <h3>Welcome Back</h3>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button type="submit" className="auth-submit-btn">Login</button>
                            <p className="auth-switch">
                                Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up</span>
                            </p>
                        </form>
                    ) : (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <h3>Create Account</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button type="submit" className="auth-submit-btn">Sign Up</button>
                            <p className="auth-switch">
                                Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPopup;