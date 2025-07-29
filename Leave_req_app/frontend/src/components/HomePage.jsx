import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [studentHover, setStudentHover] = useState(false);
    const [teacherHover, setTeacherHover] = useState(false);

    const handleSelect = (role) => {
        navigate(role);
    };
 
    const pageStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        color: 'white',
        fontFamily: "'Poppins', sans-serif", // A more modern font
    };

    const cardStyle = {
        padding: '2.5rem',
        borderRadius: '1.5rem',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '700px',
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    };

    const headingStyle = {
        fontSize: '2.5rem',
        fontWeight: '600',
        letterSpacing: '1px'
    };
    
    const paragraphStyle = {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#e0e0e0'
    };

    const baseButtonStyle = {
        padding: '0.8rem 2rem',
        fontSize: '1.1rem',
        fontWeight: '500',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    };

    const studentButtonStyle = {
        ...baseButtonStyle,
        background: studentHover ? '#fff' : 'linear-gradient(to right, #2980b9, #6dd5fa)',
        color: studentHover ? '#2980b9' : '#fff',
        transform: studentHover ? 'translateY(-3px)' : 'none'
    };

    const teacherButtonStyle = {
        ...baseButtonStyle,
        background: teacherHover ? '#fff' : 'linear-gradient(to right, #11998e, #38ef7d)',
        color: teacherHover ? '#11998e' : '#fff',
        transform: teacherHover ? 'translateY(-3px)' : 'none'
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center p-3"
            style={pageStyle}
        >
            <div style={cardStyle}>
                <h1 className="mb-3" style={headingStyle}>
                    Welcome to Leave Tracker
                </h1>
                <p className="mb-4" style={paragraphStyle}>
                    A seamless platform for students and teachers to manage leave requests efficiently. Get started by selecting your role below.
                </p>
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                    <button
                        onClick={() => handleSelect('/Student/login')}
                        style={studentButtonStyle}
                        onMouseEnter={() => setStudentHover(true)}
                        onMouseLeave={() => setStudentHover(false)}
                    >
                        I am a Student
                    </button>
                    <button
                        onClick={() => handleSelect('/Teacher/login')}
                        style={teacherButtonStyle}
                        onMouseEnter={() => setTeacherHover(true)}
                        onMouseLeave={() => setTeacherHover(false)}
                    >
                        I am a Teacher
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;