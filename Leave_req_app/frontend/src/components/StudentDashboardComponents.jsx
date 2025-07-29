import React, { useState, useEffect } from 'react';

export const StudentProfilePage = ({ profile }) => (
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

export const RequestLeavePage = ({ teachers, addRequest }) => {
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

export const RequestStatusPage = ({ requests, teachers }) => {
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

export const SavedTeachersPage = ({ teachers }) => (
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

export const AddTeacherPage = ({ addTeacher }) => {
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