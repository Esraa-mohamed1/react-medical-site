import React from 'react';
import BreathingExercise from '../components/article/BreathingExercise';
import ProfessionalHelp from '../components/article/ProfessionalHelp';
import MoodProgress from '../components/article/MoodProgress';
import TriggerList from '../components/article/TriggerList';
import CopingStrategies from '../components/article/CopingStrategies';
import MoodTracker from '../components/article/MoodTracker';
import '../styles/MentalHealthArticle.css';
import Footer from "./../features/homePage/components/Footer";



const MentalHealthArticle = ({ clientData = {} }) => {
  const {
    name = 'Client',
    triggers = [
      'Stressful situations',
      'Feeling misunderstood',
      'Unexpected changes',
      'Lack of sleep',
      'Hunger'
    ],
    lastEpisode = '3 days ago',
    moodData = [
      { name: 'Anger', level: 65, color: '#FF6B6B', icon: '😠' },
      { name: 'Frustration', level: 45, color: '#FFA500', icon: '😤' },
      { name: 'Anxiety', level: 30, color: '#FFD700', icon: '😰' },
      { name: 'Sadness', level: 20, color: '#87CEEB', icon: '😢' },
      { name: 'Calmness', level: 40, color: '#90EE90', icon: '😌' }
    ]
  } = clientData;

  return (
    <div className='artical-page'>
    <div className="article-container">
      <header className="article-header">
        <div className="header-overlay"></div>
        <h1>Pearla</h1>
        {/* <h2>Personalized Emotional Management Guide</h2> */}
        <div className="user-greeting">
          <span className="welcome">Welcome, </span>
          <span className="username">{name}</span>
        </div>
      </header>

      <main className="article-content">
        <BreathingExercise />

        <section >
          <h3>Your Emotional Profile</h3>

          <div className="mood-profile-content">
            <div className="mood-card">
              <h4>Your Mood Profile</h4>
              <MoodProgress moodData={moodData} />
            </div>

            <div className="trigger-card">
              <h4>Common Triggers</h4>
              <TriggerList triggers={triggers} />
            </div>
          </div>
        </section>


        <CopingStrategies />
        <ProfessionalHelp primaryMoodLevel={moodData[0].level} />
        <MoodTracker />
      </main>

      <footer className="article-footer">
        <p className="footer-message">
          "Understanding your emotions is the first step toward managing them effectively."
        </p>
      </footer>
    </div>
    <Footer />
    </div>
  );
};

export default MentalHealthArticle;