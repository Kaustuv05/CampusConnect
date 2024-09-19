import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import InstructorDashboard from './InstructorDashboard';
import StudentDashboard from './StudentDashboard';
import Login from './Login';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="header">
          <div className="container header-content">
            <Link to="/" className="logo">
              College Management System
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </div>
        </nav>

        <div className="container main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="card">
                  <h1 className="card-title">Welcome to the College Management System</h1>
                  {!user && <p className="card-subtitle">Please log in to access your dashboard.</p>}
                </div>
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;