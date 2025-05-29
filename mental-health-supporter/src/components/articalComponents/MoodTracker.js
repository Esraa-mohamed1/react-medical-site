import React, { useState } from 'react';
import  '../../styles/MoodTracker.css';

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState('neutral');
  const moodData = [
    { day: 'Mon', mood: 60, emoji: '😐' },
    { day: 'Tue', mood: 45, emoji: '🙂' },
    { day: 'Wed', mood: 70, emoji: '😠' },
    { day: 'Thu', mood: 30, emoji: '😊' },
    { day: 'Fri', mood: 55, emoji: '😐' },
    { day: 'Sat', mood: 40, emoji: '🙂' },
    { day: 'Sun', mood: 65, emoji: '😤' }
  ];
  const moodOptions = ['😊 Calm', '😐 Neutral', '😠 Angry', '😤 Frustrated', '😌 Relaxed'];

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
                onClick={() => setCurrentMood(mood)}
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