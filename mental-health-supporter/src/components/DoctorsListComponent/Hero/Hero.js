import React from 'react';
import './Hero.css';
import { useTranslation } from 'react-i18next';


const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="hero">
  <div className="hero-content">
<h1 className="hero-title">{t('hero.bestDoctors')}</h1>
<p className="hero-subtitle">{t('hero.bookOnline')}</p>
<p className="hero-stats">{t('hero.qualifiedDoctors')}</p>
  </div>
</div>

  );
};

export default Hero;