'use client';

import React, { useState, useEffect } from 'react';
import './BreathingExercise.css';

const BreathingExercise = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, rest
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(1);
  const totalCycles = 5;

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1;
          } else {
            // Move to next phase
            switch (phase) {
              case 'inhale':
                setPhase('hold');
                setCount(4);
                break;
              case 'hold':
                setPhase('exhale');
                setCount(6);
                break;
              case 'exhale':
                setPhase('rest');
                setCount(2);
                break;
              case 'rest':
                if (cycle < totalCycles) {
                  setPhase('inhale');
                  setCount(4);
                  setCycle(prev => prev + 1);
                } else {
                  setIsPlaying(false);
                  setPhase('inhale');
                  setCount(4);
                  setCycle(1);
                }
                break;
              default:
                break;
            }
          }
          return prevCount;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, phase, cycle]);

  const getPhaseInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly through your nose';
      case 'hold':
        return 'Hold your breath';
      case 'exhale':
        return 'Breathe out slowly through your mouth';
      case 'rest':
        return 'Rest';
      default:
        return '';
    }
  };

  const handleStartStop = () => {
    if (!isPlaying) {
      setCycle(1);
      setPhase('inhale');
      setCount(4);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setPhase('inhale');
    setCount(4);
    setCycle(1);
  };

  return (
    <div className="breathing-exercise">
      <div className="breathing-circle" data-phase={phase}>
        <div className="circle-content">
          <span className="count">{count}</span>
          <span className="phase">{phase}</span>
        </div>
      </div>

      <div className="breathing-controls">
        <p className="instructions">{getPhaseInstructions()}</p>
        <p className="cycle-info">Cycle {cycle} of {totalCycles}</p>
        
        <div className="control-buttons">
          <button 
            className={`control-button ${isPlaying ? 'stop' : 'start'}`}
            onClick={handleStartStop}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>
          <button 
            className="control-button reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise; 