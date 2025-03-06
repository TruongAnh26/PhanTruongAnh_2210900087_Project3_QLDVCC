import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import Unauthorized from './components/Unauthorized';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2e7d32',
        },
        secondary: {
            main: '#1976d2',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route
                            path="/admin/*"
                            element={
                                <PrivateRoute allowedRoles={['admin']}>
                                    <AdminDashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/customer/*"
                            element={
                                <PrivateRoute allowedRoles={['customer']}>
                                    <CustomerDashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    {({ user }) => {
                                        if (user?.role === 'admin') {
                                            return <Navigate to="/admin" replace />;
                                        }
                                        return <Navigate to="/customer" replace />;
                                    }}
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
