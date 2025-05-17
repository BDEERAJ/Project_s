import { Routes, Route } from "react-router-dom";
import GoalSelector from "./components/GoalSelector";
import Plan from "./components/plan";
import Workout from "./components/workout";
import '../App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GoalSelector />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/workout" element={<Workout />} />
    </Routes>
  );
}

export default App;