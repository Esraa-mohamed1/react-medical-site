// src/pages/DisorderSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DisorderSelection.css';

import anxietyImg from '../assets/anxiety.png';
import stressImg from '../assets/stress.png';
import depressionImg from '../assets/depression.png';
import ocdImg from '../assets/ocd.png';
import angerImg from '../assets/anger.png';
import CustomNavbar from '../components/Navbar';
import Footer from '../features/homePage/components/Footer';

const DisorderSelection = () => {
  const navigate = useNavigate();

  const disorders = [
    {
      type: 'anxiety',
      title: 'What is Anxiety?',
      description: 'Anxiety is a natural response to stress, danger, or perceived threat. It helps us prepare for potential danger...',
      img: anxietyImg,
      bg: 'card-anxiety'
    },
    {
      type: 'stress',
      title: 'What is Stress?',
      description: 'Stress is the body’s response to challenges. It affects your body, emotions, and behavior...',
      img: stressImg,
      bg: 'card-stress'
    },
    {
      type: 'depression',
      title: 'What is Depression?',
      description: 'Depression is a mood disorder causing persistent feelings of sadness and loss of interest...',
      img: depressionImg,
      bg: 'card-depression'
    },
    {
      type: 'ocd',
      title: 'What is OCD?',
      description: 'OCD involves unwanted thoughts and repetitive behaviors that interfere with daily life...',
      img: ocdImg,
      bg: 'card-ocd'
    },
    {
      type: 'anger',
      title: 'What is Anger?',
      description: 'Anger is a strong emotional response triggered by feeling insulted, threatened, or frustrated...',
      img: angerImg,
      bg: 'card-anger'
    },
  ];

  const handleSelect = (type) => {
    navigate(`/article/${type}`);
  };

  return (
    <>
      <CustomNavbar />

    <div className="disorder-selection-container">
      <div className="banner">
        {/* BE KIND TO YOUR MIND <br />
        BE KIND TO YOUR MIND <br /> */}
        <span>BE KIND TO YOUR MIND</span>
      </div>

      <div className="latest-section">
        <div className="card-grid">
          {disorders.map((disorder) => (
            <div className={`disorder-card ${disorder.bg}`} key={disorder.type}>
              <img src={disorder.img} alt={disorder.title} />
              <h4>{disorder.title}</h4>
              <p>{disorder.description}</p>
              <button onClick={() => handleSelect(disorder.type)}>Read More</button>
            </div>
          ))}
        </div>
      </div>

    </div>
     <Footer />
    
    </>
  );
};

export default DisorderSelection;