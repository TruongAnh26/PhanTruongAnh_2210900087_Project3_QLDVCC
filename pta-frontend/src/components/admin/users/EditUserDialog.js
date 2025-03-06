import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Alert
} from '@mui/material';
import axios from "../../../utils/axios";

const roles = [
    { value: 'customer', label: 'Customer' },
    { value: 'admin', label: 'Admin' }
];

const EditUserDialog = ({ open, onClose, user, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'customer',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'customer',
                password: user.password || ''
            });
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
        setLoading(true);

        try {
            console.log('Sending update request to:', `/api/users/${user.id}`);
            console.log('Request data:', formData);
            const response = await axios.put(`/users/${user.id}`, {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                password: formData.password
            });
            console.log('Update response:', response.data);
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Update error details:', {
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                headers: err.response?.headers,
                config: {
                    url: err.config?.url,
                    method: err.config?.method,
                    data: err.config?.data
                }
            });
            const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to update user';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            required
                            fullWidth
                        />
                        <TextField
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            select
                            required
                            fullWidth
                        >
                            {roles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditUserDialog; 