import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/StudentDashboard.css'
import axios from 'axios';
import {
    StudentProfilePage,
    RequestLeavePage,
    RequestStatusPage,
    SavedTeachersPage,
    AddTeacherPage
} from './StudentDashboardComponents.jsx';

function App() {
    const [activePage, setActivePage] = useState('profile');
    const [teachers, setTeachers] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [studentProfile, setStudentProfile] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'https://leave-tracker-czmf.onrender.com';

    const fetchDashboardData = async () => {
        const token = window.localStorage.getItem('Token');
        if (!token) {
            setError('Authentication token not found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/data/student/dashboard-data`, {
                headers: { "authorization":`Bearer ${token}` }
            });
            
            const { profile, requests } = response.data;
            setStudentProfile(profile);
            setLeaveRequests(requests);
            setTeachers(profile['savedTeachers'] || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch data.');
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : '';
    }, [isDarkMode]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const addTeacher = async (teacherCredentials) => {
        const token = window.localStorage.getItem('Token');
        try {
            await axios.put(`${API_BASE_URL}/tasks/student/add-teacher`, teacherCredentials, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            await fetchDashboardData();
        } catch (err) {
            console.error('Error adding teacher:', err);
            throw new Error(err.response?.data?.message || 'Could not add teacher.');
        }
    };

    const addRequest = async (newRequestData) => {
        const token = window.localStorage.getItem('Token');
        try {
            await axios.put(`${API_BASE_URL}/tasks/student/submit-request`, newRequestData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            await fetchDashboardData(); 
        } catch (err) {
            console.error('Error submitting request:', err);
            throw new Error(err.response?.data?.message || 'Could not submit leave request.');
        }
    };

    const renderContent = () => {
        if (loading) return <div className="text-center"><h4>Loading Dashboard...</h4></div>;
        if (error) return <div className="alert alert-danger">{error}</div>;
        if (!studentProfile) return <div className="alert alert-warning">Could not load student profile.</div>;

        switch (activePage) {
            case 'profile':
                return <StudentProfilePage profile={studentProfile} />;
            case 'requestLeave':
                return <RequestLeavePage teachers={teachers} addRequest={addRequest} />;
            case 'requestStatus':
                return <RequestStatusPage requests={leaveRequests} teachers={teachers} />;
            case 'savedTeachers':
                return <SavedTeachersPage teachers={teachers} />;
            case 'addTeacher':
                return <AddTeacherPage addTeacher={addTeacher} />;
            default:
                return <StudentProfilePage profile={studentProfile} />;
        }
    };

    const navLinks = [
        { key: 'profile', label: 'Profile' },
        { key: 'requestLeave', label: 'Request Leave' },
        { key: 'requestStatus', label: 'Request Status' },
        { key: 'savedTeachers', label: 'Saved Teachers' },
        { key: 'addTeacher', label: 'Add Teacher' },
    ];

    const createNavLink = (link) => (
        <li className="nav-item" key={link.key}>
            <a href="#" className={`nav-link ${activePage === link.key ? 'active' : ''}`} onClick={() => setActivePage(link.key)}>
                {link.label}
            </a>
        </li>
    );

    return (
        <div className="dashboard-layout">
            <aside className="sidebar d-none d-lg-flex flex-column p-3">
                <div>
                    <h3 className="sidebar-header">Student Portal</h3>
                    <ul className="nav flex-column">
                        {navLinks.map(createNavLink)}
                    </ul>
                </div>
                <div className="mt-auto">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
                        <label className="form-check-label" htmlFor="themeSwitch">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</label>
                        <button className='btn btn-primary ms-3' onClick={()=>{window.localStorage.setItem('Token',"")
                                fetchDashboardData()}}>Logout</button>
                    </div>
                </div>
            </aside>

            <div className="main-wrapper">
                <header className="navbar navbar-expand-lg sticky-top d-lg-none">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Student Portal</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse mt-4" id="navbarNav">
                            <ul className="navbar-nav">
                                {navLinks.map(createNavLink)}
                                <li className="nav-item mt-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="themeSwitchMobile" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
                                        <label className="form-check-label" htmlFor="themeSwitchMobile">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</label>
                                        <button className='btn btn-primary ms-3' onClick={()=>{window.localStorage.setItem('Token',"")
                                            fetchDashboardData()}}>Logout</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                <main className="main-content p-4">
                    <div className="container-fluid">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;