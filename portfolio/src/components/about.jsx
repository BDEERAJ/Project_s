import React, { useEffect, useState } from 'react';
import pic from '../assets/pic.png';
import '../styles/about.css';
import {useNavigate} from 'react-router-dom';
function About() {
  const [isMobile, setIsMobile] = useState(false);
const [activeNav, setActiveNav] = useState(null);
const navigate=useNavigate();
const handleNavClick = (index) => {
  setActiveNav(index);

  setTimeout(() => {
    const paths = ["skills-and-projects", "certifications", "achievements", "contact"];
    navigate(`/${paths[index]}`);
  }, 800);
};

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1000); 
    };
    checkMobile(); 
    window.addEventListener('resize', checkMobile); 
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  useEffect(() => {
    const elements = document.querySelectorAll('.about-container .row > div');
    elements.forEach((element) => {
      element.style.transform = isMobile ? 'none' : 'skewX(-20deg)';
    });
  }, [isMobile]);

  return (
    <>

    <div className="about-main">
      <div className="about-nav d-flex justify-content-between align-items-center p-3 w-80  ">
  {["skills & projects", "certifications", "achievements", "contact"].map((text, index) => (
    <span
      key={index}
      onClick={() => handleNavClick(index)}
      className={activeNav === index ? 'nav-move' : ''}
    >
      {text}
    </span>
  ))}
</div>

      <div className="container about-container d-flex justify-content-between align-items-center flex-column min-vh-100">
        <div className="row w-100 m-auto">
          <div className={`col-lg-5 col-12 about-text d-flex flex-column justify-content-center text-white ${isMobile ? 'mobile' : ''}`}>
            <h2 style={{color:'darkgreen'}}>Bandi Deeraj</h2>
           <div class="about-intro">
  <p>Hello! I'm <strong>Deeraj</strong>, a passionate BCA student currently pursuing my degree at <strong>SV Arts College, Tirupati</strong>.</p>
  <p>I specialize in building full-stack web applications using the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js).</p>
  <p>I enjoy solving <strong>Data Structures & Algorithms</strong> problems, exploring new technologies, and building innovative, real-world projects.</p>
</div>

          </div>

          <div className={`col-lg-6 col-12 about-image d-flex justify-content-center py-3 ${isMobile ? 'mobile' : ''}`}>
            <img src={pic} alt="Deeraj" className="img-fluid shadow profile-pic " />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default About;