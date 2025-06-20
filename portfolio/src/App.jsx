import About from './components/about.jsx';
import './App.css'
import { BrowserRouter,Route, Routes} from 'react-router-dom';
import Certifications from './components/certificates.jsx';
import Projects from './components/project.jsx';
import Achievements from './components/achievements.jsx';
import Contact from './components/contact.jsx'; 
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/skills-and-projects" element={<Projects/>} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;