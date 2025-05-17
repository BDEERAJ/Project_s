import React from 'react';
import './Project.css';

const projects = [
  {
    title: 'QuizPlay',
    description:
      'A quiz application built using the MERN stack (excluding React) and vanilla JavaScript. It supports multiple topics, stores data in MongoDB, and has an intuitive user interface.',
    technologies: 'HTML, CSS, MongoDB, Express, Node.js, Vanilla JavaScript',
    link: 'https://github.com/BDEERAJ/Quiz_web/tree/9f8a66a2719cd634e7c1ab6741b64c064fa3afbb/Quiz_app',
  },
];

const Projects = () => {
  return (
    <section className="projects-section">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Technologies:</strong> {project.technologies}</p>
            <a href={project.link} target="_blank" >
              🔗 GitHub Repo
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
