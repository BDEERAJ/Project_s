import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/TeacherDashboard.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// --- Reusable Helper Functions ---
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

// --- CONTENT COMPONENTS ---
const CurrentRequests = ({ requests, onUpdateRequest, onViewInfo }) => (
    <div>
        <h2 className="mb-4">Current Requests</h2>
        {requests.length === 0 ? (
            <div className="content-card"><div className="content-card-body">No pending requests.</div></div>
        ) : (
            requests.map(req => (
                <div key={req._id} className="content-card">
                    <div className="content-card-body">
                        <div className="d-flex justify-content-between align-items-start">
                            <h5 className="content-card-title">{req.studentId?.name || 'Unknown Student'}</h5>
                            <span className="content-card-date">{formatDate(req.createdAt)}</span>
                        </div>
                        <p className="content-card-text">{req.reason}</p>
                        <div className="d-flex gap-2 mt-3 ">
                            <button className="btn btn-sm btn-success" onClick={() => onUpdateRequest(req._id, 'Approved')}>Accept</button>
                            <button className="btn btn-sm btn-danger" onClick={() => onUpdateRequest(req._id, 'Rejected')}>Decline</button>
                            <button className="btn btn-sm btn-outline-light text-primary" onClick={() => onViewInfo(req.studentId)}>View Info</button>
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
);

const PastRequests = ({ requests }) => (
    <div>
        <h2 className="mb-4">Past Requests</h2>
        {requests.length === 0 ? (
             <div className="content-card"><div className="content-card-body">No past requests.</div></div>
        ) : (
            requests.map(req => (
                <div key={req._id} className="content-card">
                    <div className="content-card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="content-card-title mb-1">{req.studentId?.name || 'Unknown Student'}</h5>
                            <p className="content-card-text mb-0">{req.reason}</p>
                            <span className="content-card-date mt-2 d-block">Decided on: {formatDate(req.updatedAt)}</span>
                        </div>
                        <span className={`status-badge ${req.status === 'Approved' ? 'status-accepted' : 'status-declined'}`}>
                            {req.status}
                        </span>
                    </div>
                </div>
            ))
        )}
    </div>
);

const StudentInfo = ({ students }) => (
    <div>
        <h2 className="mb-4">Student Information</h2>
        <div className="content-card">
            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Group</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr><td colSpan="4" className="text-center">No student information available.</td></tr>
                        ) : (
                            students.map(student => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.rollNo}</td>
                                    <td>{student.group}</td>
                                    <td>{student.year}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- NAVIGATION & THEME TOGGLER ---
const NavigationLinks = ({ activePage, setActivePage }) => (
    <ul className="navbar-nav flex-column w-100">
        <li className="nav-item">
            <button className={`nav-link text-start w-100 ${activePage === 'current' ? 'active' : ''}`} onClick={() => setActivePage('current')}>
                Current Requests
            </button>
        </li>
        <li className="nav-item">
            <button className={`nav-link text-start w-100 ${activePage === 'past' ? 'active' : ''}`} onClick={() => setActivePage('past')}>
                Past Requests
            </button>
        </li>
        <li className="nav-item">
            <button className={`nav-link text-start w-100 ${activePage === 'students' ? 'active' : ''}`} onClick={() => setActivePage('students')}>
                Student Info
            </button>
        </li>
    </ul>
);

const ThemeToggler = ({ isDarkMode, toggleTheme }) => (
    <div className="form-check form-switch ms-auto">
        <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch" checked={isDarkMode} onChange={toggleTheme} />
        <label className="form-check-label" htmlFor="themeSwitch">{isDarkMode ? '🌙' : '☀️'}</label>
    </div>
);

// --- MAIN APP COMPONENT ---
function App() {
    const [activePage, setActivePage] = useState('current');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [profile, setProfile] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            // Refresh data after update
            fetchDashboardData();
        } catch (err) {
            alert(`Error: ${err.response?.data?.message || 'Could not update status.'}`);
        }
    };
    
    const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

    const renderContent = () => {
        if (loading) return <div className="text-center"><h4>Loading Dashboard...</h4></div>;
        if (error) return <div className="alert alert-danger">{error}</div>;

        const pendingRequests = requests.filter(r => r.status === 'Pending');
        const pastRequests = requests.filter(r => r.status !== 'Pending');
        
        // Create a unique list of students from all requests
        const studentMap = new Map();
        requests.forEach(req => {
            if (req.studentId) {
                studentMap.set(req.studentId._id, req.studentId);
            }
        });
        const uniqueStudents = Array.from(studentMap.values());

        switch (activePage) {
            case 'current': return <CurrentRequests requests={pendingRequests} onUpdateRequest={handleUpdateRequestStatus} onViewInfo={() => {}} />;
            case 'past': return <PastRequests requests={pastRequests} />;
            case 'students': return <StudentInfo students={uniqueStudents} />;
            default: return <CurrentRequests requests={pendingRequests} onUpdateRequest={handleUpdateRequestStatus} onViewInfo={() => {}} />;
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
