import React, { useEffect } from 'react';
import '../styles/project.css';

const skills = [
  { name: 'HTML', level: 'Intermediate', icon: 'devicon-html5-plain colored' },
  { name: 'CSS', level: 'Intermediate', icon: 'devicon-css3-plain colored' },
  { name: 'JavaScript', level: 'Beginner', icon: 'devicon-javascript-plain colored' },
  { name: 'React', level: 'Beginner', icon: 'devicon-react-original colored' },
  { name: 'MySQL', level: 'Beginner', icon: 'devicon-mysql-plain colored' },
  { name: 'MongoDB', level: 'Beginner', icon: 'devicon-mongodb-plain colored' },
  { name: 'Git', level: 'Beginner', icon: 'devicon-git-plain colored' },
  { name: 'Python', level: 'Beginner', icon: 'devicon-python-plain colored' },
  { name: 'Java', level: 'Intermediate', icon: 'devicon-java-plain colored' }
];

const projects = [
  {
    title: 'QuizPlay',
    description:
      'A full-stack quiz application built using the MERN stack (excluding React) and vanilla JavaScript. It features multiple quiz topics, JWT-based user authentication, dynamic content rendering, and MongoDB integration for storing questions, user data, and feedback.',
    technologies: 'HTML, CSS, MongoDB, Express, Node.js, Vanilla JavaScript',
    link: 'https://github.com/BDEERAJ/Quiz_web/tree/9f8a66a2719cd634e7c1ab6741b64c064fa3afbb/Quiz_app',
    weblink: 'https://quiz-web-1-4z18.onrender.com'
  },
  {
    title: 'GymBuddy',
    description:
      'A personalized fitness plan generator built using React and Vite. It allows users to select their fitness goals and generates a detailed weekly workout and diet plan tailored to their needs.',
    technologies: 'React, Vite, JavaScript, CSS',
    link: 'https://github.com/BDEERAJ/Quiz_web/tree/e5861010094c364617312d203176ed9e0d3083ae/GymBuddy',
    weblink: 'https://gymbuddy12.netlify.app'
  },
  {
  title: 'College Leave Request System',
  description:
    'A full-stack leave management web application built with the MERN stack. It enables students to submit leave requests and allows teachers to manage them using unique join codes. The system includes authentication, role-based access, and responsive UI for both student and teacher dashboards.',
  technologies: 'MongoDB, Express.js, React, Node.js, JavaScript, CSS',
  link: 'https://github.com/BDEERAJ',
  weblink: 'https://collegeleaverequest.netlify.app'
}
];

const Projects = () => {
  setTimeout(() => {
    document.querySelector('.Projects-main_project_skill').classList.add('Projects-adder');
  }, 10);
  return (
    <div className="Projects-dark-wrapper">
      <div className="Projects-main_project_skill">
        <h2 className="Projects-text-center Projects-mt-5 Projects-text-primary" style={{marginBottom: '10vw'}}>My Skills</h2>
        <section className="Projects-certifications-section">
          <ul className="Projects-certifications-list">
            {skills.map((skill, index) => (
              <li key={index} className="Projects-certification-item" style={{ maxWidth: '200px' }}>
                <i className={skill.icon} style={{ fontSize: '3rem', marginBottom: '0.5rem' }}></i>
                <h3>{skill.name}</h3>
                <p>{skill.level}</p>
              </li>
            ))}
          </ul>
        </section>

        <h2 className="Projects-text-center Projects-mt-5 Projects-text-primary" style={{marginBottom: '10vw'}}>My Projects</h2>
        <section className="Projects-certifications-section">
          <ul className="Projects-certifications-list">
            {projects.map((project, index) => (
              <li key={index} className="Projects-certification-item" style={{width: '80vw', maxWidth: '700px'}}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p><strong>Technologies:</strong> {project.technologies}</p>
                <p>
                  <a href={project.link} target="_blank" rel="noreferrer" className="Projects-text-link">🔗 GitHub Repo</a>
                  <br />
                  <a href={project.weblink} target="_blank" rel="noreferrer" className="Projects-text-link">🌐 Visit Website</a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Projects;
