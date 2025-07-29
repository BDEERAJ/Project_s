import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/StudentDashboard.css'
import axios from 'axios';

// --- Page Components (Now defined in the same file) ---

/**
 * Displays the student's profile information.
 */
const StudentProfilePage = ({ profile }) => (
    <>
        <h2 className="mb-4">Student Profile</h2>
        <div className="content-card">
            <div className="content-card-body">
                <div className="d-flex align-items-center mb-4">
                    <h4 className="content-card-title mb-0">{profile.name}</h4>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <strong>Group:</strong>
                        <span>{profile.group}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <strong>Year:</strong>
                        <span>{profile.year}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <strong>Roll No:</strong>
                        <span>{profile.rollNo}</span>
                    </li>
                </ul>
            </div>
        </div>
    </>
);

/**
 * A form for students to request leave.
 */
const RequestLeavePage = ({ teachers, addRequest }) => {
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (teachers.length > 0) {
            setSelectedTeacher(teachers[0]._id);
        }
    }, [teachers]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!selectedTeacher || !reason) {
            setError('Please select a teacher and provide a reason.');
            return;
        }
        
        try {
            await addRequest({ teacherId: selectedTeacher, reason });
            setReason('');
            setMessage('Your leave request has been sent successfully!');
        } catch (err) {
            setError(err.message || 'An error occurred while sending the request.');
        } finally {
            setTimeout(() => {
                setMessage('');
                setError('');
            }, 4000);
        }
    };

    if (teachers.length === 0) {
        return (
            <div className="content-card text-center">
                <div className="content-card-body">
                    <h4 className="content-card-title">No Teachers Added</h4>
                    <p className="content-card-text">
                        Please add a teacher from the "Add Teacher" page before you can request leave.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <h2 className="mb-4">Request Leave</h2>
            <div className="content-card">
                <div className="content-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="teacherSelect" className="form-label">Select Teacher</label>
                            <select id="teacherSelect" className="form-select" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                                {teachers.map(teacher => (
                                    <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reasonText" className="form-label">Reason for Leave</label>
                            <textarea id="reasonText" className="form-control" rows="4" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Please provide a clear reason for your absence..." required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Submit Request
                        </button>
                        {message && <div className="alert alert-success mt-3">{message}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>
                </div>
            </div>
        </>
    );
};

/**
 * Displays the status of all submitted leave requests.
 */
const RequestStatusPage = ({ requests, teachers }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Approved': return 'status-approved';
            case 'Rejected': return 'status-declined';
            default: return 'status-pending';
        }
    };
    
    const teacherMap = new Map(teachers.map(t => [t._id, t.name]));

    return (
        <>
            <h2 className="mb-4">Request Status</h2>
            <div className="content-card">
                <div className="content-card-body">
                    <div className="table-responsive">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Teacher Name</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req._id}>
                                        <td>{teacherMap.get(req.teacherId) || 'N/A'}</td>
                                        <td>{req.reason}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(req.status)}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * Displays a list of all saved teachers.
 */
const SavedTeachersPage = ({ teachers }) => (
    <>
        <h2 className="mb-4">Saved Teachers</h2>
        <div className="content-card">
            <div className="content-card-body">
                <div className="table-responsive">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Teacher Name</th>
                                <th>Unique ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(teacher => (
                                <tr key={teacher._id}>
                                    <td>{teacher.name}</td>
                                    <td><code>{teacher.uniqueId}</code></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
);

/**
 * A form for adding a new teacher to the system.
 */
const AddTeacherPage = ({ addTeacher }) => {
    const [uniqueId, setUniqueId] = useState('');
    const [passkey, setPasskey] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await addTeacher({ uniqueId, passkey });
            setUniqueId('');
            setPasskey('');
            setMessage('Teacher has been added successfully! The teacher list is updated.');
        } catch (err) {
            setError(err.message || 'An error occurred.');
        } finally {
             setTimeout(() => {
                setMessage('');
                setError('');
            }, 4000);
        }
    };

    return (
        <>
            <h2 className="mb-4">Add Teacher Info</h2>
            <div className="content-card">
                <div className="content-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="teacherId" className="form-label">Teacher's Unique ID</label>
                            <input type="text" id="teacherId" className="form-control" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="teacherPasskey" className="form-label">Teacher's Passkey</label>
                            <input type="password" id="teacherPasskey" className="form-control" value={passkey} onChange={(e) => setPasskey(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                           Add Teacher
                        </button>
                        {message && <div className="alert alert-success mt-3">{message}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>
                </div>
            </div>
        </>
    );
};


// --- Main App Component ---
function App() {
    const [activePage, setActivePage] = useState('profile');
    const [teachers, setTeachers] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [studentProfile, setStudentProfile] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:3000';

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
            console.log(response.data);
            
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
            const response = await axios.put(`${API_BASE_URL}/tasks/student/submit-request`, newRequestData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Add the new request to the list locally for immediate UI update
            // A full re-fetch could also be done here if preferred
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
                           fetchDashboardData()  }}>Logout</button>                                    </div>

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
