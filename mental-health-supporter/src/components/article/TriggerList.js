import React from 'react';
import '../../styles/TriggerList.css';

const getTriggerIcon = (trigger) => {
  const lower = trigger.toLowerCase();
  if (lower.includes('stress')) return '🧨';
  if (lower.includes('misunderstood')) return '👥';
  if (lower.includes('change')) return '🔄';
  if (lower.includes('sleep')) return '😴';
  if (lower.includes('hunger')) return '🍔';
  if (lower.includes('noise')) return '🔊';
  if (lower.includes('wait')) return '⏳';
  if (lower.includes('critic')) return '👎';
  return '⚠️';
};

const TriggerList = ({ triggers = [] }) => {
  return (
    <ul className="triggers-list">
      {triggers.map((trigger, index) => (
        <li key={index}>
          <span className="trigger-icon">{getTriggerIcon(trigger)}</span>
          {trigger}
        </li>
      ))}
    </ul>
  );
};

export default TriggerList;
