import './App.css'
import  StudentSigin from './components/StudentSignup.jsx';
import HomePage from './components/HomePage.jsx';
import StudentLogin from './components/StudentLogin.jsx';
import TeachersignUp from './components/Teachersignup.jsx'
import Teacherlogin from './components/Teacherlogin.jsx'
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
<Route path='/Teacher/Signup' element={<TeachersignUp/>}/>
<Route path='/Teacher/dashboard' element={<TeacherDashboard/>}/>
<Route path='/student/dashboard' element={<Studentdashboad/>}/>

 </Routes>
    </Router>
    );
}
export default App;