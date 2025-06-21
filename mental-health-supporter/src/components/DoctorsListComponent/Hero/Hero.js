import React from 'react';
import './Hero.css';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="hero">
      <h1 className="hero-title">{t('hero.title')}</h1>
      <p className="hero-subtitle">{t('hero.subtitle')}</p>
      <p className="hero-stats">{t('hero.stats')}</p>
    </div>
  );
};

export default Hero;
