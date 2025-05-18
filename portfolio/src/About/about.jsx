import React from 'react';
import './about.css';

const achievements = [
  { title: 'Solved 100+ Problems on Leetcode in DSA', year: '2025' },
  { title: '2nd Place in Cynosure SQL-based Event', year: '2025' },
];

const About = () => {
  return (
    <section className="about-section">
      <h2>About Me</h2>
      <p>
        Hello! I’m a passionate developer with experience in web development, 
        including the MERN stack (MongoDB, Express, Node.js, and React). I’ve worked on 
        few projects, including QuizPlay, where I implemented various technologies like 
        HTML, CSS, and JavaScript. I love solving problems and constantly strive to improve my coding skills.
      </p>
      
      <h3>Achievements</h3>
      <ul className="achievements-list">
        {achievements.map((ach, index) => (
          <li key={index} className="achievement-item">
            <h4>{ach.title}</h4>
            <p>{ach.year}</p>
          </li>
        ))}
      </ul>

      <a href="/path/to/your/resume.pdf" target="_blank" rel="noopener noreferrer">
        <button className="resume-button">View My Resume</button>
      </a>
    </section>
  );
};

export default About;
