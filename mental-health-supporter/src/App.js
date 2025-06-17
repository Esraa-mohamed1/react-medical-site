import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorRegister from './components/DoctorsRegisterComponent/DoctorRegister';
import MentalHealthArticle from './pages/MentalHealthArticle';
import DoctorPage from './pages/DoctorPage';
import ArticalPage from "./pages/ArticalPage";
import DoctorsList from './pages/DoctorsListPage';
import BaseLoginPage from './pages/BaseLoginPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';
import PatientDetailsPage from './pages/PatientDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/artical" element={<ArticalPage />} />
        <Route path="/artical" element={<MentalHealthArticle />} />
        <Route path="/doctors/login" element={<BaseLoginPage userType={'Doctor'} />} />
        <Route path="/patients/login" element={<BaseLoginPage userType={'Patient'} />} />
        <Route path="/admin/login" element={<BaseLoginPage userType={'Admin'} />} />
        <Route path="/doctors-list" element={<DoctorsList />} />
        <Route path="/doctors-list/:id" element={<DoctorDetailsPage />} />
        <Route path="/patients-list/:id" element={<PatientDetailsPage />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctors/:doctor_id" element={<DoctorPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App;