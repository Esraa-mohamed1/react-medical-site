import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/TriggerList.css';

const getTriggerIcon = (trigger) => {
  const lower = trigger.toLowerCase();
  if (lower.includes('stress') || lower.includes('توتر')) return '🧨';
  if (lower.includes('misunderstood') || lower.includes('سوء فهم')) return '👥';
  if (lower.includes('change') || lower.includes('تغيير')) return '🔄';
  if (lower.includes('sleep') || lower.includes('نوم')) return '😴';
  if (lower.includes('hunger') || lower.includes('جوع')) return '🍔';
  if (lower.includes('noise') || lower.includes('ضوضاء')) return '🔊';
  if (lower.includes('wait') || lower.includes('انتظار')) return '⏳';
  if (lower.includes('critic') || lower.includes('انتقاد')) return '👎';
  return '⚠️';
};

const TriggerList = ({ triggers = [] }) => {
  const { t } = useTranslation();

  return (
    <ul className="triggers-list">
      {triggers.map((trigger, index) => {
        const key = trigger.toLowerCase().replace(/\s+/g, '_');
        return (
          <li key={index}>
            <span className="trigger-icon">{getTriggerIcon(trigger)}</span>
            {t(`triggers.${key}`, trigger)}
          </li>
        );
      })}
    </ul>
  );
};

export default TriggerList;
