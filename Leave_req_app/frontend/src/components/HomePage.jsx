import React, { useState } from 'react';
import '../styles/HomePage.css';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const UserGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="linkedin-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-2.098 1.508-3.896 3.5-3.896 1.664 0 2.958 1.12 2.958 3.826v8.469h4.968v-9.09c0-4.49-2.434-6.91-5.834-6.91-2.701 0-4.13 1.4-4.632 2.556v-2.146z" />
    </svg>
);

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <nav className="app-nav container">
                    <a href="#" className="logo">Leave<span>Tracker</span></a>
                    <div className="desktop-menu">
                        <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="nav-link">Features</a>
                        <a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="nav-link">How It Works</a>
                        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="nav-link">Contact</a>
                    </div>
                    <div className="mobile-menu-button">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="nav-link-mobile">Features</a>
                        <a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="nav-link-mobile">How It Works</a>
                        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="nav-link-mobile">Contact</a>
                    </div>
                )}
            </header>

            <main>
                <section className="hero-section">
                    <div className="container text-center">
                        <h1 className="hero-title">Effortless Leave Management</h1>
                        <p className="hero-subtitle">
                            A seamless platform for students and teachers to handle leave requests with unparalleled efficiency. Focus on what matters, not the paperwork.
                        </p>
                        <div className="hero-buttons">
                            <button className="role-button student-button">I'm a Student</button>
                            <button className="role-button teacher-button">I'm a Teacher</button>
                        </div>
                    </div>
                </section>

                <section id="features" className="features-section">
                    <div className="container text-center">
                        <h2 className="section-title">Why Choose LeaveTracker?</h2>
                        <p className="section-subtitle">Our platform is designed to simplify communication and streamline the leave approval process.</p>
                        <div className="features-grid">
                            <div className="feature-card">
                                <CalendarIcon />
                                <h3 className="feature-title">Intuitive Dashboard</h3>
                                <p>Manage all your leave requests from a single, easy-to-use dashboard at a glance.</p>
                            </div>
                            <div className="feature-card">
                                <UserGroupIcon />
                                <h3 className="feature-title">Secure & Reliable</h3>
                                <p>Built with security in mind, ensuring all communication is private and reliable.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="how-it-works-section">
                    <div className="container">
                        <h2 className="section-title text-center">Simple Steps to Get Started</h2>
                        <div className="steps-container">
                            <div className="step-card">
                                <h3 className="step-title">👩‍🏫 For Teachers</h3>
                                <ol className="steps-list">
                                    <li>Sign up to get a unique ID and password.</li>
                                    <li>Share credentials with your students.</li>
                                    <li>View all incoming leave requests.</li>
                                    <li>Approve or reject with a single click.</li>
                                </ol>
                            </div>
                            <div className="step-card">
                                <h3 className="step-title">🧑‍🎓 For Students</h3>
                                <ol className="steps-list">
                                    <li>Create your personal student account.</li>
                                    <li>Add your teacher using their unique ID.</li>
                                    <li>Submit a leave request via a simple form.</li>
                                    <li>Track the status on your dashboard.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer id="contact" className="app-footer">
                <div className="container text-center">
                    <h2 className="footer-title">Contact Me</h2>
                    <div className="social-links">
                        <a href="https://linkedin.com/in/deeraj-bandi-d12345123" target="_blank" rel="noopener noreferrer" className="social-link">
                            <LinkedinIcon />
                        </a>
                    </div>
                    <p>&copy; {new Date().getFullYear()} LeaveTracker. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}