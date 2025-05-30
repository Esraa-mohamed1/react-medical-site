'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

export default function BreathingExercise() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const phases = {
    inhale: { duration: 4, color: 'bg-blue-500' },
    hold: { duration: 4, color: 'bg-green-500' },
    exhale: { duration: 4, color: 'bg-purple-500' }
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const nextPhase = 
              currentPhase === 'inhale' ? 'hold' :
              currentPhase === 'hold' ? 'exhale' : 'inhale';
            setCurrentPhase(nextPhase);
            return phases[nextPhase].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentPhase]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentPhase('inhale');
    setTimeLeft(phases.inhale.duration);
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Breathing Exercise</h2>

      <div className="flex flex-col items-center space-y-6">
        <motion.div
          className={`w-48 h-48 rounded-full flex items-center justify-center ${phases[currentPhase].color} transition-colors duration-500`}
          animate={{
            scale: currentPhase === 'inhale' ? 1.2 : currentPhase === 'exhale' ? 0.8 : 1
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        >
          <span className="text-4xl font-bold text-white">{timeLeft}</span>
        </motion.div>

        <div className="text-center">
          <h3 className="text-xl font-semibold capitalize mb-2">{currentPhase}</h3>
          <p className="text-white/80">
            {currentPhase === 'inhale' ? 'Breathe in slowly through your nose' :
             currentPhase === 'hold' ? 'Hold your breath' :
             'Breathe out slowly through your mouth'}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            {isPlaying ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaRedo />
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
} 