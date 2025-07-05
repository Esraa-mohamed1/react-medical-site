// src/pages/ArticlePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';
import Footer from '../features/homePage/components/Footer';
import BreathingExercise from '../components/article/BreathingExercise';
import CopingStrategies from '../components/article/CopingStrategies';
import ProfessionalHelp from '../components/article/ProfessionalHelp';

import anxietyImg from '../assets/anxiety.png';
import stressImg from '../assets/stress.png';
import depressionImg from '../assets/depression.png';
import ocdImg from '../assets/ocd.png';
import angerImg from '../assets/anger.png';

import '../styles/article.css';

const disorderContent = {
  anger: {
    title: 'What is Anger?',
    intro: 'Anger is a strong emotional response triggered by feeling insulted, threatened, or frustrated. While it\'s a normal emotion, chronic or uncontrolled anger can harm relationships and well-being.',
    details: [
      'Anger is a natural emotion, but when it becomes overwhelming, it can negatively impact relationships and health. It may stem from stress, unresolved trauma, or frustration.',
      'Managing anger involves recognizing its triggers, understanding the physical and emotional response, and using healthy outlets to release it safely.',
      'Learning anger management techniques can lead to improved communication, stronger relationships, and a more peaceful mind.'
    ],
    image: angerImg
  },
  anxiety: {
    title: 'What is Anxiety?',
    intro: 'Anxiety is a natural response to stress, danger, or perceived threat. It helps us prepare for potential danger but can become problematic when excessive.',
    details: [
      'Anxiety disorders can manifest as constant worry, racing thoughts, or panic attacks. It affects both the mind and body.',
      'Causes can include genetics, brain chemistry, trauma, or lifestyle stressors. Recognizing patterns can aid in treatment.',
      'Effective management may include breathing exercises, therapy, and lifestyle changes.'
    ],
    image: anxietyImg
  },
  stress: {
    title: 'What is Stress?',
    intro: 'Stress is a natural response to a perceived threat or challenge. When our brain senses danger, it triggers the release of hormones such as adrenaline and cortisol.',
    details: [
      'These hormones prepare the body to respond to the perceived threat, whether it is by fighting, fleeing, or freezing. In small doses, stress can be helpful as it can motivate us to take action and solve problems. However, chronic stress can have negative effects on our physical and mental health.',
      'It can be caused by a variety of factors, such as work, relationships, health issues, financial problems, and more. While some stress is normal and can even be beneficial in small doses, chronic stress can have negative effects on our physical and mental health.',
      'In this article, we will explore what stress is, its effects on the body, and strategies for managing stress to live a healthier and happier life.'
    ],
    image: stressImg
  },
  depression: {
    title: 'What is Depression?',
    intro: 'Depression is a serious mood disorder that negatively affects how you feel, think, and act.',
    details: [
      'It can lead to feelings of hopelessness, fatigue, and disinterest in daily activities. It is more than just sadness.',
      'Causes may include chemical imbalances, genetics, trauma, or long-term stress.',
      'Treatment often involves therapy, medication, and lifestyle adjustments.'
    ],
    image: depressionImg
  },
  ocd: {
    title: 'What is OCD?',
    intro: 'Obsessive-Compulsive Disorder (OCD) involves recurring, unwanted thoughts and repetitive behaviors.',
    details: [
      'Obsessions are intrusive thoughts, and compulsions are actions taken to reduce anxiety caused by these thoughts.',
      'OCD is not just about being clean or organized — it can significantly interfere with daily functioning.',
      'Cognitive Behavioral Therapy (CBT) and Exposure and Response Prevention (ERP) are common treatments.'
    ],
    image: ocdImg
  }
};

export default function ArticlePage() {
  const { disorderType } = useParams();
  const disorderKey = disorderType?.toLowerCase();
  const content = disorderContent[disorderKey];

  if (!content) {
    return (
      <div className="article-container">
        <h2>Disorder not found</h2>
        <p>We're sorry, but this page doesn't exist.</p>
      </div>
    );
  }

  return (
    <>
      <CustomNavbar />
      <div className='article-wrapper'>
        <div className="article-container">
          <header className="article-header">
            <h2>{content.title}</h2>
          </header>

          <main className="article-content">
            <section className="disorder-detailed-intro">
              <p className="detailed-paragraph">{content.intro}</p>
              <div className="detailed-image">
                <img src={content.image} alt={content.title} />
              </div>
              {content.details.map((paragraph, index) => (
                <p className="detailed-paragraph" key={index}>{paragraph}</p>
              ))}
            </section>

            {['anger', 'anxiety', 'stress'].includes(disorderKey) && (
              <BreathingExercise disorder={disorderKey} />
            )}

            <CopingStrategies disorder={disorderKey} />
            <ProfessionalHelp disorder={disorderKey} />
          </main>

        </div>
      </div>
        <Footer />

    </>
  );
}
