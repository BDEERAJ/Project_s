import React from 'react';
import './skills.css';

const skills = [
  { name: 'HTML', level: 'Intermediate' },
  { name: 'CSS', level: 'Intermediate' },
  { name: 'JavaScript', level: 'Beginner' },
  { name: 'React', level: 'Beginner' },
  { name: 'MySQL', level: 'Beginner' },
  { name: 'MongoDB', level: 'Beginner' },
  { name: 'Git', level: 'Beginner' },
  { name: 'Python', level: 'Beginner' },
  {name:'Java',level:'Intermediate'}
];

const Skills = () => {
  return (
    <section className="skills-section">
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <h3>{skill.name}</h3>
            <p>{skill.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
