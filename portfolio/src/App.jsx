import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const portfolioData = {
  contact: {
    name: "Bandi Deeraj",
    title: "Full Stack Web Developer",
    email: "bdeeraj082@gmail.com",
    github: "https://github.com/BDEERAJ",
    linkedin: "https://linkedin.com/in/deeraj-bandi-d12345123",
  },
  summary: "Detail-oriented Full Stack Web Developer with a strong foundation in the MERN stack. Experienced in building secure, scalable, and responsive web applications from concept to deployment. A collaborative team player with a passion for clean code, problem-solving, and delivering high-quality, real-world solutions.",
  about: {
      intro: "Hello! I'm Deeraj, a passionate developer with a knack for creating efficient and beautiful web applications. My journey into tech started with a fascination for how things work, which led me to the world of coding. I thrive on turning complex problems into simple, elegant solutions and I'm always eager to learn new technologies.",
      pic: "https://placehold.co/300x300/112240/64ffda?text=BD"
  },
  experience: [
    {
      title: "Frontend UI Developer Intern",
      company: "AnantWave",
      date: "July 2024 - Present",
      description: [
        "Engineered and maintained responsive, accessible frontend pages for the JunkyNow project using HTML, CSS, and JavaScript, improving user engagement.",
        "Developed reusable UI components for critical user flows, including authentication, cart management, and checkout, leading to a more consistent user experience.",
        "Gained hands-on experience implementing Stripe for payment processing and managing real-time Ul updates."
      ]
    }
  ],
  projects: [
    {
      title: 'College Leave Request System',
      description: 'A full-stack leave management web application built with the MERN stack. It enables students to submit leave requests and allows teachers to manage them using unique join codes.',
      technologies: 'MongoDB, Express.js, React, Node.js',
      github: 'https://github.com/BDEERAJ',
      weblink: 'https://collegeleaverequest.netlify.app'
    },
    {
      title: 'QuizPlay',
      description: 'A full-stack quiz application featuring user authentication, dynamic question loading, and a persistent scoring system.',
      technologies: 'HTML, CSS, MongoDB, Express, Node.js, Vanilla JavaScript',
      github: 'https://github.com/BDEERAJ/Quiz_web/tree/9f8a66a2719cd634e7c1ab6741b64c064fa3afbb/Quiz_app',
      weblink: 'https://quiz-web-1-4z18.onrender.com'
    },
    {
      title: 'GymBuddy',
      description: 'A personalized fitness plan generator that allows users to select their fitness goals and generates a detailed weekly workout and diet plan tailored to their needs.',
      technologies: 'React, Vite, JavaScript, CSS',
      github: 'https://github.com/BDEERAJ/Quiz_web/tree/e5861010094c364617312d203176ed9e0d3083ae/GymBuddy',
      weblink: 'https://gymbuddy12.netlify.app'
    }
  ],
  skills: [
    { name: 'HTML', icon: 'devicon-html5-plain' },
    { name: 'CSS', icon: 'devicon-css3-plain' },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'React', icon: 'devicon-react-original' },
    { name: 'Redux', icon: 'devicon-redux-original' },
    { name: 'Next.js', icon: 'devicon-nextjs-original' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'Express', icon: 'devicon-express-original' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    { name: 'MySQL', icon: 'devicon-mysql-plain' },
    { name: 'Git', icon: 'devicon-git-plain' },
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'Python', icon: 'devicon-python-plain' },
    { name: 'Vercel', icon: 'devicon-vercel-original' },
    { name: 'Netlify', icon: 'devicon-netlify-original' },
    { name: 'Figma', icon: 'devicon-figma-plain' },
    { name: 'Postman', icon: 'devicon-postman-plain' },
  ],
  certifications: [
    { title: 'Career Essentials in Software Development', issuer: 'LinkedIn Learning', link: 'https://www.linkedin.com/learning/certificates/de09902a27cb34af46333508f0ec0171c27f5e80799f01750e5913b50d271d14?trk=share_certificate' },
    { title: 'CSS (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/420d78342a08' },
    { title: 'Java (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/f5686d9c8127' },
    { title: 'JavaScript (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/4e7f18d9160a' },
    { title: 'Python (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/56ddcb382a41' },
  ],
  achievements: [
    { title: "Cynosure SQL Event", description: "Stood 2nd in SQL-based tech event 'Cynosure'.", iconClass: "devicon-mysql-plain" },
    { title: "200+ Java DSA on LeetCode", description: "Solved over 200 DSA problems on LeetCode.", iconClass: "devicon-java-plain" },
    { title: "BringBackEdu Workshop", description: "Participated in the Data Science Workshop organized by BringBackEdu.", iconClass: "devicon-google-plain" },
  ]
};

