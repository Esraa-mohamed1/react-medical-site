import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomNavbar from '../components/Navbar';
import Footer from '../features/homePage/components/Footer';
import BreathingExercise from '../components/article/BreathingExercise';
import CopingStrategies from '../components/article/CopingStrategies';
import ProfessionalHelp from '../components/article/ProfessionalHelp';
import MentalDisorderIntro from '../components/article/MentalDisorderIntro';
import '../styles/article.css';

export default function ArticlePage() {
  const { disorderType } = useParams();
  const { t } = useTranslation();

  const disorderKey = disorderType?.toLowerCase();
  const title = t(`articleTitles.${disorderKey}`, { defaultValue: t('articleTitles.default') });

  return (
    <>
      <CustomNavbar />
      <div className="article-container">
        <header className="article-header">
          <h2>{title}</h2>
        </header>

        <main className="article-content">
          {['anger', 'anxiety', 'stress'].includes(disorderKey) && (
            <BreathingExercise disorder={disorderKey} />
          )}

          <MentalDisorderIntro disorder={disorderKey} />
          <CopingStrategies disorder={disorderKey} />
          <ProfessionalHelp disorder={disorderKey} />
        </main>
      </div>
      <Footer />
    </>
  );
}
