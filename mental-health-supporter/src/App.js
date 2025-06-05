import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArticalPage from "./pages/ArticalPage";
import DoctorRegister from './pages/DoctorRegisterPage';
import DoctorsList from './pages/DoctorsListPage';
import ViewDoctor from './pages/Doctors/ViewDoctor';
import EditDoctor from './pages/Doctors/EditDoctor';
import ViewUser from './pages/Users/ViewUser';
import EditUser from './pages/Users/EditUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/artical" element={<ArticalPage />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctors-list" element={<DoctorsList />} />
        <Route path="/doctors/:id" element={<ViewDoctor />} />
        <Route path="/doctors/:id/edit" element={<EditDoctor />} />
        <Route path="/users/:id" element={<ViewUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;