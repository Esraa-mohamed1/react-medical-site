import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/MoodProgress.css';

const MoodProgress = ({ moodData = [] }) => {
  const { t } = useTranslation();

  const defaultMoods = [
    { name: t('mood.anger'), level: 0, color: '#FF6B6B' },
    { name: t('mood.frustration'), level: 0, color: '#FFA500' },
    { name: t('mood.anxiety'), level: 0, color: '#FFD700' },
    { name: t('mood.sadness'), level: 0, color: '#87CEEB' },
    { name: t('mood.calmness'), level: 0, color: '#90EE90' }
  ];

  const moods = moodData.length > 0 ? moodData : defaultMoods;

  return (
    <div className="mood-progress">
      {/* <h3>{t('mood.profileTitle')}</h3> */}
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
                <span>{t('mood.low')}</span>
                <span>{t('mood.medium')}</span>
                <span>{t('mood.high')}</span>
              </div>
            </div>
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default MoodProgress;
