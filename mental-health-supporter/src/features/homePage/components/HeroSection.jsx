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
      navigate('/doctors-list')
    }
  }

  const user = JSON.parse(localStorage.getItem('loggedUser'))
  const showAppointmentButton = !user || user.role === 'patient'

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.subtitle}>FEEL THE DIFFERENCE WITH US</p>
          <h1 className={styles.title}>
            Your Health <span className={styles.titleBlock}>Is Our Priority</span>
          </h1>
          {showAppointmentButton && (
            <div className={styles.buttonGroup}>
              <button
                className={styles.primaryButton}
                onClick={handleAppointmentClick}
              >
                Search for Doctors
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => navigate('/artical')}
              >
                Read Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}