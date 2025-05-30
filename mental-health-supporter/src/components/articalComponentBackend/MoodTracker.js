import React, { useState } from 'react';
import './MoodTracker.css';

const MoodTracker = ({ initialMoodData = [], onMoodSelected }) => {
  const [currentMood, setCurrentMood] = useState('neutral');
  const [moodData, setMoodData] = useState(initialMoodData);

  // This would come from backend in a real app
  const moodOptions = ['😊 Calm', '😐 Neutral', '😠 Angry', '😤 Frustrated', '😌 Relaxed'];

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    if (onMoodSelected) {
      onMoodSelected(mood);
      // In a real app, you would send this to your backend
    }
  };

  return (
    <div className="mood-tracker">
      <h3>Track Your Progress</h3>
      <p>Monitoring your mood can help identify patterns and improvements.</p>
      <div className="tracker-container">
        <div className="mood-chart">
          <div className="progress-circles">
            {moodData.map((day, index) => (
              <div key={index} className="circle-container">
                <div 
                  className="progress-circle"
                  style={{ 
                    background: `conic-gradient(#6e8efb ${day.mood}%, #e9ecef ${day.mood}% 100%)`
                  }}
                >
                  <div className="circle-inner">
                    <span className="mood-emoji">{day.emoji}</span>
                  </div>
                </div>
                <div className="circle-label">{day.day}</div>
                <div className="mood-percent">{day.mood}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mood-selector">
          <p>How are you feeling today?</p>
          <div className="mood-options">
            {moodOptions.map((mood, index) => (
              <button
                key={index}
                className={`mood-option ${currentMood === mood ? 'selected' : ''}`}
                onClick={() => handleMoodSelect(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
        <button className="tracker-button">
          + Add Today's Mood Entry
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;