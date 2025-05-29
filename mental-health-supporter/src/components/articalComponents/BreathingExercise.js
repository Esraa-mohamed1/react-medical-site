import React, { useState, useEffect } from 'react';
import '../../styles/BreathingExercise.css' ;

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setPhase(prev => {
        if (prev === 'inhale') {
          setTimeout(() => setPhase('exhale'), 4000);
          return 'hold';
        } else if (prev === 'hold') {
          return 'exhale';
        } else {
          setTimeout(() => setPhase('inhale'), 4000);
          setCount(c => c + 1);
          return 'rest';
        }
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <section className={`breathing-exercise ${isActive ? 'active' : ''}`}>
      <h3>When you feel anger rising...</h3>
      <div className="breathing-visual">
        <div className={`breathing-circle ${phase}`}>
          <div className="breathing-text">
            {!isActive ? (
              <>
                <p>Try this guided breathing exercise</p>
                <button 
                  className="start-button"
                  onClick={() => setIsActive(true)}
                >
                  Start Breathing Exercise
                </button>
              </>
            ) : (
              <>
                <p className="instruction">
                  {phase === 'inhale' && 'Breathe In Deeply'}
                  {phase === 'hold' && 'Hold'}
                  {phase === 'exhale' && 'Breathe Out Slowly'}
                  {phase === 'rest' && 'Rest'}
                </p>
                <div className="count">Breaths: {count}</div>
                <button 
                  className="stop-button"
                  onClick={() => {
                    setIsActive(false);
                    setPhase('inhale');
                  }}
                >
                  Finish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="instructions">
        <p>Follow the rhythm: 4 seconds in, 4 seconds hold, 4 seconds out, 4 seconds rest</p>
      </div>
    </section>
  );
};

export default BreathingExercise;