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

import Navbar from "../../components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import DoctorsSection from "./components/DoctorsSection";
// import TipsAndFaqSection from "./components/TipsAndFaqSection";
import Footer from "./components/Footer";
import AIChatInterface from "../../components/AIChatInterface";
import styles from "./style/HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.section}>
          <HeroSection />
        </div>
        {/* <div className={styles.section} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
          <button
  onClick={() => window.location.href = '/artical'}
  style={{
    padding: '1rem 2rem',
    background: 'linear-gradient(to right, #37ECBA, #72AFD3)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(110, 142, 251, 0.15)'
  }}
>
  Mental Health Articles
</button>

          <button
            onClick={() => window.location.href = '/doctors-list'}
            style={{
              padding: '1rem 2rem',
    background: 'linear-gradient(to right, #37ECBA, #72AFD3)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(39, 71, 96, 0.15)'
            }}
          >
            Search for doctors
          </button>
        </div> */}
        <div className={styles.section}>
          <DoctorsSection />
        </div>
        <div className={styles.section}>
          <ServicesSection />
        </div>
        {/* <div className={styles.section}>
          <TipsAndFaqSection />
        </div> */}
        <div className="">

        </div>
        <Footer />
      </main>
      
      {/* AI Chat Interface */}
      <AIChatInterface />
    </div>
  );
}