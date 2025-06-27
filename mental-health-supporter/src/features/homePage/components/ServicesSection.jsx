import { FileText, Users, Microscope, Clock, User, Heart } from "lucide-react"
import styles from "../style/ServicesSection.module.css"
// import mentalHealthImage from '../../images/mental-health-image.jpg';

const services = [
  {
    icon: FileText,
    title: "MEDICAL COUNSELING",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit vero. Donec ultri sollicitudin lacus",
  },
  {
    icon: Users,
    title: "TOP LEVEL DOCTORS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit vero. Donec ultri sollicitudin lacus",
  },
  {
    icon: Microscope,
    title: "MEDICAL FACILITES",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit vero. Donec ultri sollicitudin lacus",
  },
  {
    icon: Clock,
    title: "24 HOURS SERVICES",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit vero. Donec ultri sollicitudin lacus",
  },
  {
    icon: User,
    title: "PERSONAL SERVICES",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit vero. Donec ultri sollicitudin lacus",
  },
  {
    icon: Heart,
    title: "DEDICATED PATIENT CARE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit vero. Donec ultri sollicitudin lacus",
  },
]

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Content */}
          <div>
            <p className={styles.subtitle}>WHY CHOOSE HOPE MEDICAL</p>
            <h2 className={styles.title}>
              <span className={styles.titleHighlight}>The Best</span> <span className="text-light">For Your Health</span>
            </h2>

            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <div key={index} className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={styles.serviceContent}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
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
  )
}
