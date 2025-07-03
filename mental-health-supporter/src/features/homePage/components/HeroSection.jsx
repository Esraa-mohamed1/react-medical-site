import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../style/HeroSection.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const showAppointmentButton = !user || user.role === 'patient';

  const handleAppointmentClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'patient') {
      navigate('/doctors-list');
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.subtitle}>{t('heroSection.feelTheDifference')}</p>
          <h1 className={styles.title}>
            {t('heroSection.yourHealthPriority')}{" "}
            <span className={styles.titleBlock}>{t('heroSection.isOurPriority')}</span>
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

              <div className={styles.section} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
                <Link to="/ai-chat" style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      padding: '1rem 2rem',
                      background: '#5c6bc0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    {t('heroSection.ChatwithAIAssistant')}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