const AnimatedSection = ({ children, id, className }) => {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {  threshold: 0.1});

    if (domRef.current) {
        observer.observe(domRef.current);
    }
    return () => {
        if (domRef.current) {
            observer.unobserve(domRef.current);
        }
    };
  }, []);

  return <section id={id} className={`section ${className || ''}`} ref={domRef}>{children}</section>;
};

const ContactFormModal = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Sending...', type: 'loading' });
        try {
            const res = await fetch('https://quiz-web-ujwh.onrender.com/contact/sendmessage', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus({ message: 'Message sent successfully!', type: 'success' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                const data = await res.json();
                setStatus({ message: `Failed to send: ${data.error || 'Server error'}`, type: 'error' });
            }
        } catch (error) {
            setStatus({ message: `Network error: ${error.message}`, type: 'error' });
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                <h3 className="section-h3">Contact Me</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="form-input" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="form-input" />
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required className="form-textarea"></textarea>
                    <button type="submit" className="cta-button form-button">Send Message</button>
                </form>
                {status.message && (
                    <div className={`form-status ${status.type === 'success' ? 'form-status-success' : 'form-status-error'}`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function App() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const deviconCSS = document.createElement('link');
    deviconCSS.rel = 'stylesheet';
    deviconCSS.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css';
    document.head.appendChild(deviconCSS);
    return () => { document.head.removeChild(deviconCSS); };
  }, []);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);
  
  useEffect(() => {
    const fullTitle = portfolioData.contact.title;
    let index = 0;
    const intervalId = setInterval(() => {
        setTypedTitle(fullTitle.slice(0, index + 1));
        index++;
        if (index === fullTitle.length) {
            clearInterval(intervalId);
        }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const skillsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px 0'
  };

  const skillCardStyle = {
    backgroundColor: '#112240', 
    border: '1px solid #64ffda', 
    borderRadius: '8px',
    padding: '20px',
    width: '120px',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'default',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };
  
  const skillIconStyle = {
    fontSize: '3rem',
    color: '#ccd6f6' 
  };
  
  const skillNameStyle = {
    marginTop: '10px',
    color: '#8892b0', 
    fontWeight: '500',
    fontSize: '0.9rem'
  };

  return (
    <div className="portfolio-body">
      {isModalOpen && <ContactFormModal onClose={() => setIsModalOpen(false)} />}

      <header className={`portfolio-header fixed-top ${headerVisible ? 'header-visible' : 'header-hidden'}`}>
        <nav className="container d-flex justify-content-center justify-content-md-end align-items-center">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item, index) => (
            <span key={item} className="nav-link" onClick={() => item === 'Contact' ? setIsModalOpen(true) : scrollTo(item.toLowerCase())}>
              <span className="accent-color">0{index + 1}.</span> {item}
            </span>
          ))}
        </nav>
      </header>

      <div className="social-links-sidebar d-none d-md-flex">
        <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
        <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
        <a href={`mailto:${portfolioData.contact.email}`}><i className="bi bi-envelope"></i></a>
        <div className="vertical-line"></div>
      </div>

      <main className="container">
        <section id="hero" className="hero-section">
          <p className="accent-color hero-intro">Hi, my name is</p>
          <h1 className="hero-h1">{portfolioData.contact.name}.</h1>
          <h2 className="hero-h2">{typedTitle}<span className="blinking-cursor">|</span></h2>
          <p className="hero-p">{portfolioData.summary}</p>
          <button onClick={() => setIsModalOpen(true)} className="cta-button">Get In Touch</button>
        </section>

        <AnimatedSection id="about">
            <h3 className="section-h3"><span className="accent-color">01.</span> About Me</h3>
            <div className="row align-items-center">
                <div className="col-md-8">
                    <p>{portfolioData.about.intro}</p>
                </div>
                <div className="col-md-4 text-center">
                    <img src={portfolioData.about.pic} alt="Bandi Deeraj" className="profile-pic" />
                </div>
            </div>
        </AnimatedSection>
        
        <AnimatedSection id="skills">
            <h3 className="section-h3"><span className="accent-color">02.</span> My Skills</h3>
            <div style={skillsContainerStyle}>
                {portfolioData.skills.map((skill, index) => (
                    <div key={index} style={skillCardStyle} 
                         onMouseOver={(e) => {
                             e.currentTarget.style.transform = 'translateY(-5px)';
                             e.currentTarget.style.borderColor = '#ffffff';
                         }}
                         onMouseOut={(e) => {
                             e.currentTarget.style.transform = 'translateY(0px)';
                             e.currentTarget.style.borderColor = '#64ffda';
                         }}
                    >
                        <i className={`${skill.icon}`} style={skillIconStyle}></i>
                        <p style={skillNameStyle}>{skill.name}</p>
                    </div>
                ))}
            </div>
        </AnimatedSection>

        <AnimatedSection id="experience">
            <h3 className="section-h3"><span className="accent-color">03.</span> Where I’ve Worked</h3>
            <div className="timeline">
                {portfolioData.experience.map((job, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h4>{job.title} <span className="accent-color">@ {job.company}</span></h4>
                            <p className="timeline-date">{job.date}</p>
                            <ul>
                                {job.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>

        <AnimatedSection id="projects">
            <h3 className="section-h3"><span className="accent-color">04.</span> Things I’ve Built</h3>
            <div className="row g-4">
                {portfolioData.projects.map((project, index) => (
                    <div className="col-lg-4 col-md-6" key={index}>
                        <div className="project-card">
                            <div className="project-card-inner">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <i className="bi bi-folder2-open project-folder-icon"></i>
                                    <div className="project-card-links">
                                        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>}
                                        {project.weblink && <a href={project.weblink} target="_blank" rel="noopener noreferrer"><i className="bi bi-box-arrow-up-right"></i></a>}
                                    </div>
                                </div>
                                <h4 className="project-title">{project.title}</h4>
                                <p className="project-description">{project.description}</p>
                            </div>
                            <div className="project-tech-stack">{project.technologies}</div>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>

        <AnimatedSection id="achievements">
            <h3 className="section-h3"><span className="accent-color">05.</span> Achievements & Certifications</h3>
            <h5 className="sub-heading">Achievements</h5>
            <div className="card-grid">
                {portfolioData.achievements.map((item, index) => (
                    <div key={index} className="achievement-card">
                        <i className={`${item.iconClass} achievement-icon`}></i>
                        <div className="achievement-text">
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
             <h5 className="sub-heading mt-5">Certifications</h5>
             <div className="card-grid">
                {portfolioData.certifications.map((cert, index) => (
                    <div key={index} className="certification-card" onClick={() => window.open(cert.link, '_blank')}>
                        <h4>{cert.title}</h4>
                        <p>{cert.issuer}</p>
                    </div>
                ))}
            </div>
        </AnimatedSection>
      </main>

      <footer className="portfolio-footer">
          <p>Designed & Built by Bandi Deeraj</p>
          <div className="d-md-none social-links-mobile">
            <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
            <a href={`mailto:${portfolioData.contact.email}`}><i className="bi bi-envelope"></i></a>
          </div>
      </footer>
    </div>
  );
}