import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress,
    Chip,
    Paper,
    Divider
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    Person as UserIcon,
    LocalFlorist as PlantIcon
} from '@mui/icons-material';
import axios from '../../../utils/axios';

const scheduleStatuses = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
];

const EditScheduleDialog = ({ open, schedule, onClose, onScheduleUpdated }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (schedule && open) {
            setStatus(schedule.status || '');
        }
    }, [schedule, open]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.put(`/maintenance-schedules/${schedule.id}/status?status=${status}`);
            onScheduleUpdated();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update maintenance schedule');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'scheduled':
                return 'info';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    if (!schedule) return null;

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: 3
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ 
                    pb: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText'
                }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                        Update Schedule Status
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        Schedule #{schedule.id}
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ mt: 3 }}>
                        {error && (
                            <Alert 
                                severity="error" 
                                sx={{ 
                                    mb: 3,
                                    borderRadius: 1
                                }}
                            >
                                {error}
                            </Alert>
                        )}

                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 2, 
                                mb: 3,
                                bgcolor: 'grey.50',
                                borderRadius: 2
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarIcon color="primary" />
                                        <Typography variant="subtitle2">Schedule Date</Typography>
                                    </Box>
                                    <Typography sx={{ ml: 4 }}>
                                        {new Date(schedule.scheduleDate).toLocaleString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <UserIcon color="primary" />
                                        <Typography variant="subtitle2">User</Typography>
                                    </Box>
                                    <Typography sx={{ ml: 4 }}>
                                        #{schedule.userId}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PlantIcon color="primary" />
                                        <Typography variant="subtitle2">Plant</Typography>
                                    </Box>
                                    <Typography sx={{ ml: 4 }}>
                                        #{schedule.plantId}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                                Current Status
                            </Typography>
                            <Chip
                                label={schedule.status || 'N/A'}
                                color={getStatusColor(schedule.status)}
                                sx={{ 
                                    fontWeight: 500,
                                    minWidth: 100
                                }}
                            />
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                                Update Status
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel>New Status</InputLabel>
                                <Select
                                    value={status}
                                    label="New Status"
                                    onChange={handleStatusChange}
                                    required
                                    sx={{ 
                                        borderRadius: 1,
                                        '& .MuiSelect-select': {
                                            display: 'flex',
                                            alignItems: 'center'
                                        }
                                    }}
                                >
                                    {scheduleStatuses.map((status) => (
                                        <MenuItem 
                                            key={status.value} 
                                            value={status.value}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1
                                            }}
                                        >
                                            <Chip
                                                label={status.label}
                                                color={getStatusColor(status.value)}
                                                size="small"
                                                sx={{ minWidth: 80 }}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, bgcolor: 'grey.50' }}>
                    <Button 
                        onClick={onClose}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{ 
                            borderRadius: 2,
                            minWidth: 120
                        }}
                    >
                        {loading ? 'Updating...' : 'Update Status'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditScheduleDialog; 