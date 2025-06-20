// Achievements.jsx
import React from 'react';
import '../styles/achievements.css';

const achievements = [
  {
    title: "BringBackEdu Workshop",
    description: "Participated in the Data Science Workshop organized by BringBackEdu.",
    iconClass: "devicon-google-plain colored",
  },
  {
    title: "130+ Java DSA on LeetCode",
    description: "Solved over 130 Java DSA problems on LeetCode.",
    iconClass: "devicon-java-plain colored",
  },
  {
    title: "Cynosure SQL Event",
    description: "Stood 2nd in SQL-based tech event 'Cynosure'.",
    iconClass: "devicon-mysql-plain colored",
  },
  {
    title: "Community Service",
    description: "Participated in a non-tech community service project with the local corporation.",
    iconClass: "devicon-linux-plain colored", // Used for generic system/service
  },
];

const Achievements = () => {
    setTimeout(()=>{
document.querySelector('.achievements-section').classList.add('adder');
  },10)
  return (
    <>
    <section className="achievements-section" id="achievements">
      <h2 className="achievements-title">Achievements</h2>
      <div className="achievements-container">
        {achievements.map((item, index) => (
          <div key={index} className="achievement-card">
            <i className={`achievement-icon ${item.iconClass}`}></i>
            <div className="achievement-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
        </section>
    </>
  );
};

export default Achievements;
