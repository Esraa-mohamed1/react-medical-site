import React, { useState } from 'react';
import '../../styles/CopingStrategies.css';

const CopingStrategies = () => {
  const [activeTip, setActiveTip] = useState(null);
  const copingStrategies = [
    'Practice deep breathing for 5 minutes',
    'Take a 10-minute walk in nature',
    'Write down your feelings in a journal',
    'Listen to calming music',
    'Practice progressive muscle relaxation'
  ];

  const strategyDetails = {
    'Practice deep breathing for 5 minutes': {
      steps: [
        '1. Find a comfortable seated position',
        '2. Place one hand on your chest and one on your belly',
        '3. Inhale deeply through your nose for 4 seconds',
        '4. Hold your breath for 4 seconds',
        '5. Exhale slowly through your mouth for 6 seconds',
        '6. Repeat this cycle for 5 minutes',
        '7. Focus on the rise and fall of your belly'
      ],
      benefits: 'Reduces stress, lowers heart rate, promotes relaxation'
    },
    'Take a 10-minute walk in nature': {
      steps: [
        '1. Step outside to a green space if possible',
        '2. Walk at a comfortable pace',
        '3. Notice five things you can see around you',
        '4. Notice four things you can touch or feel',
        '5. Notice three things you can hear',
        '6. Notice two things you can smell',
        '7. Notice one thing you are grateful for'
      ],
      benefits: 'Reduces cortisol levels, improves mood, provides perspective'
    },
    'Write down your feelings in a journal': {
      steps: [
        '1. Find a quiet space with a notebook',
        '2. Write freely about what made you angry',
        '3. Describe the physical sensations you felt',
        '4. Write about what you really wanted in that situation',
        '5. Consider alternative interpretations',
        '6. Note what you can control about the situation',
        '7. End with one positive affirmation'
      ],
      benefits: 'Provides emotional release, increases self-awareness, organizes thoughts'
    },
    'Listen to calming music': {
      steps: [
        '1. Choose instrumental or nature sounds',
        '2. Use headphones if possible',
        '3. Set a timer for 10-15 minutes',
        '4. Close your eyes and focus on the music',
        '5. Notice how different instruments enter and exit',
        '6. Breathe in rhythm with the music',
        '7. Let your muscles relax with each note'
      ],
      benefits: 'Lowers blood pressure, distracts from anger, induces relaxation'
    },
    'Practice progressive muscle relaxation': {
      steps: [
        '1. Find a quiet place and sit comfortably',
        '2. Take a few deep breaths to center yourself',
        '3. Tense the muscles in your toes for 5 seconds, then release',
        '4. Move to your calves - tense and release',
        '5. Tense and release your thigh muscles',
        '6. Squeeze your buttocks, then release',
        '7. Tighten your abdominal muscles, then release',
        '8. Make fists with your hands, then release',
        '9. Tense your arms, then release',
        '10. Raise your shoulders to your ears, then release',
        '11. Scrunch your facial muscles, then release',
        '12. Take deep breaths and enjoy the relaxation'
      ],
      benefits: 'Reduces physical tension, increases body awareness, promotes calm'
    }
  };

  return (
    <section className="personalized-tips container">
      <h3>Recommended Coping Strategies</h3>
      <p className="section-description">Try these techniques when you feel anger building:</p>
      <div className="row">
        {copingStrategies.map((strategy, index) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
            <div className="tip-card h-100 d-flex flex-column">
              <div className="tip-icon text-center">
                {index % 5 === 0 && '🧘'}
                {index % 5 === 1 && '🚶'}
                {index % 5 === 2 && '✍️'}
                {index % 5 === 3 && '🎵'}
                {index % 5 === 4 && '💪'}
              </div>
              <p className="flex-grow-1">{strategy}</p>
              <div className="d-flex justify-content-center mt-auto">
                <button 
                  className="try-button"
                  onClick={() => setActiveTip(strategy)}
                >
                  Try This
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTip && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{activeTip}</h3>
            <h4>Steps:</h4>
            <ul className="strategy-steps">
              {(strategyDetails[activeTip]?.steps || []).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            <button 
              className="popup-close"
              onClick={() => setActiveTip(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CopingStrategies;
