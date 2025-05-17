import '../styles/GoalSelector.css';
import { useNavigate } from 'react-router-dom';

function GoalSelector() {
  const navigate = useNavigate();

  const handleClick = (goal) => {
    navigate('/plan', { state: { goal } });
  };

  return (
    <div className="main-goal">
      <h1 className='gym-name'>GYM BUDDY</h1>
      <div className='Goal-Selector-main'>  
        <h2 className="goal-selector__title">Select your fitness goal:</h2>
        <div className="goal-selector">
          <div className="goal-selector__buttons goller">
            <button 
              className="goal-selector__button" 
              onClick={() => handleClick('Weight Loss')}
            >
              Weight Loss
            </button>
            <button 
              className="goal-selector__button"
              onClick={() => handleClick('Muscle Building')}
            >
              Muscle Gain
            </button>
            <button 
              className="goal-selector__button" 
              onClick={() => handleClick('General Fitness')}
            >
              General Fitness
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalSelector;
