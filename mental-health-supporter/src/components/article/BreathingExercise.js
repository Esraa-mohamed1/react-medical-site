import React, { useEffect, useState } from 'react';
import '../../styles/BreathingExercise.css';

const BreathingExercise = ({ disorder }) => {
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'inhale') {
          setTimeout(() => setBreathPhase('exhale'), 4000);
          return 'hold';
        } else if (prev === 'hold') {
          return 'exhale';
        } else {
          setTimeout(() => setBreathPhase('inhale'), 4000);
          setBreathCount(c => c + 1);
          return 'rest';
        }
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [isBreathingActive]);

  return (
    <section className={`breathing-exercise ${isBreathingActive ? 'active' : ''}`}>
      <h3>When you feel {disorder?.toLowerCase()} rising...</h3>
      <div className="breathing-visual">
        <div className={`breathing-circle ${breathPhase}`}>
          <div className="breathing-text">
            {!isBreathingActive ? (
              <>
                <p>Try this guided breathing exercise</p>
                <button
                  className="start-breathing"
                  onClick={() => setIsBreathingActive(true)}
                >
                  Start Breathing Exercise
                </button>
              </>
            ) : (
              <>
                <p className="breath-instruction">
                  {breathPhase === 'inhale' && 'Breathe In Deeply'}
                  {breathPhase === 'hold' && 'Hold'}
                  {breathPhase === 'exhale' && 'Breathe Out Slowly'}
                  {breathPhase === 'rest' && 'Rest'}
                </p>
                <div className="breath-count">Breaths: {breathCount}</div>
                <button
                  className="stop-breathing"
                  onClick={() => {
                    setIsBreathingActive(false);
                    setBreathPhase('inhale');
                  }}
                >
                  Finish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="breathing-instructions">
        <p>Follow the rhythm: 4s inhale, 4s hold, 4s exhale, 4s rest</p>
      </div>
    </section>
  );
};

export default BreathingExercise;
