import { useLocation, useNavigate } from "react-router-dom";
import "../styles/plan.css";

const allPlans = {
  "Weight Loss": {
    Monday: { exercise: "Cardio", duration: "30 minutes", intensity: "Moderate" },
    Tuesday: { exercise: "Strength Training", duration: "45 minutes", intensity: "High" },
    Wednesday: { exercise: "Yoga", duration: "30 minutes", intensity: "Low" },
    Thursday: { exercise: "HIIT", duration: "20 minutes", intensity: "High" },
    Friday: { exercise: "Cardio", duration: "30 minutes", intensity: "Moderate" },
    Saturday: { exercise: "Pilates", duration: "40 minutes", intensity: "Low" },
    Sunday: { exercise: "Rest", duration: "0 minutes", intensity: "None" }
  },
  "Muscle Building": {
    Monday: { exercise: "Chest & Triceps", duration: "60 minutes", intensity: "High" },
    Tuesday: { exercise: "Back & Biceps", duration: "60 minutes", intensity: "High" },
    Wednesday: { exercise: "Legs", duration: "60 minutes", intensity: "High" },
    Thursday: { exercise: "Shoulders", duration: "45 minutes", intensity: "Moderate" },
    Friday: { exercise: "Full Body Strength", duration: "60 minutes", intensity: "High" },
    Saturday: { exercise: "Core", duration: "30 minutes", intensity: "Moderate" },
    Sunday: { exercise: "Rest", duration: "0 minutes", intensity: "None" }
  },
  "General Fitness": {
    Monday: { exercise: "Cardio & Strength", duration: "45 minutes", intensity: "Moderate" },
    Tuesday: { exercise: "Yoga", duration: "30 minutes", intensity: "Low" },
    Wednesday: { exercise: "HIIT", duration: "20 minutes", intensity: "High" },
    Thursday: { exercise: "Strength Training", duration: "45 minutes", intensity: "Moderate" },
    Friday: { exercise: "Cardio", duration: "30 minutes", intensity: "Moderate" },
    Saturday: { exercise: "Stretching", duration: "30 minutes", intensity: "Low" },
    Sunday: { exercise: "Rest", duration: "0 minutes", intensity: "None" }
  }
};

function Plan() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedGoal = location.state?.goal || "Muscle Building";
  const weeklyPlan = allPlans[selectedGoal];

  const daySetter = (day) => {
    navigate("/workout", {
      state: { a: selectedGoal, day }
    });
  };

  return (
    <div className="plan-page">
      <h1 className="plan-title">{selectedGoal} Weekly Plan</h1>
      <div className="plan-grid">
        {Object.entries(weeklyPlan).map(([day, details]) => (
          <div onClick={() => daySetter(day)} className="plan-card" key={day}>
            <h2 className="day-name">{day}</h2>
            <p className="exercise-name">Exercise: {details.exercise}</p>
            <p className="exercise-info">Duration: {details.duration}</p>
            <p className="exercise-info">Intensity: {details.intensity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plan;
