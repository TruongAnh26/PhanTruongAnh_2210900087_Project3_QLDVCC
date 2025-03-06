import React, { useState } from 'react';
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

const AddUserDialog = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            console.log('Sending create request with data:', formData);
            const response = await axios.post('/users', formData);
            console.log('Create response:', response.data);
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'customer'
            });
        } catch (err) {
            console.error('Create error details:', {
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
            const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to create user';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New User</DialogTitle>
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
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
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
                        {loading ? 'Creating...' : 'Create User'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddUserDialog; 