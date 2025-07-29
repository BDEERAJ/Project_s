import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css'; // Assuming you have a shared style for auth pages

export default function TeacherSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        uniqueId: '',
        passkey: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://leave-tracker-czmf.onrender.com/auth/teacher/signup', formData);
            setSuccess('Registration successful! Redirecting to login...');
            setFormData({ name: '', uniqueId: '', passkey: '', email: '', password: '' });
            window.localStorage.setItem('Token',response.data.token)
            navigate('/Teacher/dashboard', { replace: true });

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            console.error("Signup Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth_container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="auth_card card p-4 shadow">
                <div className="card-body">
                    <h3 className="auth_header_text text-center mb-4">Create Teacher Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="teacherName" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="teacherName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Dr. Evelyn Reed"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uniqueId" className="form-label">Unique ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="uniqueId"
                                name="uniqueId"
                                value={formData.uniqueId}
                                onChange={handleChange}
                                placeholder="Enter the ID provided by your institution"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passkey" className="form-label">Passkey</label>
                            <input
                                type="text"
                                className="form-control"
                                id="passkey"
                                name="passkey"
                                value={formData.passkey}
                                onChange={handleChange}
                                placeholder="Enter the passkey for your account"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g., name@example.com"
                                required
                            />
                        </div>
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
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>

                        {error && <div className="alert alert-danger p-2 mb-3">{error}</div>}
                        {success && <div className="alert alert-success p-2 mb-3">{success}</div>}

                        <div className="d-grid">
                            <button type="submit" className="auth_button btn btn-primary" >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                    <div className="auth_switch_link text-center mt-3">
                        <span>Already have an account? </span>
                        <a href="#" onClick={() => navigate("/Teacher/login", { replace: true })}>Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
