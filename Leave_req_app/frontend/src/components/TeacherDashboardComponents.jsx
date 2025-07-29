import React from 'react';

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

export const CurrentRequests = ({ requests, onUpdateRequest, onViewInfo }) => (
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

export const PastRequests = ({ requests }) => (
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

export const StudentInfo = ({ students }) => (
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

export const NavigationLinks = ({ activePage, setActivePage }) => (
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

export const ThemeToggler = ({ isDarkMode, toggleTheme }) => (
    <div className="form-check form-switch ms-auto">
        <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch" checked={isDarkMode} onChange={toggleTheme} />
        <label className="form-check-label" htmlFor="themeSwitch">{isDarkMode ? '🌙' : '☀️'}</label>
    </div>
);