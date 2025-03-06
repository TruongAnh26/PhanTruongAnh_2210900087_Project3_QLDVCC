import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    Description as DescriptionIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Clear as ClearIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from '../../utils/axios';
import { useAuth } from '../../contexts/AuthContext';

const MaintenanceRequest = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        description: '',
        scheduledDate: null,
        preferredTime: '',
        location: '',
        phone: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            scheduledDate: date
        }));
    };

    const handleClearDate = () => {
        setFormData(prev => ({
            ...prev,
            scheduledDate: null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Validate required fields
            if (!formData.description.trim()) {
                setError('Description is required');
                return;
            }
            if (!formData.scheduledDate) {
                setError('Scheduled date is required');
                return;
            }
            if (!formData.location.trim()) {
                setError('Location is required');
                return;
            }
            if (!formData.phone.trim()) {
                setError('Phone number is required');
                return;
            }

            // Create maintenance request
            const requestData = {
                ...formData,
                userId: user.id,
                status: 'pending'
            };

            await axios.post('/maintenance-schedules', requestData);
            setSuccess('Maintenance request submitted successfully');
            
            // Reset form
            setFormData({
                description: '',
                scheduledDate: null,
                preferredTime: '',
                location: '',
                phone: '',
                notes: ''
            });
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to submit maintenance request';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Request Maintenance
            </Typography>

            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Preferred Date"
                                    value={formData.scheduledDate}
                                    onChange={handleDateChange}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true,
                                            InputProps: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: formData.scheduledDate && (
                                                    <InputAdornment position="end">
                                                        <Tooltip title="Clear date">
                                                            <IconButton
                                                                size="small"
                                                                onClick={handleClearDate}
                                                            >
                                                                <ClearIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </InputAdornment>
                                                ),
                                            }
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Preferred Time"
                                name="preferredTime"
                                value={formData.preferredTime}
                                onChange={handleChange}
                                fullWidth
                                placeholder="e.g., Morning, Afternoon, Evening"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Additional Notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                size="large"
                            >
                                {loading ? 'Submitting...' : 'Submit Request'}
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

export default MaintenanceRequest; 