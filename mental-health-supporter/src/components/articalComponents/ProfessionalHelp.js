import React, { useState } from 'react';
import  '../../styles/ProfessionalHelp.css' ;

const ProfessionalHelp = ({ angerLevel }) => {
  const [showBooks, setShowBooks] = useState(false);
  const books = [
    'The Anger Trap by Les Carter',
    'Rage: A Step-by-Step Guide to Overcoming Explosive Anger',
    'Anger Management for Dummies by W. Doyle Gentry',
    'The Dance of Anger by Harriet Lerner'
  ];

  return (
    <section className="professional-help">
      <div className="help-content">
        <h3>Professional Support</h3>
        {/* <div className="recommendation">
          {angerLevel > 70 ? (
            <>
              <div className="urgent-alert">❗ Important Recommendation</div>
              <p>Based on your responses, we strongly recommend connecting with a mental health professional.</p>
            </>
          ) : (
            <p>Consider these resources for additional support:</p>
          )
          }
        </div> */}
        <div className="resource-buttons">
          <button className="resource-button therapist">
            <span className="icon">👩‍⚕️</span>
            Find a Therapist
          </button>
          <button className="resource-button chat">
            <span className="icon">💬</span>
            Chat with a Friend
          </button>
          <button 
            className="resource-button books"
            onClick={() => setShowBooks(true)}
          >
            <span className="icon">📚</span>
            Recommended Books
          </button>
        </div>
      </div>

      {showBooks && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Recommended Reading</h3>
            <ul className="book-list">
              {books.map((book, index) => (
                <li key={index}>📖 {book}</li>
              ))}
            </ul>
            <button 
              className="popup-close"
              onClick={() => setShowBooks(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalHelp;