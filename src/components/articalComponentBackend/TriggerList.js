import React from 'react';
import './TriggerList.css';

const getTriggerIcon = (triggerName) => {
  const triggerLower = triggerName.toLowerCase();
  
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
      {triggers.map((trigger) => (
        <li key={trigger.id} className="trigger-item">
          <input
            type="checkbox"
            id={`trigger-${trigger.id}`}
            checked={trigger.checked}
            onChange={() => {}}
          />
          <label htmlFor={`trigger-${trigger.id}`}>
            <span className="trigger-icon">{getTriggerIcon(trigger.name)}</span>
            {trigger.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TriggerList;