import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Redeem from './pages/Redeem';
import Admin from './pages/Admin';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/redeem"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Redeem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Navbar />
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

