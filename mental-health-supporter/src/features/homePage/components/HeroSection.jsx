import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../style/HeroSection.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();  // Use translation hook
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'patient') {
      navigate('/doctors-list');
    }
  };

  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const showAppointmentButton = !user || user.role === 'patient';

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.subtitle}>{t('heroSection.feelTheDifference')}</p>
          <h1 className={styles.title}>
            {t('heroSection.yourHealthPriority')} <span className={styles.titleBlock}>{t('heroSection.isOurPriority')}</span>
          </h1>
          {showAppointmentButton && (
            <div className={styles.buttonGroup}>
              <button
                className={styles.primaryButton}
                onClick={handleAppointmentClick}
              >
                {t('heroSection.searchForDoctors')}
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => navigate('/artical')}
              >
                {t('heroSection.readArticles')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
