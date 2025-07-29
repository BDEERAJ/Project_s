import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import pic from '../assets/Student_login.png';
import eyehider from "../assets/eyehider.svg";
import '../styles/login.css';

const ipborder = {
    border: 'none',
    borderBottom: '2px solid #b7b7b7',
    outline: 'none',
    width: '100%',
    padding: '8px 4px',
    backgroundColor: 'transparent'
};

const StudentLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // State to hold login errors
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const eyeRef = useRef();
    let pswdhelper = true;

    const pswdhider = () => {
        if (pswdhelper) {
            eyeRef.current.style.backgroundColor = 'blue';
            passwordRef.current.type = 'text';
            pswdhelper = false;
        } else {
            pswdhelper = true;
            eyeRef.current.style.backgroundColor = 'transparent';
            passwordRef.current.type = 'password';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            // Make a POST request to your student login endpoint
            const res = await axios.post("http://localhost:3000/auth/student/login", {
                email,
                password
            });

            // Assuming the server responds with a token
            const { token } = res.data;

            if (token) {
                // Save the token to local storage
                window.localStorage.setItem('Token', token);
                // Navigate to the student dashboard on successful login
                navigate('/student/dashboard', { replace: true });
            } else {
                setError("Login failed. Please try again.");
            }

        } catch (err) {
            // Display error message from the server, or a generic one
            setError(err.response?.data?.message || "An error occurred during login.");
            console.error("Login failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 m-0 p-0 vw-100" style={{ fontFamily: 'Poppins' }}>
            <div className="row h-100 m-0 w=100">
                {/* Left: Login Form */}
                <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center text-white bg-black p-0">
                    <div className="w-75">
                        <h1 className="mb-1 text-primary">Student Login</h1>
                        <article className='mb-4' style={{ color: '#b7b7b7' }}>Enter your account details</article>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 ">
                                <label className="form-label ">Email</label>
                                <input
                                    type="email"
                                    className=' text-white'
                                    placeholder="Enter email"
                                    ref={emailRef}
                                    style={ipborder}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                    <img
                                        src={eyehider}
                                        alt="Hide password"
                                        ref={eyeRef}
                                        className="ms-2"
                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        onClick={pswdhider}
                                    />
                                </label>
                                <input
                                    className='password2 text-white'
                                    type="password"
                                    placeholder="Enter password"
                                    ref={passwordRef}
                                    style={ipborder}
                                    required
                                />
                            </div>
                            
                            {/* Display error message if it exists */}
                            {error && <div className="alert alert-danger p-2">{error}</div>}

                            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>

                    <p className='m-3'>
                        Don't have an account?
                        <a className='m-2' style={{cursor: 'pointer'}} onClick={() => navigate('/Student/sign-up', { replace: true })}>Sign-up</a>
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
                        alt="Login Visual"
                        className="w-75 h-60"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
