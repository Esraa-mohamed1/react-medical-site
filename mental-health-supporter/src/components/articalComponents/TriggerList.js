import React from 'react';
import '../../styles/TriggerList.css';

const getTriggerIcon = (trigger) => {
  const triggerLower = trigger.toLowerCase();
  
  if (triggerLower.includes('stress') || triggerLower.includes('pressure')) return '🧨';
  if (triggerLower.includes('misunderstood') || triggerLower.includes('ignored')) return '👥';
  if (triggerLower.includes('change') || triggerLower.includes('unexpected')) return '🔄';
  if (triggerLower.includes('sleep') || triggerLower.includes('tired')) return '😴';
  if (triggerLower.includes('hunger') || triggerLower.includes('hungry')) return '🍔';
  if (triggerLower.includes('noise') || triggerLower.includes('loud')) return '🔊';
  if (triggerLower.includes('wait') || triggerLower.includes('line')) return '⏳';
  if (triggerLower.includes('critic') || triggerLower.includes('judge')) return '👎';
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