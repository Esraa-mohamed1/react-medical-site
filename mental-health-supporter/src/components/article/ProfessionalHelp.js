import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/ProfessionalHelp.css';

const bookSuggestions = {
  anger: [
    'bookSuggestions.anger.0',
    'bookSuggestions.anger.1',
    'bookSuggestions.anger.2',
    'bookSuggestions.anger.3',
    'bookSuggestions.anger.4',
  ],
  anxiety: [
    'bookSuggestions.anxiety.0',
    'bookSuggestions.anxiety.1',
    'bookSuggestions.anxiety.2',
    'bookSuggestions.anxiety.3',
    'bookSuggestions.anxiety.4',
  ],
  depression: [
    'bookSuggestions.depression.0',
    'bookSuggestions.depression.1',
    'bookSuggestions.depression.2',
    'bookSuggestions.depression.3',
    'bookSuggestions.depression.4',
  ],
  ocd: [
    'bookSuggestions.ocd.0',
    'bookSuggestions.ocd.1',
    'bookSuggestions.ocd.2',
    'bookSuggestions.ocd.3',
    'bookSuggestions.ocd.4',
  ],
  stress: [
    'bookSuggestions.stress.0',
    'bookSuggestions.stress.1',
    'bookSuggestions.stress.2',
    'bookSuggestions.stress.3',
    'bookSuggestions.stress.4',
  ]
};

const ProfessionalHelp = ({ disorder }) => {
  const [showBooks, setShowBooks] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const books = bookSuggestions[disorder?.toLowerCase()] || [];

  return (
    <section className="professional-help">
      <h3 style={{ textAlign: 'center' }}>
        {t('professionalHelp.title', { disorder })}
      </h3>
      <div className="resource-buttons">
        <button className="resource-button therapist" onClick={() => navigate('/doctors-list')}>
          👩‍⚕️ {t('professionalHelp.findTherapist')}
        </button>
        <button className="resource-button chat" onClick={() => navigate('/ai-chat')}>
          💬 {t('professionalHelp.chatbot')}
        </button>
        <button className="resource-button books" onClick={() => setShowBooks(true)}>
          📚 {t('professionalHelp.recommendedBooks')}
        </button>
      </div>

      {showBooks && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>{t('professionalHelp.suggestedReading', { disorder })}</h4>
            <ul>
              {books.map((bookKey, index) => (
                <li key={index}>📖 {t(bookKey)}</li>
              ))}
            </ul>
            <button className="popup-close" onClick={() => setShowBooks(false)}>
              {t('professionalHelp.close')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalHelp;
