import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pic from '../assets/Student_login.png';
import eyehider from "../assets/eyehider.svg";
import '../styles/login.css';

const ipborder = {
    border: 'none',
    borderBottom: '2px solid #b7b7b7',
    outline: 'none',
    width: '100%',
    padding: '8px 4px',
    backgroundColor: 'transparent',
    color: 'white' // Added for better visibility on a black background
};

const StudentSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Use a single state object for all form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        year: '',
        group: '',
        rollNo: ''
    });

    // A single handler for all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Use the correct backend endpoint with axios
            const res = await axios.post("https://leave-tracker-czmf.onrender.com/auth/student/signup", formData);

            const { token } = res.data;

            if (token) {
                // On success, store the token and navigate the user
                localStorage.setItem('Token', token); // Use consistent key 'Token'
                navigate('/student/dashboard', { replace: true }); // Navigate to the correct dashboard
            } else {
                throw new Error('Sign up successful, but no token received.');
            }

        } catch (err) {
            // If the server responds with an error, display it
            setError(err.response?.data?.message || 'Failed to sign up.');
            console.error("Fetch failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 m-0 p-0 vw-100" style={{ fontFamily: 'Poppins', backgroundColor: 'black', overflow: 'hidden' }}>
            <div className="row h-100 m-0">
                <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center text-white bg-black p-4">
                    <div className="w-75">
                        <h1 className="mb-1 text-primary">Student Sign-Up</h1>
                        <article className='mb-3' style={{ color: '#b7b7b7' }}>Enter your details to create an account</article>

                        <form onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="mb-2">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} style={ipborder} required />
                            </div>

                            {/* Email Input */}
                            <div className="mb-2">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} style={ipborder} required />
                            </div>
                            
                            {/* Year Input */}
                            <div className="mb-2">
                                <label className="form-label">Year</label>
                                <input type="text" name="year" placeholder="e.g., 3rd Year" value={formData.year} onChange={handleChange} style={ipborder} required />
                            </div>

                            {/* Group Input */}
                            <div className="mb-2">
                                <label className="form-label">Group / Department</label>
                                <input type="text" name="group" placeholder="e.g., Computer Science" value={formData.group} onChange={handleChange} style={ipborder} required />
                            </div>

                            {/* Roll No Input */}
                            <div className="mb-2">
                                <label className="form-label">Roll No</label>
                                <input type="text" name="rollNo" placeholder="Enter your roll number" value={formData.rollNo} onChange={handleChange} style={ipborder} required />
                            </div>

                            {/* Password Input */}
                            <div className="mb-2">
                                <label className="form-label">
                                    Password
                                    <img src={eyehider} alt="Toggle password visibility" onClick={togglePasswordVisibility} className="ms-2" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                                </label>
                                <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} style={ipborder} required />
                            </div>

                            {error && <div className="alert alert-danger mt-3 p-2">{error}</div>}

                            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                        </form>
                    </div>

                    <p className='mt-4'>
                        Already have an account?
                        <a className='m-2' onClick={() => navigate('/student/login')} style={{ cursor: 'pointer' }}>Login</a>
                    </p>
                </div>

                {/* Right: Visual Section */}
                <div className="col-lg-7 d-none d-xl-block d-lg-block justify-content-center align-items-center"
                    style={{
                        backgroundColor: 'blueviolet',
                        paddingTop: '3%',
                        paddingLeft: "9%"
                    }}>
                    <h1 className='mb-1 text-white' style={{ width: '35vw', marginLeft: '15%', fontWeight: 'bolder' }}>Welcome to </h1>
                    <h2 className='mb-3 text-white' style={{ width: '35vw', marginLeft: '15%' }}>student portal</h2>
                    <img
                        src={pic}
                        alt="A visual representing the student portal"
                        className="w-75 h-60"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentSignup;
