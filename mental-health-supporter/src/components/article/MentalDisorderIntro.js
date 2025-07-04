import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/MentalDisorderIntro.css';

const disorderDetails = (t) => ({
  anger: {
    icon: '😠',
    title: t('disorder.anger.title'),
    reason: t('disorder.anger.reason')
  },
  anxiety: {
    icon: '😰',
    title: t('disorder.anxiety.title'),
    reason: t('disorder.anxiety.reason')
  },
  depression: {
    icon: '😔',
    title: t('disorder.depression.title'),
    reason: t('disorder.depression.reason')
  },
  ocd: {
    icon: '🌀',
    title: t('disorder.ocd.title'),
    reason: t('disorder.ocd.reason')
  },
  stress: {
    icon: '😩',
    title: t('disorder.stress.title'),
    reason: t('disorder.stress.reason')
  }
});

const MentalDisorderIntro = ({ disorder }) => {
  const { t } = useTranslation();
  const info = disorderDetails(t)[disorder?.toLowerCase()];

  if (!info) return null;

  return (
    <section className="disorder-intro-section">
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
