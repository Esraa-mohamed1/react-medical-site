// ✅ src/components/article/MentalDisorderIntro.js
import React from 'react';
import '../../styles/MentalDisorderIntro.css';

const disorderDetails = {
  anger: {
    icon: '😠',
    title: 'Understanding Anger',
    reason: 'Anger can arise from frustration, feeling threatened, unresolved trauma, or stress overload.',
    // color: '#f8d7da'
  },
  anxiety: {
    icon: '😰',
    title: 'Understanding Anxiety',
    reason: 'Anxiety often stems from uncertainty, overwhelming pressure, or past trauma that triggers fear responses.',
    // color: '#d1ecf1'
  },
  depression: {
    icon: '😔',
    title: 'Understanding Depression',
    reason: 'Depression may result from chemical imbalances, prolonged stress, loss, or unresolved emotional pain.',
    // color: '#e2e3e5'
  },
  ocd: {
    icon: '🌀',
    title: 'Understanding OCD',
    reason: 'OCD often emerges due to a need for control, heightened responsibility fears, or inherited tendencies.',
    // color: '#fefefe'
  },
  stress: {
    icon: '😩',
    title: 'Understanding Stress',
    reason: 'Stress can be triggered by high demands, lack of control, change, or conflict in daily life.',
    // color: '#fff3cd'
  }
};

const MentalDisorderIntro = ({ disorder }) => {
  const info = disorderDetails[disorder?.toLowerCase()];

  if (!info) return null;

  return (
    <section className="disorder-intro-section" style={{ backgroundColor: info.color }}>
      <div className="container py-4">
        <div className="text-center mb-3">
          <div className="disorder-icon mb-2">{info.icon}</div>
          <h2 className="disorder-title">{info.title}</h2>
        </div>
        <p className="disorder-reason">{info.reason}</p>
      </div>
    </section>
  );
};

export default MentalDisorderIntro;
