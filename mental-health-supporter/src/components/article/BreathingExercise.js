import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/BreathingExercise.css';

const BreathingExercise = ({ disorder }) => {
  const { t } = useTranslation();
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'inhale') {
          setTimeout(() => setBreathPhase('exhale'), 4000);
          return 'hold';
        } else if (prev === 'hold') {
          return 'exhale';
        } else {
          setTimeout(() => setBreathPhase('inhale'), 4000);
          setBreathCount(c => c + 1);
          return 'rest';
        }
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [isBreathingActive]);

  return (
    <section className={`breathing-exercise ${isBreathingActive ? 'active' : ''}`}>
      <h3>{t('breathingExercise.when_you_feel')} {disorder?.toLowerCase()} {t('breathingExercise.rising')}</h3>
      <div className="breathing-visual">
        <div className={`breathing-circle ${breathPhase}`}>
          <div className="breathing-text">
            {!isBreathingActive ? (
              <>
                <p>{t('breathingExercise.try_guided_breathing')}</p>
                <button
                  className="start-breathing"
                  onClick={() => setIsBreathingActive(true)}
                >
                  {t('breathingExercise.start_breathing')}
                </button>
              </>
            ) : (
              <>
                <p className="breath-instruction">
                  {breathPhase === 'inhale' && t('breathingExercise.breathe_in')}
                  {breathPhase === 'hold' && t('breathingExercise.hold')}
                  {breathPhase === 'exhale' && t('breathingExercise.breathe_out')}
                  {breathPhase === 'rest' && t('breathingExercise.rest')}
                </p>
                <div className="breath-count">{t('breathingExercise.breaths')}: {breathCount}</div>
                <button
                  className="stop-breathing"
                  onClick={() => {
                    setIsBreathingActive(false);
                    setBreathPhase('inhale');
                  }}
                >
                  {t('breathingExercise.finish')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="breathing-instructions">
        <p>{t('breathingExercise.follow_rhythm')}</p>
      </div>
    </section>
  );
};

export default BreathingExercise;
