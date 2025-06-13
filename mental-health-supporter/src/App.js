import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import ArticalPage from "./pages/ArticalPage";
import DoctorsList from './components/DoctorsList/DoctorsList'; 
import DoctorRegister from './components/DoctorsRegister/DoctorRegister';
import MentalHealthArticle from './pages/MentalHealthArticle';
import DoctorPage from './pages/DoctorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/artical" element={<ArticalPage />} /> */}
        <Route path="/artical" element={<MentalHealthArticle />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctorDetails" element={<DoctorPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
    
          
          {/* <Route path="/" element={<DoctorPage />} /> */}
     
      </Routes>
    </Router>
    )
}

export default App;