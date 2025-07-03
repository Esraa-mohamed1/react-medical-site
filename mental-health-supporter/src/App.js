import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorRegister from './components/DoctorsRegister/DoctorRegister';
import MentalHealthArticle from './pages/MentalHealthArticle';
import DoctorPage from './pages/DoctorPage';
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
import PaymentPage from './pages/PaymentPage';
import ChatPage from './pages/ChatPage';
import DoctorChatsPage from './pages/DoctorChatsPage';
import DoctorChatRoomPage from './pages/DoctorChatRoomPage';
import AIChatInterface from './components/AIChatInterface';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CalendarPage from './features/doctors/pages/CalendarPage';
import DoctorPaidPatients from './features/doctors/pages/DoctorPaidPatients';
import DocumentsPage from './features/doctors/pages/DocumentsPage.jsx';

import ErrorBoundary from './ErrorBoundary';

import ArticlePage from './pages/ArticlePage';
import SelectDisorderPage from './pages/SelectDisorderPage';
import DisorderSelection from './pages/DisorderSelection';
import PatientAppointmentsPage from './pages/PatientAppointmentsPage';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-select" element={<RegisterSelectPage />} />
        {/* artical  */}

          <Route path="/select-disorder" element={<DisorderSelection />} />
          <Route path="/article/:disorderType" element={<ArticlePage />} />
          <Route path="/articals" element={<SelectDisorderPage />} />

          <Route path="/ai-chat" element={<AIChatInterface />} />
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
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/:appointment_id" element={<PaymentPage />} />
          
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
          <Route path="/doctor-chats" element={<DoctorChatsPage />} />
          <Route path="/doctor-chat/:roomId" element={<DoctorChatRoomPage />} />
          <Route path="/doctor/calendar" element={
            <PrivateRoute role="doctor">
              <CalendarPage />
            </PrivateRoute>
          } />
          <Route path="/doctor/paid-patients" element={
            <PrivateRoute role="doctor">
              <DoctorPaidPatients />
            </PrivateRoute>
          } />
          <Route path="/doctor/documents" element={
            <PrivateRoute role="doctor">
              <DocumentsPage />
            </PrivateRoute>
          } />

          <Route path="/my-appointments" element={<PatientAppointmentsPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;