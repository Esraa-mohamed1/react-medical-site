import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/CopingStrategies.css';

const copingContent = (t) => ({
  anger: {
        label: t('coping.anger.label'),
    reason: t('coping.anger.reason'),
    strategies: t('coping.anger.strategies', { returnObjects: true }),
  },
  anxiety: {
            label: t('coping.anxiety.label'),

    reason: t('coping.anxiety.reason'),
    strategies: t('coping.anxiety.strategies', { returnObjects: true }),
  },
  depression: {
            label: t('coping.depression.label'),

    reason: t('coping.depression.reason'),
    strategies: t('coping.depression.strategies', { returnObjects: true }),
  },
  ocd: {
            label: t('coping.ocd.label'),

    reason: t('coping.ocd.reason'),
    strategies: t('coping.ocd.strategies', { returnObjects: true }),
  },
  stress: {
            label: t('coping.stress.label'),

    reason: t('coping.stress.reason'),
    strategies: t('coping.stress.strategies', { returnObjects: true }),
  },
});

const CopingStrategies = ({ disorder }) => {
  const { t } = useTranslation();
  const [activeTip, setActiveTip] = useState(null);
  const content = copingContent(t)[disorder?.toLowerCase()] || {};
  const tips = content.strategies || [];
  const reason = content.reason;

  return (
    <section className="personalized-tips container">
<h3>{t('coping.title', { disorder: content.label })}</h3>
      {reason && <p className="disorder-reason"><strong>{t('coping.whyItHappens')}:</strong> {reason}</p>}
      <div className="row">
        {tips.map((tipObj, index) => (
          <div className="col-sm-6 col-md-4 mb-4" key={index}>
            <div className="tip-card">
              <div className="tip-icon">{['🧘','🚶','✍️','🎵','💪'][index % 5]}</div>
              <p>{tipObj.tip}</p>
              <button className="try-button" onClick={() => setActiveTip(tipObj)}>{t('coping.tryThis')}</button>
            </div>
          </div>
        ))}
      </div>

      {activeTip && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>{activeTip.tip}</h4>
            <h5>{t('coping.howToApply')}</h5>
            <ul>
              {activeTip.howTo.map((step, idx) => <li key={idx}>{step}</li>)}
            </ul>
            <p><strong>{t('coping.whyItHelps')}:</strong> {activeTip.benefit}</p>
            <button className="popup-close" onClick={() => setActiveTip(null)}>{t('coping.close')}</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CopingStrategies;
