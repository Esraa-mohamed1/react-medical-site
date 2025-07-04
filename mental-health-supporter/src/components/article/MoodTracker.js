import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/MoodTracker.css';

const MoodTracker = () => {
  const { t } = useTranslation();
  const [currentMood, setCurrentMood] = useState('neutral');

  const moodData = [
    { day: t('moodTracker.days.mon'), mood: 60, emoji: '😐' },
    { day: t('moodTracker.days.tue'), mood: 45, emoji: '🙂' },
    { day: t('moodTracker.days.wed'), mood: 70, emoji: '😠' },
    { day: t('moodTracker.days.thu'), mood: 30, emoji: '😊' },
    { day: t('moodTracker.days.fri'), mood: 55, emoji: '😐' },
    { day: t('moodTracker.days.sat'), mood: 40, emoji: '🙂' },
    { day: t('moodTracker.days.sun'), mood: 65, emoji: '😤' }
  ];

  const moodOptions = [
    '😊 ' + t('mood.calmness'),
    '😐 ' + t('mood.neutral'),
    '😠 ' + t('mood.anger'),
    '😤 ' + t('mood.frustration'),
    '😌 ' + t('mood.relaxed')
  ];

  return (
    <div className="mood-tracker">
      <h3>{t('moodTracker.trackProgress')}</h3>
      <p>{t('moodTracker.monitoringNote')}</p>
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

        {/* Uncomment to enable mood selection */}
        {/*
        <div className="mood-selector">
          <p>{t('moodTracker.howFeeling')}</p>
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
          {t('moodTracker.addEntry')}
        </button>
        */}
      </div>
    </div>
  );
};

export default MoodTracker;
