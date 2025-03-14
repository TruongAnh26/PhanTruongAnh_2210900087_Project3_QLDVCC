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
    Chip,
    CircularProgress,
    Paper,
    Divider
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    Person as UserIcon,
    LocalFlorist as PlantIcon,
    Description as DescriptionIcon,
    Notes as NotesIcon,
    CheckCircle as CompletedIcon
} from '@mui/icons-material';
import axios from '../../../utils/axios';

const ViewScheduleDialog = ({ open, schedule, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [scheduleDetails, setScheduleDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (schedule && open) {
            fetchScheduleDetails();
        }
    }, [schedule, open]);

    const fetchScheduleDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/maintenance-schedules/${schedule.id}`);
            setScheduleDetails(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch schedule details');
            console.error('Error fetching schedule details:', err);
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
            <DialogTitle sx={{ 
                pb: 1, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText'
            }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                    Maintenance Schedule Details
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Schedule #{schedule.id}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mt: 3 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <>
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
                                    Status
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

                            {scheduleDetails && (
                                <>
                                    <Divider sx={{ my: 3 }} />

                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <DescriptionIcon color="primary" />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                Description
                                            </Typography>
                                        </Box>
                                        <Paper 
                                            variant="outlined" 
                                            sx={{ 
                                                p: 2,
                                                borderRadius: 2,
                                                minHeight: 60,
                                                bgcolor: 'background.paper'
                                            }}
                                        >
                                            <Typography>
                                                {scheduleDetails.description || 'No description provided'}
                                            </Typography>
                                        </Paper>
                                    </Box>

                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <NotesIcon color="primary" />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                Notes
                                            </Typography>
                                        </Box>
                                        <Paper 
                                            variant="outlined" 
                                            sx={{ 
                                                p: 2,
                                                borderRadius: 2,
                                                minHeight: 60,
                                                bgcolor: 'background.paper'
                                            }}
                                        >
                                            <Typography>
                                                {scheduleDetails.notes || 'No notes available'}
                                            </Typography>
                                        </Paper>
                                    </Box>

                                    {scheduleDetails.completedAt && (
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CompletedIcon color="success" />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    Completed At
                                                </Typography>
                                            </Box>
                                            <Typography sx={{ ml: 4 }}>
                                                {new Date(scheduleDetails.completedAt).toLocaleString()}
                                            </Typography>
                                        </Box>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, bgcolor: 'grey.50' }}>
                <Button 
                    onClick={onClose}
                    variant="contained"
                    sx={{ 
                        borderRadius: 2,
                        minWidth: 100
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewScheduleDialog; 