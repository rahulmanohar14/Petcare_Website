import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VetDashboard from './pages/VetDashboard';
import GroomingDashboard from './pages/GroomingDashboard';
import PetAdoptionDashboard from './pages/PetAdoptionDashboard';
import GroomerDashboard from './pages/GroomerDashboard';
import AdoptionManagerDashboard from './pages/AdoptionManagerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vet" element={<VetDashboard />} />
        <Route path="/grooming" element={<GroomingDashboard />} />
        <Route path="/adoption" element={<PetAdoptionDashboard />} />
        <Route path="/groomer" element={<GroomerDashboard />} />
        <Route path="/adoption-manager" element={<AdoptionManagerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;