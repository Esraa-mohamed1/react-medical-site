import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import DoctorRegister from './components/DoctorsRegisterComponent/DoctorRegister';
import DoctorRegister from './components/DoctorsRegister/DoctorRegister';
import MentalHealthArticle from './pages/MentalHealthArticle';
import DoctorPage from './pages/DoctorPage';
import ArticalPage from "./pages/ArticalPage";
import DoctorsList from './pages/DoctorsListPage';
import BaseLoginPage from './pages/BaseLoginPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import RegisterSelectPage from './pages/RegisterSelectPage';
import AccountSettingsPage from './pages/AccountSettingsPage';

import ErrorBoundary from './ErrorBoundary';
import useRefreshToken from './hooks/useRefreshToken';


function App() {
  useRefreshToken();

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-select" element={<RegisterSelectPage />} />
          <Route path="/artical" element={<ArticalPage />} />
          <Route path="/artical" element={<MentalHealthArticle />} />
          <Route path="/doctors/login" element={<BaseLoginPage userType={'Doctor'} />} />
          <Route path="/patients/login" element={<BaseLoginPage userType={'Patient'} />} />
          <Route path="/admin/login" element={<BaseLoginPage userType={'Admin'} />} />
          <Route path="/doctors-list" element={<DoctorsList />} />
          <Route path="/doctors-list/:id" element={<DoctorDetailsPage />} />
          <Route path="/patients-list" element={<div style={{ textAlign: 'center', padding: '2rem' }}>Please select a patient profile to view.</div>} />
          <Route path="/patients-list/:id" element={<PatientDetailsPage />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/doctors/:doctor_id" element={<DoctorPage />} />
          <Route path="/settings" element={<AccountSettingsPage />} />

          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;