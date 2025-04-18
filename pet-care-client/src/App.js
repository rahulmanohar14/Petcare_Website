import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import VetAppointmentDashboard from './pages/VetAppointmentDashboard';

import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import Navbar from './components/Navbar';

// 👇 This is where we use useLocation()
function AppRoutes() {
  const hiddenNavbarPaths = ['/', '/login', '/signup', '/forgot-password'];
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Show Navbar only when not on auth/home pages */}
      {!hiddenNavbarPaths.includes(currentPath) && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/vet" element={
          <ProtectedRoute allowedRoles={['vet']}>
            <VetDashboard />
          </ProtectedRoute>
        } />
        <Route path="/grooming" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <GroomingDashboard />
          </ProtectedRoute>
        } />
        <Route path="/adoption" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <PetAdoptionDashboard />
          </ProtectedRoute>
        } />
        <Route path="/vet-appointment" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <VetAppointmentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/groomer" element={
          <ProtectedRoute allowedRoles={['groomer']}>
            <GroomerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/adoption-manager" element={
          <ProtectedRoute allowedRoles={['adoption']}>
            <AdoptionManagerDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

// 👇 Outer component to wrap everything in <Router>
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}