import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
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
import GoogleAuthRedirect from './pages/GoogleAuthRedirect';
import HomePage from './features/homePage/homePage';
import PrivateRoute from './components/PrivateRoute';

import ErrorBoundary from './ErrorBoundary';

// Google OAuth Client ID - you'll need to replace this with your actual client ID
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id-here';

function App() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-select" element={<RegisterSelectPage />} />
            <Route path="/artical" element={<ArticalPage />} />
            <Route path="/google-auth-redirect" element={<GoogleAuthRedirect />} />
            <Route path="/social/complete/google-oauth2/" element={<GoogleAuthRedirect />} />
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
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;