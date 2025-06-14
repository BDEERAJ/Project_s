import User from './Home/user.jsx'
import './App.css';
import React from 'react';
import About from './About/about.jsx'
import Skills from './About/skills.jsx'
import Certifications from './achievements/certificates.jsx';
import ProjectCard  from './achievements/project.jsx';
import Contact from './contact/contact.jsx';
function App() {
  return (
    <>
    <div className="App-main">
    <div className="home">  
     <User/>
     <hr />
     <About/>
     <hr />
     <Skills/>
     <hr />
     <Certifications/>
     <hr />
     <ProjectCard/>
     <hr />
     <Contact/>
     <hr />
     </div>
     </div>
    </>
  );
}

export default App;
