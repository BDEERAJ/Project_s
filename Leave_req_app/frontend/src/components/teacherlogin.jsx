import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css'; // Assuming you have a shared style for auth pages

// You might need to import your assets if they are used, or adjust styling
// import pic from '../assets/teacher_login.png'; 

export default function TeacherLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Use the correct backend endpoint for teacher login
            const response = await axios.post('https://leave-tracker-czmf.onrender.com/auth/teacher/login', formData);

            const { token } = response.data;

            if (!token) {
                throw new Error('Login successful, but no token was received.');
            }
            
            // Store the token and navigate to the teacher dashboard
            localStorage.setItem('Token', token);
            navigate('/Teacher/dashboard', { replace: true });

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            console.error("Login Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth_container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="auth_card card p-4 shadow">
                <div className="card-body">
                    <h3 className="auth_header_text text-center mb-4">Teacher Login</h3>
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
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="mb-4 input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {/* Using Bootstrap Icons */}
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                        
                        {error && (
                            <div className="alert alert-danger p-2 mb-3">
                                {error}
                            </div>
                        )}

                        <div className="d-grid">
                            <button type="submit" className="auth_button btn btn-primary" disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <div className="auth_switch_link text-center mt-3">
                        <span>Don't have an account? </span>
                        <a href="#" onClick={() => navigate("/Teacher/signup", { replace: true })}>Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
