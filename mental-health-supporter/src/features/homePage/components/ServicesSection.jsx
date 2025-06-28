import { FileText, Users, Microscope, Clock, User, Heart } from "lucide-react";
import styles from "../style/ServicesSection.module.css";
import { useTranslation } from "react-i18next";

// Defining services with dynamic translation keys
const services = [
  {
    icon: FileText,
    titleKey: "medicalCounselingTitle",
    descriptionKey: "medicalCounselingDescription",
  },
  {
    icon: Users,
    titleKey: "topLevelDoctorsTitle",
    descriptionKey: "topLevelDoctorsDescription",
  },
  {
    icon: Microscope,
    titleKey: "medicalFacilitesTitle",
    descriptionKey: "medicalFacilitesDescription",
  },
  {
    icon: Clock,
    titleKey: "twentyFourHoursServicesTitle",
    descriptionKey: "twentyFourHoursServicesDescription",
  },
  {
    icon: User,
    titleKey: "personalServicesTitle",
    descriptionKey: "personalServicesDescription",
  },
  {
    icon: Heart,
    titleKey: "dedicatedPatientCareTitle",
    descriptionKey: "dedicatedPatientCareDescription",
  },
];

export default function ServicesSection() {
  const { t } = useTranslation();  // Use translation hook

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Content */}
          <div>
            <p className={styles.subtitle}>{t('servicesSection.whyChoose')}</p>
            <h2 className={styles.title}>
              <span className={styles.titleHighlight}>{t('servicesSection.theBestForHealth')}</span> <span className="text-light">{t('servicesSection.forYourHealth')}</span>
            </h2>

            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <div key={index} className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={styles.serviceContent}>
                    <h3>{t(`servicesSection.${service.titleKey}`)}</h3>
                    <p>{t(`servicesSection.${service.descriptionKey}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image - Placeholder */}
          <div className={styles.imageContainer}>
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '1.5rem'
            }}>
              <img
                src="/images/mental-health-banner-choose-wellness-260nw-2480281739.jpg"  // Absolute path starting from the public folder
                alt="Mental Health"
                style={{
                  width: "850px",  // Fixed width of 800px
                  height: "auto",  // Height adjusts automatically based on width to maintain aspect ratio
                  borderRadius: "10px"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
