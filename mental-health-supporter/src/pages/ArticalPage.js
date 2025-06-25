import React, { useState, useEffect } from 'react';
import CustomNavbar from './../components/Navbar';
import '../styles/article.css';

const ArticalPage = ({ clientData = {} }) => {
  // Enhanced default values

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
  const {
    name = loggedUser['name'] ?? 'Client',
    angerLevel = 50,
    copingStrategies = [
      'Practice deep breathing for 5 minutes',
      'Take a 10-minute walk in nature',
      'Write down your feelings in a journal',
      'Listen to calming music',
      'Practice progressive muscle relaxation'
    ],
    triggers = ['Stressful situations', 'Feeling misunderstood', 'Unexpected changes', 'Lack of sleep', 'Hunger'],
    lastEpisode = '3 days ago'
  } = clientData;

  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [activeTip, setActiveTip] = useState(null);
  const [showBooksPopup, setShowBooksPopup] = useState(false);
  const [currentMood, setCurrentMood] = useState('neutral');

  // Coping strategy details
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

  // Breathing animation effect
  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'inhale') {
          setTimeout(() => setBreathPhase('exhale'), 4000);
          return 'hold';
        } else if (prev === 'hold') {
          return 'exhale';
        } else {
          setTimeout(() => setBreathPhase('inhale'), 4000);
          setBreathCount(c => c + 1);
          return 'rest';
        }
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [isBreathingActive]);

  // Mood chart data - simplified for demo
  const moodData = [
    { day: 'Mon', mood: 60, emoji: '😐' },
    { day: 'Tue', mood: 45, emoji: '🙂' },
    { day: 'Wed', mood: 70, emoji: '😠' },
    { day: 'Thu', mood: 30, emoji: '😊' },
    { day: 'Fri', mood: 55, emoji: '😐' },
    { day: 'Sat', mood: 40, emoji: '🙂' },
    { day: 'Sun', mood: 65, emoji: '😤' }
  ];

  // Recommended books
  const recommendedBooks = [
    'The Anger Trap by Les Carter',
    'Rage: A Step-by-Step Guide to Overcoming Explosive Anger by Ronald Potter-Efron',
    'Anger Management for Dummies by W. Doyle Gentry',
    'The Dance of Anger by Harriet Lerner',
    'Letting Go of Anger by Ronald Potter-Efron'
  ];

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
      // Default icon if no match
      return '⚠️';
    }
  };

  return (
  <>
     <CustomNavbar />
    <div className="article-container">
      {/* Header */}
      <header className="article-header">
        <div className="header-overlay"></div>
        <h1>MENTAL HEALTH SUPPORT</h1>
        <h2>Personalized Anger Management Guide</h2>
        <div className="user-greeting">
          <span className="welcome">Welcome, </span>
          <span className="username">{name}</span>
          <a 
            href={`/patients-list/${loggedUser['id']}`} 
            className="view-profile-link" 
            style={{
              marginLeft: '15px',
              fontSize: '1rem',
              color: '#4a90e2',
              textDecoration: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
              transition: 'all 0.2s ease'
            }}
          >
            View Profile →
          </a>
        </div>
      </header>

      <main className="article-content">
        {/* Breathing Exercise Section */}
        <section className={`breathing-exercise ${isBreathingActive ? 'active' : ''}`}>
          <h3>When you feel anger rising...</h3>
          <div className="breathing-visual">
            <div className={`breathing-circle ${breathPhase}`}>
              <div className="breathing-text">
                {!isBreathingActive ? (
                  <>
                    <p>Try this guided breathing exercise</p>
                    <button
                      className="start-breathing"
                      onClick={() => setIsBreathingActive(true)}
                    >
                      Start Breathing Exercise
                    </button>
                  </>
                ) : (
                  <>
                    <p className="breath-instruction">
                      {breathPhase === 'inhale' && 'Breathe In Deeply'}
                      {breathPhase === 'hold' && 'Hold'}
                      {breathPhase === 'exhale' && 'Breathe Out Slowly'}
                      {breathPhase === 'rest' && 'Rest'}
                    </p>
                    <div className="breath-count">Breaths: {breathCount}</div>
                    <button
                      className="stop-breathing"
                      onClick={() => {
                        setIsBreathingActive(false);
                        setBreathPhase('inhale');
                      }}
                    >
                      Finish
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="breathing-instructions">
            <p>Follow the rhythm: 4 seconds in, 4 seconds hold, 4 seconds out, 4 seconds rest</p>
          </div>
        </section>

        {/* Anger Profile Section */}
        <section className="anger-profile">
          <h3>Your Anger Profile</h3>
          <div className="anger-metrics">
            <div className="metric">
              <h4>Current Anger Level</h4>
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${angerLevel}%` }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>Calm</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
                <div className="anger-value">{angerLevel}/100</div>
              </div>
            </div>

            <div className="metric">
              <h4>Common Triggers</h4>
              <ul className="triggers-list">
                {triggers.map((trigger, index) => (
                  <li key={index}>
                    <span className="trigger-icon">{getTriggerIcon(trigger)}</span>
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>




        {/* Coping Strategies Section */}
        <section className="personalized-tips">
          <h3>Recommended Coping Strategies</h3>
          <p className="section-description">Try these techniques when you feel anger building:</p>
          <div className="tips-grid">
            {copingStrategies.map((strategy, index) => (
              <div className="tip-card" key={index}>
                <div className="tip-number">{index + 1}</div>
                <div className="tip-icon">
                  {index % 5 === 0 && '🧘'}
                  {index % 5 === 1 && '🚶'}
                  {index % 5 === 2 && '✍️'}
                  {index % 5 === 3 && '🎵'}
                  {index % 5 === 4 && '💪'}
                </div>
                <p>{strategy}</p>
                <button
                  className="try-button"
                  onClick={() => setActiveTip(strategy)}
                >
                  Try This
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Help Section */}
        <section className="professional-help">
          <div className="help-content">
            <h3>Professional Support</h3>
            <div className="recommendation">
              {angerLevel > 70 ? (
                <>
                  <div className="urgent-alert">❗ Important Recommendation</div>
                  <p>Based on your responses, we strongly recommend connecting with a mental health professional to discuss your anger management strategies.</p>
                </>
              ) : (
                <p>Consider these resources for additional support in managing your anger:</p>
              )}
            </div>
            <div className="resource-buttons">
              <button className="resource-button therapist">
                <span className="icon">👩‍⚕️</span>
                Find a Therapist
              </button>
              <button className="resource-button hotline">
                <span className="icon">💬</span>
                Chat with a Friend
              </button>
              <button
                className="resource-button resources"
                onClick={() => setShowBooksPopup(true)}
              >
                <span className="icon">📚</span>
                Recommended Books
              </button>
            </div>
          </div>
        </section>

        {/* Mood Tracker Section */}
        <section className="mood-tracker">
          <h3>Track Your Progress</h3>
          <p>Monitoring your mood can help identify patterns and improvements.</p>
          <div className="tracker-container">
            <div className="mood-chart">
              <div className="progress-circles">
                {moodData.map((day, index) => (
                  <div key={index} className="circle-container">
                    <div
                      className="progress-circle"
                      style={{
                        background: `conic-gradient(#6e8efb ${day.mood}%, #e9ecef ${day.mood}% 100%)`
                      }}
                    >
                      <div className="circle-inner">
                        <span className="mood-emoji">{day.emoji}</span>
                      </div>
                    </div>
                    <div className="circle-label">{day.day}</div>
                    <div className="mood-percent">{day.mood}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mood-selector">
              <p>How are you feeling today?</p>
              <div className="mood-options">
                {['😊 Calm', '😐 Neutral', '😠 Angry', '😤 Frustrated', '😌 Relaxed'].map((mood, index) => (
                  <button
                    key={index}
                    className={`mood-option ${currentMood === mood ? 'selected' : ''}`}
                    onClick={() => setCurrentMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
            <button className="tracker-button">
              + Add Today's Mood Entry
            </button>
          </div>
        </section>
      </main>

      {/* Footer with quote only */}
      <footer className="article-footer">
        <div className="footer-quote">
          "Peace comes from within. Do not seek it without." - Buddha
        </div>
      </footer>

      {/* Coping Strategy Popup */}
      {activeTip && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{activeTip}</h3>
            <div className="strategy-benefits">
              <strong>Benefits:</strong> {strategyDetails[activeTip].benefits}
            </div>
            <h4>Steps:</h4>
            <ul className="strategy-steps">
              {strategyDetails[activeTip].steps.map((step, index) => (
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

      {/* Books Popup */}
      {showBooksPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Recommended Reading</h3>
            <p>These books can help with anger management:</p>
            <ul className="book-list">
              {recommendedBooks.map((book, index) => (
                <li key={index}>📖 {book}</li>
              ))}
            </ul>
            <button
              className="popup-close"
              onClick={() => setShowBooksPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ArticalPage;