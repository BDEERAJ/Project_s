import './App.css'
import  StudentSigin from './components/StudentSignup';
import HomePage from './components/HomePage';
import StudentLogin from './components/StudentLogin';
import TeachersignUp from './components/Teachersignup'
import Teacherlogin from './components/Teacherlogin'
import TeacherDashboard from './components/TeacherDashboard'
import Studentdashboad from './components/StudentDashboard'
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