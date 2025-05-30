'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const strategies = [
  {
    id: 1,
    title: 'Deep Breathing',
    description: 'Practice deep breathing exercises to reduce stress and anxiety.',
    steps: [
      'Find a quiet, comfortable place to sit or lie down',
      'Place one hand on your chest and the other on your belly',
      'Breathe in slowly through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Exhale slowly through your mouth for 4 counts',
      'Repeat this cycle 5-10 times'
    ]
  },
  {
    id: 2,
    title: 'Progressive Muscle Relaxation',
    description: 'A technique that involves tensing and relaxing different muscle groups.',
    steps: [
      'Start with your toes and work your way up to your head',
      'Tense each muscle group for 5 seconds',
      'Release the tension and relax for 10 seconds',
      'Notice the difference between tension and relaxation',
      'Move to the next muscle group'
    ]
  },
  {
    id: 3,
    title: 'Mindfulness Meditation',
    description: 'Focus on the present moment without judgment.',
    steps: [
      'Find a quiet space and sit comfortably',
      'Close your eyes and focus on your breath',
      'Notice when your mind wanders',
      'Gently bring your attention back to your breath',
      'Start with 5 minutes and gradually increase duration'
    ]
  },
  {
    id: 4,
    title: 'Physical Exercise',
    description: 'Regular physical activity can help reduce stress and improve mood.',
    steps: [
      'Choose an activity you enjoy',
      'Start with 10-15 minutes daily',
      'Gradually increase duration and intensity',
      'Aim for at least 30 minutes of moderate exercise',
      'Include both cardio and strength training'
    ]
  }
];

export default function CopingStrategies() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Coping Strategies</h2>

      <div className="space-y-4">
        {strategies.map((strategy) => (
          <motion.div
            key={strategy.id}
            className="bg-white/5 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleExpand(strategy.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="text-left">
                <h3 className="text-lg font-semibold">{strategy.title}</h3>
                <p className="text-white/70 text-sm">{strategy.description}</p>
              </div>
              {expandedId === strategy.id ? (
                <FaChevronUp className="text-white/60" />
              ) : (
                <FaChevronDown className="text-white/60" />
              )}
            </button>

            {expandedId === strategy.id && (
              <motion.div
                className="p-4 border-t border-white/10"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-semibold mb-3">Steps:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  {strategy.steps.map((step, index) => (
                    <li key={index} className="text-white/80">
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 