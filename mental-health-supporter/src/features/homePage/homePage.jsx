// import Header from "./components/Header"
// import HeroSection from "./components/HeroSection"
// import ServicesSection from "./components/ServicesSection"
// import DoctorsSection from "./components/DoctorsSection"
// import TipsAndFaqSection from "./components/TipsAndFaqSection"
// import Footer from "./components/Footer"
// import styles from "./style/HomePage.module.css"

// export default function HomePage() {
//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <div className={styles.section}>
//           <Header />
//         </div>
//         <div className={styles.section}>
//           <HeroSection />
//         </div>
//         <div className={styles.section} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
//           <button
//             onClick={() => window.location.href = '/mood'}
//             style={{
//               padding: '1rem 2rem',
//               background: '#6e8efb',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               fontWeight: 'bold',
//               fontSize: '1.1rem',
//               cursor: 'pointer',
//               boxShadow: '0 2px 8px rgba(110, 142, 251, 0.15)'
//             }}
//           >
//             Test your mood
//           </button>
//           <button
//             onClick={() => window.location.href = '/doctors'}
//             style={{
//               padding: '1rem 2rem',
//               background: '#274760',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               fontWeight: 'bold',
//               fontSize: '1.1rem',
//               cursor: 'pointer',
//               boxShadow: '0 2px 8px rgba(39, 71, 96, 0.15)'
//             }}
//           >
//             Search for doctors
//           </button>
//         </div>
//         <div className={styles.section}>
//           <ServicesSection />
//         </div>
//         <div className={styles.section}>
//           <DoctorsSection />
//         </div>
//         <div className={styles.section}>
//           <TipsAndFaqSection />
//         </div>
//         <div className={styles.section}>
//           <Footer />
//         </div>
//       </main>
//     </div>
//   )
// }

import Header from "./components/Header";
// import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import DoctorsSection from "./components/DoctorsSection";
import TipsAndFaqSection from "./components/TipsAndFaqSection";
import Footer from "./components/Footer";
import styles from "./style/HomePage.module.css";
import { Link } from "react-router-dom";
// Auto-generated imports from src/pages
import AccountSettingsPage from '../../pages/AccountSettingsPage.js';
import ArticalPage from '../../pages/ArticalPage.js';
import BaseLoginPage from '../../pages/BaseLoginPage.js';
import DoctorDetailsPage from '../../pages/DoctorDetailsPage.js';
import DoctorPage from '../../pages/DoctorPage.js';
import DoctorRegisterPage from '../../pages/DoctorRegisterPage.js';
import DoctorsListPage from '../../pages/DoctorsListPage.js';
import LoginPage from '../../pages/LoginPage.js';
import MentalHealthArticle from '../../pages/MentalHealthArticle.js';
import PatientDetailsPage from '../../pages/PatientDetailsPage.js';
import RegisterPage from '../../pages/RegisterPage.js';
import RegisterSelectPage from '../../pages/RegisterSelectPage.js';
// Auto-generated imports from src/components/home
// import AuthForm from '../../components/home/AuthForm.jsx';
// import HeroSection from '../../components/home/HeroSection.jsx';
// import Navbar from '../../components/home/Navbar.jsx';

const pageComponents = [
  { name: "AccountSettingsPage", path: "/accountsettingspage", Component: AccountSettingsPage },
  { name: "ArticalPage", path: "/articalpage", Component: ArticalPage },
  { name: "BaseLoginPage", path: "/baseloginpage", Component: BaseLoginPage },
  { name: "DoctorDetailsPage", path: "/doctordetailspage", Component: DoctorDetailsPage },
  { name: "DoctorPage", path: "/doctorpage", Component: DoctorPage },
  { name: "DoctorRegisterPage", path: "/doctorregisterpage", Component: DoctorRegisterPage },
  { name: "DoctorsListPage", path: "/doctorslistpage", Component: DoctorsListPage },
  { name: "LoginPage", path: "/loginpage", Component: LoginPage },
  { name: "MentalHealthArticle", path: "/mentalhealtharticle", Component: MentalHealthArticle },
  { name: "PatientDetailsPage", path: "/patientdetailspage", Component: PatientDetailsPage },
  { name: "RegisterPage", path: "/registerpage", Component: RegisterPage },
  { name: "RegisterSelectPage", path: "/registerselectpage", Component: RegisterSelectPage },
];

const homeComponents = [
  // { name: "AuthForm", path: "/authform", Component: AuthForm },
  // { name: "HeroSection", path: "/herosection", Component: HeroSection },
  // { name: "Navbar", path: "/navbar", Component: Navbar },
];

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.section}>
          <Header />
        </div>
        {/* <div className={styles.section}>
          <HeroSection />
        </div> */}
        <div className={styles.section} style={{ margin: "2rem 0" }}>
          <h2>Pages Navigation</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {pageComponents.map(({ name, path }) => (
              <Link key={name} to={path} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#6e8efb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {name}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.section} style={{ margin: "2rem 0" }}>
          <h2>Home Navigation</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {homeComponents.map(({ name, path }) => (
              <Link key={name} to={path} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#6e8efb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {name}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <ServicesSection />
        </div>
        <div className={styles.section}>
          <DoctorsSection />
        </div>
        <div className={styles.section}>
          <TipsAndFaqSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}