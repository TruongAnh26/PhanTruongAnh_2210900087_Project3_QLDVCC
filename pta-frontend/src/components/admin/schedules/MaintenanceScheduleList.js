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
    IconButton,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip
} from '@mui/material';
import {
    Search as SearchIcon,
    Visibility as ViewIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import axios from '../../../utils/axios';
import ViewScheduleDialog from './ViewScheduleDialog';
import EditScheduleDialog from './EditScheduleDialog';

const MaintenanceScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [viewDialog, setViewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/maintenance-schedules');
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

    const handleViewClick = (schedule) => {
        setSelectedSchedule(schedule);
        setViewDialog(true);
    };

    const handleEditClick = (schedule) => {
        setSelectedSchedule(schedule);
        setEditDialog(true);
    };

    const handleDialogClose = () => {
        setViewDialog(false);
        setEditDialog(false);
        setSelectedSchedule(null);
    };

    const handleScheduleUpdated = () => {
        fetchSchedules();
        setEditDialog(false);
        setSelectedSchedule(null);
        setSnackbar({
            open: true,
            message: 'Maintenance schedule updated successfully',
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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

    const filteredSchedules = schedules.filter(schedule => {
        const matchesSearch = 
            String(schedule.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(schedule.userId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(schedule.plantId || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
            statusFilter === 'all' || 
            (schedule.status?.toLowerCase() || '') === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Maintenance Schedule Management
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by ID, User ID, or Plant ID..."
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
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="scheduled">Scheduled</MenuItem>
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
                            <TableCell>User ID</TableCell>
                            <TableCell>Plant ID</TableCell>
                            <TableCell>Schedule Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSchedules.map((schedule) => (
                            <TableRow key={schedule.id}>
                                <TableCell>{schedule.id}</TableCell>
                                <TableCell>{schedule.userId}</TableCell>
                                <TableCell>{schedule.plantId}</TableCell>
                                <TableCell>
                                    {new Date(schedule.scheduleDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={schedule.status || 'N/A'}
                                        color={getStatusColor(schedule.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleViewClick(schedule)}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleEditClick(schedule)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {viewDialog && selectedSchedule && (
                <ViewScheduleDialog
                    open={viewDialog}
                    schedule={selectedSchedule}
                    onClose={handleDialogClose}
                />
            )}

            {editDialog && selectedSchedule && (
                <EditScheduleDialog
                    open={editDialog}
                    schedule={selectedSchedule}
                    onClose={handleDialogClose}
                    onScheduleUpdated={handleScheduleUpdated}
                />
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MaintenanceScheduleList; 