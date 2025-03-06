import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    InputAdornment,
    Alert,
    Snackbar,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Search as SearchIcon,
    Visibility as ViewIcon,
    CalendarToday as CalendarIcon
} from '@mui/icons-material';
import axios from '../../utils/axios';
import { useAuth } from '../../contexts/AuthContext';

const MaintenanceSchedule = () => {
    const { user } = useAuth();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [viewDialog, setViewDialog] = useState(false);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/maintenance-schedules/user/${user.id}`);
            setSchedules(response.data);
        } catch (err) {
            setError('Failed to fetch maintenance schedules');
            console.error('Error fetching schedules:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleViewSchedule = (schedule) => {
        setSelectedSchedule(schedule);
        setViewDialog(true);
    };

    const handleCloseViewDialog = () => {
        setViewDialog(false);
        setSelectedSchedule(null);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return 'Invalid Date';
            }
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'warning';
            case 'scheduled':
                return 'info';
            case 'in_progress':
                return 'primary';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const filteredSchedules = schedules.filter(schedule => {
        const matchesSearch = 
            schedule.id.toString().includes(searchTerm) ||
            schedule.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
            statusFilter === 'all' || 
            schedule.status.toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Maintenance Schedule
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search schedules by ID or description..."
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Status Filter</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status Filter"
                            onChange={handleStatusFilterChange}
                        >
                            <MenuItem value="all">All Status</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="scheduled">Scheduled</MenuItem>
                            <MenuItem value="in_progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Schedule ID</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Scheduled Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSchedules.map((schedule) => (
                            <TableRow key={schedule.id}>
                                <TableCell>{schedule.id}</TableCell>
                                <TableCell>{schedule.description}</TableCell>
                                <TableCell>{formatDate(schedule.scheduledDate)}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={schedule.status} 
                                        color={getStatusColor(schedule.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleViewSchedule(schedule)}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={viewDialog}
                onClose={handleCloseViewDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Maintenance Schedule Details</DialogTitle>
                <DialogContent>
                    {selectedSchedule && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Schedule Information
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Schedule ID
                                        </Typography>
                                        <Typography variant="body1">
                                            {selectedSchedule.id}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Status
                                        </Typography>
                                        <Chip 
                                            label={selectedSchedule.status} 
                                            color={getStatusColor(selectedSchedule.status)}
                                            size="small"
                                            sx={{ mt: 0.5 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="text.secondary">
                                            Description
                                        </Typography>
                                        <Typography variant="body1">
                                            {selectedSchedule.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Scheduled Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate(selectedSchedule.scheduledDate)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Created At
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate(selectedSchedule.createdAt)}
                                        </Typography>
                                    </Grid>
                                    {selectedSchedule.notes && (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" color="text.secondary">
                                                Notes
                                            </Typography>
                                            <Typography variant="body1">
                                                {selectedSchedule.notes}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog}>Close</Button>
                </DialogActions>
            </Dialog>

            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MaintenanceSchedule; 