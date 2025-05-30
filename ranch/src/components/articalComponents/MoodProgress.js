import React from 'react';
import '../../styles/MoodProgress.css';

const MoodProgress = ({ moodData = [] }) => {
  const defaultMoods = [
    { name: 'Anger', level: 0, color: '#FF6B6B' },
    { name: 'Frustration', level: 0, color: '#FFA500' },
    { name: 'Anxiety', level: 0, color: '#FFD700' },
    { name: 'Sadness', level: 0, color: '#87CEEB' },
    { name: 'Calmness', level: 0, color: '#90EE90' }
  ];

  const moods = moodData.length > 0 ? moodData : defaultMoods;

  return (
    <div className="mood-progress">
      {/* <h3>Your Mood Profile</h3> */}
      {/* <div className="mood-metrics"> */}
        {moods.map((mood, index) => (
          <div className="mood-metric" key={index}>
            <div className="mood-info">
              <span className="mood-name">{mood.name}</span>
              <span className="mood-value">{mood.level}/100</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${mood.level}%`, backgroundColor: mood.color }}
                ></div>
              </div>
              <div className="progress-labels">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default MoodProgress;
