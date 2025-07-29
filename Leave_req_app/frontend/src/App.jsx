import './App.css'
import  StudentSigin from './components/StudentSignup.jsx';
import HomePage from './components/HomePage.jsx';
import StudentLogin from './components/StudentLogin.jsx';
import Teachersignup from './components/teachersignup.jsx'
import Teacherlogin from './components/teacherlogin.jsx'
import TeacherDashboard from './components/TeacherDashboard.jsx'
import Studentdashboad from './components/StudentDashboard.jsx'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';
 const App=()=>{
return(
    <Router>
 <Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/Student/sign-up' element={<StudentSigin/>}/>
<Route path='/Student/login' element={<StudentLogin/>}/>
<Route path='/Teacher/login' element={<Teacherlogin/>}/>
<Route path='/Teacher/Signup' element={<Teachersignup/>}/>
<Route path='/Teacher/dashboard' element={<TeacherDashboard/>}/>
<Route path='/student/dashboard' element={<Studentdashboad/>}/>

 </Routes>
    </Router>
    );
}
export default App;