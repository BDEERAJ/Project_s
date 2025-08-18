import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GoalSelector.css';
import gymBackground from '../assets/gym-main-page.jpg';

function GoalSelector() {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = gymBackground;
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  const handleClick = (goal) => {
    navigate('/plan', { state: { goal } });
  };

  if (!isImageLoaded) {
    return <div className="loading-screen">Loading...</div>;
  }

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