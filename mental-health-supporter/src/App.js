import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AvailabilityPage from "./features/doctors/pages/AvailabilityPage";
import AppointmentDetails from "./features/doctors/pages/AppointmentDetails";
import AppointmentsList from './features/doctors/pages/AppointmentsList';
import DoctorProfile2 from './features/doctors/components/DoctorProfile2';
import ChatPage from './pages/ChatPage';

import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
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
          
          {/* Doctor Routes */}
          {/* <Route path="/doctor/dashboard" element={
            <PrivateRoute role="doctor">
              <DoctorDashboard />
            </PrivateRoute>
          } /> */}

          <Route path="/doctor/appointments" element={
            <PrivateRoute role="doctor">
              <AppointmentsList />
            </PrivateRoute>
          } />
          <Route path="/doctor/availability" element={
            <PrivateRoute role="doctor">
              <AvailabilityPage />
            </PrivateRoute>
          } />
          <Route path="/doctor/appointments/:id" element={
            <PrivateRoute role="doctor">
              <AppointmentDetails />
            </PrivateRoute>
          } />
          <Route path="/doctor/profile" element={
            <PrivateRoute role="doctor">
              <DoctorProfile2 />
            </PrivateRoute>
          } />
          <Route path="/chat/:doctorId" element={<ChatPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;