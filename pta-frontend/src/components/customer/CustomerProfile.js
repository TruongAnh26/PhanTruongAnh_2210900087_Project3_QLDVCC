import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar,
    Avatar,
    Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axios';

const CustomerProfile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // If password is being changed
            if (formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    setError('New passwords do not match');
                    return;
                }
                if (!formData.currentPassword) {
                    setError('Current password is required to change password');
                    return;
                }
            }

            const updateData = {
                name: formData.name,
                email: formData.email,
                ...(formData.newPassword && {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            };

            await axios.put(`/users/${user.id}`, updateData);
            setSuccess('Profile updated successfully');
            
            // Clear password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to update profile';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                My Profile
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: 'primary.main',
                            fontSize: '2.5rem'
                        }}
                    >
                        {user?.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box sx={{ ml: 3 }}>
                        <Typography variant="h5">{user?.name}</Typography>
                        <Typography color="text.secondary">{user?.email}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Change Password
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Current Password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                type="password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="New Password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                type="password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Confirm New Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                type="password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar 
                open={!!success} 
                autoHideDuration={6000} 
                onClose={() => setSuccess('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CustomerProfile; 