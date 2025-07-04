import React from 'react';
import { useParams } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';
import Footer from '../features/homePage/components/Footer';
import BreathingExercise from '../components/article/BreathingExercise';
import CopingStrategies from '../components/article/CopingStrategies';
import ProfessionalHelp from '../components/article/ProfessionalHelp';
import MentalDisorderIntro from '../components/article/MentalDisorderIntro';
import '../styles/article.css';

const disorderTitles = {
  anger: 'Anger Management',
  anxiety: 'Managing Anxiety',
  depression: 'Overcoming Depression',
  ocd: 'Understanding OCD',
  stress: 'Stress Relief Techniques'
};

export default function ArticlePage() {
  const { disorderType } = useParams();
  const title = disorderTitles[disorderType?.toLowerCase()] || 'Mental Health Support';

  return (
    <>
      <CustomNavbar />
      <div className="article-container">
        <header className="article-header">
          {/* <h1>MENTAL HEALTH SUPPORT</h1> */}
          <h2>{title}</h2>
        </header>

        <main className="article-content">
          {['anger', 'anxiety', 'stress'].includes(disorderType?.toLowerCase()) && (
            <BreathingExercise disorder={disorderType} />
           )}
      
          <MentalDisorderIntro disorder={disorderType} />
          <CopingStrategies disorder={disorderType} />
          <ProfessionalHelp disorder={disorderType} />
        </main>

      </div>
              <Footer />

    </>
  );
}