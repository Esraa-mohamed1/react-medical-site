// ✅ src/components/article/CopingStrategies.js
import React, { useState } from 'react';
import '../../styles/CopingStrategies.css';

const copingContent = {
  anger: {
    reason: 'Anger can arise from frustration, feeling threatened, unresolved trauma, or stress overload.',
    strategies: [
      {
        tip: 'Practice deep breathing for 5 minutes',
        howTo: [
          'Find a quiet space',
          'Inhale deeply through your nose for 4 seconds',
          'Hold your breath for 4 seconds',
          'Exhale slowly through your mouth for 6 seconds',
          'Repeat for 5 minutes'
        ],
        benefit: 'Helps regulate emotional intensity and reduce physiological arousal.'
      },
      {
        tip: 'Take a 10-minute walk in nature',
        howTo: [
          'Go outside to a green space',
          'Walk at a comfortable pace',
          'Notice sights, sounds, and smells around you'
        ],
        benefit: 'Reduces cortisol and improves mood by engaging senses.'
      },
      {
        tip: 'Write down your feelings in a journal',
        howTo: [
          'Use a notebook or app',
          'Express what triggered your anger',
          'Write without censoring yourself'
        ],
        benefit: 'Provides emotional release and self-awareness.'
      },
      {
        tip: 'Listen to calming music',
        howTo: [
          'Use instrumental or soft music',
          'Close your eyes and breathe with the rhythm'
        ],
        benefit: 'Distracts the mind and reduces irritability.'
      },
      {
        tip: 'Practice progressive muscle relaxation',
        howTo: [
          'Tense each muscle group for 5 seconds',
          'Then relax for 10 seconds',
          'Start from feet and go up to head'
        ],
        benefit: 'Reduces physical tension and induces calm.'
      }
    ]
  },
  anxiety: {
    reason: 'Anxiety often stems from uncertainty, overwhelming pressure, or past trauma that triggers fear responses.',
    strategies: [
      {
        tip: 'Try grounding techniques',
        howTo: [
          'Name 5 things you can see',
          '4 things you can touch',
          '3 things you can hear',
          '2 things you can smell',
          '1 thing you can taste'
        ],
        benefit: 'Helps bring focus to the present moment and reduce panic.'
      },
      {
        tip: 'Do a short mindfulness meditation',
        howTo: [
          'Sit quietly and close your eyes',
          'Focus on your breath for 5–10 minutes',
          'Refocus gently when thoughts wander'
        ],
        benefit: 'Improves awareness and reduces anxious thoughts.'
      },
      {
        tip: 'Use a calming mantra',
        howTo: [
          'Pick a soothing phrase (e.g. "I am safe")',
          'Repeat it aloud or in your mind during anxiety'
        ],
        benefit: 'Provides reassurance and interrupts negative thinking loops.'
      },
      {
        tip: 'Box Breathing (4-4-4-4 Technique)',
        howTo: [
          'Inhale for 4 seconds',
          'Hold for 4 seconds',
          'Exhale for 4 seconds',
          'Hold for 4 seconds again and repeat'
        ],
        benefit: 'Regulates nervous system and reduces anxiety.'
      },
      {
        tip: 'Progressive Muscle Relaxation (PMR)',
        howTo: [
          'Start from your toes and work upward',
          'Tense each muscle group for 5 seconds then release'
        ],
        benefit: 'Reduces physical symptoms of anxiety and promotes relaxation.'
      }
    ]
  },
  depression: {
    reason: 'Depression may result from chemical imbalances, prolonged stress, loss, or unresolved emotional pain.',
    strategies: [
      {
        tip: 'Create a small to-do list',
        howTo: [
          'Write 2–3 simple tasks for the day',
          'Start with the easiest one',
          'Celebrate each small win'
        ],
        benefit: 'Gives a sense of purpose and achievement.'
      },
      {
        tip: 'Reach out to someone you trust',
        howTo: [
          'Call or message a friend or loved one',
          'Be honest about how you’re feeling'
        ],
        benefit: 'Helps reduce feelings of isolation and loneliness.'
      },
      {
        tip: 'Do one enjoyable activity',
        howTo: [
          'Choose something you used to enjoy',
          'Try doing it for even 10 minutes'
        ],
        benefit: 'Re-engages pleasure centers in the brain and improves mood.'
      },
      {
        tip: 'Practice self-compassion',
        howTo: [
          'Talk to yourself as you would to a struggling friend',
          'Use affirmations like: “I am doing the best I can.”'
        ],
        benefit: 'Counters negative self-talk and builds emotional resilience.'
      },
      {
        tip: 'Journal your thoughts',
        howTo: [
          'Write 1–2 paragraphs about your emotions',
          'End with a small thing you’re grateful for'
        ],
        benefit: 'Externalizes emotions and introduces a positive lens.'
      }
    ]
  },
  ocd: {
    reason: 'OCD often emerges due to a need for control, heightened responsibility fears, or inherited tendencies.',
    strategies: [
      {
        tip: 'Practice exposure and response prevention (ERP)',
        howTo: [
          'Identify a minor trigger',
          'Avoid performing the compulsion after exposure',
          'Repeat daily with support if needed'
        ],
        benefit: 'Helps retrain the brain to tolerate uncertainty and anxiety.'
      },
      {
        tip: 'Write down intrusive thoughts without judgment',
        howTo: [
          'Acknowledge the thought without acting on it',
          'Write it in a notebook to externalize it'
        ],
        benefit: 'Helps gain distance from obsessive thoughts and reduce distress.'
      }
    ]
  },
  stress: {
    reason: 'Stress can be triggered by high demands, lack of control, change, or conflict in daily life.',
    strategies: [
      {
        tip: 'Take a short break and stretch',
        howTo: [
          'Stand up and move away from your workspace',
          'Do simple neck rolls, shoulder shrugs, and back stretches',
          'Breathe deeply while stretching'
        ],
        benefit: 'Relieves physical tension, boosts circulation, and gives your brain a reset.'
      },
      {
        tip: 'Practice time blocking',
        howTo: [
          'Divide your tasks into focused work periods (e.g., 25–45 minutes)',
          'Insert short 5–10 minute breaks in between',
          'Use a timer or planner'
        ],
        benefit: 'Increases productivity and prevents burnout from multitasking or long hours.'
      },
      {
        tip: 'Use the 4-7-8 breathing technique',
        howTo: [
          'Inhale through your nose for 4 seconds',
          'Hold your breath for 7 seconds',
          'Exhale through your mouth for 8 seconds',
          'Repeat 3–4 times'
        ],
        benefit: 'Activates the parasympathetic nervous system, calming the body.'
      },
      {
        tip: 'Limit stimulants and screen time',
        howTo: [
          'Reduce caffeine and sugar, especially late in the day',
          'Take breaks from screens every hour (20-20-20 rule)'
        ],
        benefit: 'Helps regulate mood, reduce overstimulation, and support better sleep.'
      },
      {
        tip: 'Talk it out or write it down',
        howTo: [
          'Call a friend or write in a journal',
          'Focus on what’s bothering you and how it makes you feel'
        ],
        benefit: 'Provides emotional release and clarity, preventing stress from building up.'
      }
    ]
  }
};

const CopingStrategies = ({ disorder }) => {
  const [activeTip, setActiveTip] = useState(null);
  const content = copingContent[disorder?.toLowerCase()] || {};
  const tips = content.strategies || [];
  const reason = content.reason;

  return (
    <section className="personalized-tips container">
      <h3>Coping Strategies for {disorder}</h3>
      {reason && <p className="disorder-reason"><strong>Why it happens:</strong> {reason}</p>}
      <div className="row">
        {tips.map((tipObj, index) => (
          <div className="col-sm-6 col-md-4 mb-4" key={index}>
            <div className="tip-card">
              <div className="tip-icon">{['🧘','🚶','✍️','🎵','💪'][index % 5]}</div>
              <p>{tipObj.tip}</p>
              <button className="try-button" onClick={() => setActiveTip(tipObj)}>Try This</button>
            </div>
          </div>
        ))}
      </div>

      {activeTip && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>{activeTip.tip}</h4>
            <h5>How to Apply:</h5>
            <ul>
              {activeTip.howTo.map((step, idx) => <li key={idx}>{step}</li>)}
            </ul>
            <p><strong>Why it helps:</strong> {activeTip.benefit}</p>
            <button className="popup-close" onClick={() => setActiveTip(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CopingStrategies;