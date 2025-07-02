import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Artical = ({ clientData = {} }) => {
  const navigate = useNavigate();

  // Sample dynamic data: you can replace clientData.mentalConditions accordingly
  const mentalConditions = clientData.mentalConditions || [
    {
      id: 'anger',
      name: 'Anger',
      description: 'Manage feelings of anger before they escalate.',
      copingStrategies: [
        'Deep breathing for 5 minutes',
        '10-minute walk in nature',
        'Journaling feelings',
        'Listening to calming music',
        'Progressive muscle relaxation'
      ],
      strategyDetails: {
        'Deep breathing for 5 minutes': {
          steps: [
            'Find a comfortable position',
            'Place one hand on chest and one on belly',
            'Inhale through nose for 4 seconds',
            'Hold for 4 seconds',
            'Exhale through mouth for 6 seconds',
            'Repeat for 5 minutes'
          ],
          benefits: 'Reduces stress and calms anger'
        },
        '10-minute walk in nature': {
          steps: [
            'Go to a green space',
            'Walk at a comfortable pace',
            'Observe surroundings mindfully'
          ],
          benefits: 'Improves mood and perspective'
        },
        'Journaling feelings': {
          steps: [
            'Write down your emotions',
            'Describe what triggered them',
            'Reflect on what you wanted'
          ],
          benefits: 'Provides emotional release'
        },
        'Listening to calming music': {
          steps: [
            'Choose instrumental or nature sounds',
            'Use headphones if possible',
            'Focus on breathing with the rhythm'
          ],
          benefits: 'Decreases blood pressure and tension'
        },
        'Progressive muscle relaxation': {
          steps: [
            'Tense and release muscle groups from toes to head'
          ],
          benefits: 'Releases physical tension'
        }
      },
      recommendedBooks: [
        'Letting Go of Anger by Ronald Potter-Efron',
        'The Anger Trap by Les Carter',
        'Anger Management for Dummies by W. Doyle Gentry'
      ]
    },
    {
      id: 'anxiety',
      name: 'Anxiety',
      description: 'Techniques to calm racing thoughts and worries.',
      copingStrategies: [
        'Grounding exercise (5-4-3-2-1)',
        'Box breathing (4-4-4-4)',
        'Talking to a friend',
        'Using calming affirmations',
        'Warm shower or bath'
      ],
      strategyDetails: {
        'Grounding exercise (5-4-3-2-1)': {
          steps: [
            'Name 5 things you see',
            'Name 4 things you can touch',
            '3 things you hear',
            '2 you can smell',
            '1 you can taste'
          ],
          benefits: 'Reconnects you to the present moment'
        },
        'Box breathing (4-4-4-4)': {
          steps: [
            'Inhale 4 seconds',
            'Hold 4 seconds',
            'Exhale 4 seconds',
            'Hold 4 seconds'
          ],
          benefits: 'Regulates breath and calms nervous system'
        },
        'Talking to a friend': {
          steps: [
            'Reach out to someone you trust',
            'Share your feelings openly'
          ],
          benefits: 'Reduces isolation and worry'
        },
        'Using calming affirmations': {
          steps: [
            'Repeat positive, present-tense statements'
          ],
          benefits: 'Reframes negative thoughts'
        },
        'Warm shower or bath': {
          steps: [
            'Focus on warmth and water sensation'
          ],
          benefits: 'Relax muscles and reduce tension'
        }
      },
      recommendedBooks: [
        'The Anxiety and Phobia Workbook by Edmund J. Bourne',
        'Dare: The New Way to End Anxiety by Barry McDonagh',
        'Feeling Good by David D. Burns'
      ]
    },
    {
      id: 'depression',
      name: 'Depression',
      description: 'Support strategies to lift mood and increase energy.',
      copingStrategies: [
        'Short walk outside daily',
        'Do a small enjoyable activity',
        'Talk to a professional or friend',
        'Avoid isolation'
      ],
      strategyDetails: {
        'Short walk outside daily': {
          steps: ['Walk for 5–15 minutes', 'Focus on nature or surroundings'],
          benefits: 'Boosts mood and energy level'
        },
        'Do a small enjoyable activity': {
          steps: ['Engage in something you enjoy, even briefly'],
          benefits: 'Creates a sense of accomplishment'
        },
        'Talk to a professional or friend': {
          steps: ['Schedule a call or visit someone you trust'],
          benefits: 'Helps reduce feelings of sadness'
        },
        'Avoid isolation': {
          steps: ['Join group activities, even online'],
          benefits: 'Strengthens social support'
        }
      },
      recommendedBooks: [
        'Lost Connections by Johann Hari',
        'The Noonday Demon by Andrew Solomon',
        'Feeling Good by David D. Burns'
      ]
    },
    {
      id: 'ocd',
      name: 'OCD',
      description: 'Tools to help manage obsessive-compulsive behavior.',
      copingStrategies: [
        'Delay urge for 10 minutes',
        'Practice mindfulness meditation',
        'Label thoughts as “just thoughts”',
        'Use CBT techniques'
      ],
      strategyDetails: {
        'Delay urge for 10 minutes': {
          steps: ['Notice the urge', 'Wait without acting for 10 minutes'],
          benefits: 'Reduces compulsion frequency'
        },
        'Practice mindfulness meditation': {
          steps: ['Focus on your breath or body sensations'],
          benefits: 'Increases control over intrusive thoughts'
        },
        'Label thoughts as “just thoughts”': {
          steps: ['Acknowledge intrusive thoughts without engagement'],
          benefits: 'Reduces thought-powered anxiety'
        },
        'Use CBT techniques': {
          steps: ['Challenge thoughts with evidence and reframe them'],
          benefits: 'Promotes healthier thinking patterns'
        }
      },
      recommendedBooks: [
        'Brain Lock by Jeffrey M. Schwartz',
        'The OCD Workbook by Bruce M. Hyman',
        'Freedom from Obsessive Compulsive Disorder by Jonathan Grayson'
      ]
    },
    {
      id: 'stress',
      name: 'Stress',
      description: 'Strategies to reduce and manage everyday stress.',
      copingStrategies: [
        'Take scheduled breaks',
        'Practice relaxation exercises',
        'Break tasks into smaller steps',
        'Maintain regular sleep schedule'
      ],
      strategyDetails: {
        'Take scheduled breaks': {
          steps: ['Pause every 60–90 minutes', 'Do a stretch or walk away briefly'],
          benefits: 'Prevents burnout'
        },
        'Practice relaxation exercises': {
          steps: ['Try deep breathing, meditation, or yoga'],
          benefits: 'Low stress levels and better focus'
        },
        'Break tasks into smaller steps': {
          steps: ['Divide large tasks into manageable chunks'],
          benefits: 'Reduces overwhelm'
        },
        'Maintain regular sleep schedule': {
          steps: ['Go to bed/wake up at consistent times'],
          benefits: 'Boosts mood and resilience'
        }
      },
      recommendedBooks: [
        'The Relaxation and Stress Reduction Workbook by Martha Davis',
        'Why Zebras Don’t Get Ulcers by Robert M. Sapolsky',
        'Burnout by Emily Nagoski and Amelia Nagoski'
      ]
    }
  ];

  const [activeTip, setActiveTip] = useState(null);
  const [showBooksPopup, setShowBooksPopup] = useState(false);

  return (
    <>
      <div style={{ padding: 24, maxWidth: 900, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Mental Health Support</h1>
        <p style={{ textAlign: 'center' }}>General advice, exercises, and books for various mental health conditions.</p>
        
        {mentalConditions.map((cond, idx) => (
          <section key={cond.id} style={{ marginTop: 32, padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2 style={{ color: '#16a085' }}>{idx + 1}. {cond.name}</h2>
            <p><strong>Description:</strong> {cond.description}</p>

            <h4>Coping Strategies:</h4>
            <ul>
              {cond.copingStrategies.map((tip, ti) => (
                <li key={ti}>
                  {tip} {' '}
                  <button onClick={() => setActiveTip({ condId: cond.id, tip })}>
                    View Details
                  </button>
                </li>
              ))}
            </ul>

            <h4>Recommended Books:</h4>
            <button onClick={() => setActiveTip(null) || setShowBooksPopup(cond.id)}>
              View Books
            </button>
          </section>
        ))}

        <footer style={{ marginTop: 48, textAlign: 'center', fontStyle: 'italic' }}>
          "Taking care of your mind is the best investment you can make."
        </footer>
      </div>

      {/* Strategy Details Popup */}
      {activeTip && (
        <div style={popupStyle}>
          <h3>{`Details for "${activeTip.tip}"`}</h3>
          <p><strong>Steps:</strong></p>
          <ol>
            {mentalConditions.find(c => c.id === activeTip.condId)
              .strategyDetails[activeTip.tip].steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p>
            <strong>Benefits:</strong>{' '}
            {mentalConditions.find(c => c.id === activeTip.condId)
              .strategyDetails[activeTip.tip].benefits}
          </p>
          <button onClick={() => setActiveTip(null)}>Close</button>
        </div>
      )}

      {/* Books Popup */}
      {showBooksPopup && (
        <div style={popupStyle}>
          <h3>Recommended Books</h3>
          <ul>
            {mentalConditions.find(c => c.id === showBooksPopup).recommendedBooks.map((book, i) => (
              <li key={i}>{book}</li>
            ))}
          </ul>
          <button onClick={() => setShowBooksPopup(false)}>Close</button>
        </div>
      )}
    </>
  );
};

const popupStyle = {
  position: 'fixed',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -15%)',
  backgroundColor: '#fff',
  padding: 24,
  border: '2px solid #888',
  borderRadius: 8,
  zIndex: 1000,
  maxWidth: 600,
  width: '90%',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
};

export default Artical;
