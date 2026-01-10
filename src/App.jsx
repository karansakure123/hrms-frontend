import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Layouts
import EmployeeLayout from './layouts/EmployeeLayout';
import AdminLayout from './layouts/AdminLayout';

// Components
import Footer from './components/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/employee/*" element={<EmployeeLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>

        <Route path="/" element={<Login />} />
      </Routes>
      {!isAuthPage && <Footer />}
      <Toaster position="top-right" closeButton />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;