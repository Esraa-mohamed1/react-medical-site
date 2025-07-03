import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ProfessionalHelp.css';

const bookSuggestions = {
  anger: [
    'The Anger Trap by Les Carter',
    'The Dance of Anger by Harriet Lerner',
    'Anger: Wisdom for Cooling the Flames by Thich Nhat Hanh',
    'When Anger Hurts: Quieting the Storm Within by Matthew McKay et al.',
    'Letting Go of Anger by Ronald Potter-Efron & Patricia Potter-Efron'

  ],
  anxiety: [
    'The Anxiety and Phobia Workbook by Edmund J. Bourne',
    'Feeling Good: The New Mood Therapy by David D. Burns',
    'Dare: The New Way to End Anxiety by Barry McDonagh',
    'Rewire Your Anxious Brain by Catherine Pittman & Elizabeth Karle',
    'Unwinding Anxiety by Judson Brewer'
  ],
  depression: [
    'Feeling Good: The New Mood Therapy by Dr. David D. Burns',
    ' The Mindful Way Through Depression by Mark Williams, John Teasdale, Zindel Segal & Jon Kabat-Zinn',
    'Undoing Depression by Richard O’Connor',
    'Lost Connections by Johann Hari',
    'The Noonday Demon: An Atlas of Depression by Andrew Solomon'
  ],
  ocd: [
    'Freedom from Obsessive Compulsive Disorder by Dr. Jonathan Grayson',
    'Brain Lock by Dr. Jeffrey M. Schwartz',
    'The OCD Workbook by Bruce Hyman & Cherlene Pedrick',
    'Overcoming Unwanted Intrusive Thoughts by Sally Winston & Martin Seif',
    'Rewire Your OCD Brain by Catherine M. Pittman & William H. Youngs'
  ],
  stress: [
    'The Relaxation and Stress Reduction Workbook by Martha Davis, Elizabeth Robbins Eshelman & Matthew McKay',
    'Burnout: The Secret to Unlocking the Stress Cycle by Emily & Amelia Nagoski',
    'Why Zebras Don’t Get Ulcers by Robert Sapolsky',
    'The Stress-Proof Brain by Melanie Greenbe',
    'Self-Compassion by Kristin Neff'
  ]
};

const ProfessionalHelp = ({ disorder }) => {
  const [showBooks, setShowBooks] = useState(false);
  const navigate = useNavigate();
  const books = bookSuggestions[disorder?.toLowerCase()] || [];

  return (
    <section className="professional-help ">
      <h3 style={{ textAlign: 'center' }}>Professional Support for {disorder}</h3>
      <div className="resource-buttons">
        <button className="resource-button therapist" onClick={() => navigate('/doctors-list')}>
          👩‍⚕️ Find a Therapist
        </button>
        <button className="resource-button chat" onClick={() => navigate('/ai-chat')}>
          💬 Talk to a Chatbot
        </button>
        <button className="resource-button books" onClick={() => setShowBooks(true)}>
          📚 Recommended Books
        </button>
      </div>

      {showBooks && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>Suggested Reading for {disorder}</h4>
            <ul>
              {books.map((book, index) => (
                <li key={index}>📖 {book}</li>
              ))}
            </ul>
            <button className="popup-close" onClick={() => setShowBooks(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalHelp;
