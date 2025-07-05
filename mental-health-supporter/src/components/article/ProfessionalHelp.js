import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ProfessionalHelp.css';

// src/data/bookSuggestions.js
export const bookSuggestions = {
  anger: [
    {
      title: 'The Anger Trap by Les Carter',
      link: 'https://www.amazon.com/Anger-Trap-Yourself-Frustrations-Sabotage/dp/0787968803'
    },
    {
      title: 'The Dance of Anger by Harriet Lerner',
      link: 'https://www.amazon.com/Dance-Anger-Changing-Patterns-Relationships/dp/0062319043'
    },
    {
      title: 'Anger: Wisdom for Cooling the Flames by Thich Nhat Hanh',
      link: 'https://www.amazon.com/Anger-Cooling-Thich-Nhat-Hanh/dp/1573229377'
    },
    {
      title: 'When Anger Hurts: Quieting the Storm Within by Matthew McKay et al.',
      link: 'https://www.amazon.com/When-Anger-Hurts-Quieting-Within/dp/1572243449'
    },
    {
      title: 'Letting Go of Anger by Ronald Potter‑Efron & Patricia Potter‑Efron',
      link: 'https://www.amazon.com/Letting-Go-Anger-Eleven-Common/dp/1572244488'
    }
  ],
  anxiety: [
    {
      title: 'The Anxiety and Phobia Workbook by Edmund J. Bourne',
      link: 'https://www.amazon.com/Anxiety-Phobia-Workbook-Edmund-Bourne/dp/1684034833'
    },
    {
      title: 'Feeling Good: The New Mood Therapy by David D. Burns',
      link: 'https://www.amazon.com/Feeling-Good-New-Mood-Therapy/dp/0380810336'
    },
    {
      title: 'Dare: The New Way to End Anxiety by Barry McDonagh',
      link: 'https://www.amazon.com/Dare-Anxiety-Stop-Panic-Attacks/dp/0956596258'
    },
    {
      title: 'Rewire Your Anxious Brain by Catherine Pittman & Elizabeth Karle',
      link: 'https://www.amazon.eg/-/en/Rewire-Your-Anxious-Brain-Neuroscience/dp/1626251134'
    },
    {
      title: 'Unwinding Anxiety by Judson Brewer',
      link: 'https://www.amazon.com/Unwinding-Anxiety-Science-Shows-Cycles/dp/0593330447'
    }
  ],
  depression: [
    {
      title: 'Feeling Good: The New Mood Therapy by Dr. David D. Burns',
      link: 'https://www.amazon.com/Feeling-Good-New-Mood-Therapy/dp/0380810336'
    },
    {
      title: 'The Mindful Way Through Depression by Mark Williams et al.',
      link: 'https://www.amazon.com/Mindful-Way-Through-Depression-Unhappiness/dp/1593851286'
    },
    {
      title: 'Undoing Depression by Richard O’Connor',
      link: 'https://www.amazon.com/Undoing-Depression-Therapy-Doesnt-Medication/dp/0425166791'
    },
    {
      title: 'Lost Connections by Johann Hari',
      link: 'https://www.amazon.com/Lost-Connections-Uncovering-Depression-Unexpected/dp/163286830X'
    },
    {
      title: 'The Noonday Demon: An Atlas of Depression by Andrew Solomon',
      link: 'https://www.amazon.eg/-/en/Noonday-Demon-Atlas-Depression/dp/1501123882'
    }
  ],
  ocd: [
    {
      title: 'Freedom from Obsessive Compulsive Disorder by Dr. Jonathan Grayson',
      link: 'https://www.amazon.com/Freedom-Obsessive-Compulsive-Disorder-Personalized/dp/042527389X'
    },
    {
      title: 'Brain Lock by Dr. Jeffrey M. Schwartz',
      link: 'https://www.amazon.com/Brain-Lock-Twentieth-Anniversary-Obsessive-Compulsive/dp/006256143X'
    },
    {
      title: 'The OCD Workbook by Bruce Hyman & Cherlene Pedrick',
      link: 'https://www.amazon.com/OCD-Workbook-Breaking-Obsessive-Compulsive-Disorder/dp/1572249218'
    },
    {
      title: 'Overcoming Unwanted Intrusive Thoughts by Sally Winston & Martin Seif',
      link: 'https://www.amazon.com/Overcoming-Unwanted-Intrusive-Thoughts-Frightening/dp/1626254346'
    },
    {
      title: 'Rewire Your OCD Brain by Catherine M. Pittman & William H. Youngs',
      link: 'https://www.amazon.com/Rewire-Your-OCD-Brain-Neuroscience-Based/dp/1684037182'
    }
  ],
  stress: [
    {
      title: 'The Relaxation and Stress Reduction Workbook by Martha Davis et al.',
      link: 'https://www.amazon.com/s?k=The+Relaxation+and+Stress+Reduction+Workbook+by+Martha+Davis+et+al.&i=stripbooks-intl-ship&crid=2N5OLH56I0PVA&sprefix=the+relaxation+and+stress+reduction+workbook+by+martha+davis+et+al.%2Cstripbooks-intl-ship%2C274&ref=nb_sb_noss'
    },
    {
      title: 'Burnout: The Secret to Unlocking the Stress Cycle by Emily & Amelia Nagoski',
      link: 'https://www.amazon.com/s?k=Burnout%3A+The+Secret+to+Unlocking+the+Stress+Cycle+by+Emily+%26+Amelia+Nagoski&i=stripbooks-intl-ship&crid=XZBKU1ARKIUX&sprefix=burnout+the+secret+to+unlocking+the+stress+cycle+by+emily+%26+amelia+nagoski%2Cstripbooks-intl-ship%2C288&ref=nb_sb_noss'
    },
    {
      title: 'Why Zebras Don’t Get Ulcers by Robert Sapolsky',
      link: 'https://www.amazon.com/Why-Zebras-Dont-Ulcers-Third/dp/0805073698'
    },
    {
      title: 'The Stress-Proof Brain by Melanie Greenberg',
      link: 'https://www.amazon.com/Stress-Proof-Brain-Emotional-Mindfulness-Neuroplasticity/dp/1626252661'
    },
    {
      title: 'Self-Compassion by Kristin Neff',
      link: 'https://www.amazon.com/Self-Compassion-Proven-Power-Being-Yourself/dp/0061733520'
    }
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
          💬 Talk to pearla
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
          <li key={index}>
            📖 {book.title}
            <br />
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="book-link"
            >
              Read  →
            </a>
          </li>
        ))}
      </ul>

      <span className="popup-close-icon" onClick={() => setShowBooks(false)}>×</span>
    </div>
  </div>
)}

    </section>
  );
};

export default ProfessionalHelp;
