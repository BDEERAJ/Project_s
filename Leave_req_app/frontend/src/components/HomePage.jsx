import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleSelect = (role) => {
        navigate(role);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <div className="home-page d-flex align-items-center justify-content-center p-3">
                <div className="welcome-card">
                    <h1 className="welcome-heading mb-3">
                        Welcome to Leave Tracker
                    </h1>
                    <p className="welcome-paragraph mb-4">
                        A seamless platform for students and teachers to manage leave requests efficiently. Get started by selecting your role below.
                    </p>
                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                        <button
                            onClick={() => handleSelect('/Student/login')}
                            className="role-button btn-student"
                        >
                            I am a Student
                        </button>
                        <button
                            onClick={() => handleSelect('/Teacher/login')}
                            className="role-button btn-teacher"
                        >
                            I am a Teacher
                        </button>
                    </div>
                    <div className="mt-4">
                        <button className="btn-how-to-use" onClick={toggleModal}>
                            How to Use This App?
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h5 className="modal-title">How Leave Tracker Works</h5>
                            <button className="modal-close-btn" onClick={toggleModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <hr />
                            <div>
                                <h5>👩‍🏫 For Teachers</h5>
                                <p>1. Sign up to get your unique ID and password.</p>
                                <p>2. Share this ID and password with your students.</p>
                                <p>3. View incoming leave requests on your dashboard.</p>
                                <p>4. Approve or reject any request with one click.</p>
                            </div>
                            <hr />
                            <div>
                                <h5>🧑‍🎓 For Students</h5>
                                <p>1. Sign up for your own student account.</p>
                                <p>2. Add a teacher using their unique ID and password.</p>
                                <p>3. Fill out the form to send a leave request.</p>
                                <p>4. Check your dashboard for the approval status.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                             <button className="role-button" onClick={toggleModal}>
                                Got it!
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;