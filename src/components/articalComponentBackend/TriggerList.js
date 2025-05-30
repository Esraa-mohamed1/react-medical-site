import React from 'react';
import '@/styles/TriggerList.css';

const getTriggerIcon = (trigger) => {
  const triggerLower = trigger.toLowerCase();
  
  if (triggerLower.includes('stress') || triggerLower.includes('pressure')) {
    return '🧨';
  } else if (triggerLower.includes('misunderstood') || triggerLower.includes('ignored')) {
    return '👥';
  } else if (triggerLower.includes('change') || triggerLower.includes('unexpected')) {
    return '🔄';
  } else if (triggerLower.includes('sleep') || triggerLower.includes('tired')) {
    return '😴';
  } else if (triggerLower.includes('hunger') || triggerLower.includes('hungry')) {
    return '🍔';
  } else if (triggerLower.includes('noise') || triggerLower.includes('loud')) {
    return '🔊';
  } else if (triggerLower.includes('wait') || triggerLower.includes('line')) {
    return '⏳';
  } else if (triggerLower.includes('critic') || triggerLower.includes('judge')) {
    return '👎';
  } else {
    return '⚠️';
  }
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