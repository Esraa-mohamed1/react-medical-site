import React, { useState } from 'react';
import TriggerList from  '../components/articalComponents/TriggerList' ;
import MoodTracker from   '../components/articalComponents/MoodTracker' ;
import CopingStrategies from  '../components/articalComponents/CopingStrategies' ;
import BreathingExercise from  '../components/articalComponents/BreathingExercise'  ;
import ProfessionalHelp from  '../components/articalComponents/ProfessionalHelp' ;
import '../styles/MentalHealthArticle.css' ;

const MentalHealthArticle = ({ clientData = {} }) => {
  const {
    name = 'Client',
    angerLevel = 50,
    triggers = [
      'Stressful situations',
      'Feeling misunderstood',
      'Unexpected changes',
      'Lack of sleep',
      'Hunger'
    ],
    lastEpisode = '3 days ago'
  } = clientData;

  return (
    <div className="article-container">
      <header className="article-header">
        <div className="header-overlay"></div>
        <h1>MENTAL HEALTH SUPPORT</h1>
        <h2>Personalized Anger Management Guide</h2>
        <div className="user-greeting">
          <span className="welcome">Welcome, </span>
          <span className="username">{name}</span>
        </div>
      </header>
      
      <main className="article-content">
        <BreathingExercise />
        
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
              <h4>Last Anger Episode</h4>
              <div className="episode-display">{lastEpisode}</div>
              
              <h4>Common Triggers</h4>
              <TriggerList triggers={triggers} />
            </div>
          </div>
        </section>
        
        <CopingStrategies />
        <ProfessionalHelp angerLevel={angerLevel} />
        <MoodTracker />
      </main>
      
      <footer className="article-footer">
        <div className="footer-quote">
          "Peace comes from within. Do not seek it without." - Buddha
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthArticle;