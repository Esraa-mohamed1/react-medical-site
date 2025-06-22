import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "../style/HeroSection.module.css"
import { useNavigate } from "react-router-dom"

export default function HeroSection() {
  const navigate = useNavigate()

  const handleAppointmentClick = () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('loggedUser'))
    
    if (!user) {
      navigate('/login')
      return
    }
    
    if (user.role === 'patient') {
      navigate('/doctors')
    }
  }

  const user = JSON.parse(localStorage.getItem('loggedUser'))
  const showAppointmentButton = !user || user.role === 'patient'
  const showDashboardButton = user && user.role === 'doctor'

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.subtitle}>FEEL THE DIFFERENCE WITH US</p>
          <h1 className={styles.title}>
            Your Health <span className={styles.titleBlock}>Is Our Priority</span>
          </h1>
          <div className={styles.buttonGroup}>
            {showAppointmentButton && (
              <button 
                className={styles.primaryButton}
                onClick={handleAppointmentClick}
              >
                Book An Appointment
              </button>
            )}
            {showDashboardButton && (
              <button 
                className={styles.primaryButton}
                onClick={() => navigate('/doctor/dashboard')}
              >
                Go to Dashboard
              </button>
            )}
            <button 
              className={styles.secondaryButton}
              onClick={() => navigate('/articles')}
            >
              Read Articles
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}