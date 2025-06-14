import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorRegister from './components/DoctorsRegisterComponent/DoctorRegister';
import MentalHealthArticle from './pages/MentalHealthArticle';
import DoctorPage from './pages/DoctorPage';
import ArticalPage from "./pages/ArticalPage";
import DoctorsList from './pages/DoctorsListPage';
import AdminLoginPage from './pages/AdminLoginPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/artical" element={<ArticalPage />} />
        <Route path="/artical" element={<MentalHealthArticle />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/doctors-list" element={<DoctorsList />} />
        <Route path="/doctors-list/:id" element={<DoctorDetailsPage />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctorDetails" element={<DoctorPage />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />


        {/* <Route path="/" element={<DoctorPage />} /> */}

      </Routes>
    </Router>
  )
}

export default App;