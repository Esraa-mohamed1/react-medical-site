'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import '@/styles/BreathingExercise.css';

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
        <p className="pre-instruction">Try this guided <br />breathing exercise</p>
      ) : (
        <>
          <p className="instruction">
            {phase === 'inhale' && 'Breathe In Deeply'}
            {phase === 'hold' && 'Hold'}
            {phase === 'exhale' && 'Breathe Out Slowly'}
            {phase === 'rest' && 'Rest'}
          </p>
          <div className="count">Breaths: {count}</div>
        </>
      )}
    </div>
  </div>

  {/* BUTTON MOVED HERE */}
  {!isActive ? (
    <button 
      className="start-button"
      onClick={() => setIsActive(true)}
    >
      Start Breathing Exercise
    </button>
  ) : (
    <button 
      className="stop-button"
      onClick={() => {
        setIsActive(false);
        setPhase('inhale');
      }}
    >
      Finish
    </button>
  )}
</div>

      <div className="instructions">
        <p>Follow the Rhythm: 4 seconds in, 4 seconds hold, 4 seconds out, 4 seconds rest</p>
      </div>
    </section>
  );
};

export default BreathingExercise;