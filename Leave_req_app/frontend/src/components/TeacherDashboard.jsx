import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/TeacherDashboard.css';
import axios from 'axios';
import {
    CurrentRequests,
    PastRequests,
    StudentInfo,
    NavigationLinks,
    ThemeToggler
} from './TeacherDashboardComponents.jsx';

const API_BASE_URL = 'https://leave-tracker-czmf.onrender.com';

function App() {
    const [activePage, setActivePage] = useState('current');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [profile, setProfile] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const fetchDashboardData = async () => {
        const token = window.localStorage.getItem('Token');
        if (!token) {
            setError('Authentication token not found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/data/teacher/dashboard-data`, {
                headers: { 'authorization': `Bearer ${token}` }
            });
            setProfile(response.data.profile);
            setRequests(response.data.requests);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);
    
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : '';
    }, [isDarkMode]);

    const handleUpdateRequestStatus = async (requestId, status) => {
        const token = window.localStorage.getItem('Token');
        try {
            await axios.patch(`${API_BASE_URL}/tasks/teacher/update-request-status/${requestId}`, { status }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchDashboardData();
        } catch (err) {
            alert(`Error: ${err.response?.data?.message || 'Could not update status.'}`);
        }
    };

    const handleViewInfo = (studentId) => {
        setSelectedStudentId(studentId._id);
        setActivePage('students');
    };
    
    const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

    const renderContent = () => {
        if (loading) return <div className="text-center"><h4>Loading Dashboard...</h4></div>;
        if (error) return <div className="alert alert-danger">{error}</div>;

        const pendingRequests = requests.filter(r => r.status === 'Pending');
        const pastRequests = requests.filter(r => r.status !== 'Pending');
        
        const studentMap = new Map();
        requests.forEach(req => {
            if (req.studentId) {
                studentMap.set(req.studentId._id, req.studentId);
            }
        });
        const uniqueStudents = Array.from(studentMap.values());
        
        // Filter students if a specific student is selected
        const displayStudents = selectedStudentId 
            ? uniqueStudents.filter(student => student._id === selectedStudentId)
            : uniqueStudents;

        switch (activePage) {
            case 'current': return <CurrentRequests requests={pendingRequests} onUpdateRequest={handleUpdateRequestStatus} onViewInfo={handleViewInfo} />;
            case 'past': return <PastRequests requests={pastRequests} />;
            case 'students': return <StudentInfo students={displayStudents} onBack={() => setSelectedStudentId(null)} isFiltered={selectedStudentId !== null} />;
            default: return <CurrentRequests requests={pendingRequests} onUpdateRequest={handleUpdateRequestStatus} onViewInfo={handleViewInfo} />;
        }
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar d-none d-lg-flex flex-column">
                <div>
                    <div className="sidebar-header">{profile?.name || 'Teacher Dashboard'}</div>
                    <NavigationLinks activePage={activePage} setActivePage={setActivePage} />
                </div>
                <div className="mt-auto">
                   <ThemeToggler isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                </div>
            </aside>

            <div className="main-wrapper">
                <header className="navbar navbar-expand-lg sticky-top d-lg-none">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">{profile?.name || 'Dashboard'}</a>
                        <ThemeToggler isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <NavigationLinks activePage={activePage} setActivePage={setActivePage} />
                        </div>
                    </div>
                </header>

                <main className="main-content">
                    <div className="container-fluid">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;