import { BrowserRouter as Router,Route,Routes } from "react-router-dom";  
import Selection from "./components/selection";
import Filtered from './components/filtered'
import './App.css'
const App=()=>{
  return( 
     <Router>
 <Routes>
<Route path="/" element={<Selection/>}/>
<Route path="/num" element={<Filtered/>}/>
 </Routes>
  </Router>)

}

export default App;