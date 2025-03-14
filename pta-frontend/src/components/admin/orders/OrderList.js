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
import ViewOrderDialog from './ViewOrderDialog';
import EditOrderDialog from './EditOrderDialog';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [viewDialog, setViewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/orders');
            setOrders(response.data);
        } catch (err) {
            setError('Failed to fetch orders');
            console.error('Error fetching orders:', err);
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

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setViewDialog(true);
    };

    const handleEditClick = (order) => {
        setSelectedOrder(order);
        setEditDialog(true);
    };

    const handleDialogClose = () => {
        setViewDialog(false);
        setEditDialog(false);
        setSelectedOrder(null);
    };

    const handleOrderUpdated = () => {
        fetchOrders();
        setEditDialog(false);
        setSelectedOrder(null);
        setSnackbar({
            open: true,
            message: 'Order updated successfully',
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'warning';
            case 'confirmed':
                return 'info';
            case 'shipped':
                return 'primary';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            String(order.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(order.userId || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
            statusFilter === 'all' || 
            (order.status?.toLowerCase() || '') === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Order Management
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search orders by order number or customer name..."
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
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="confirmed">Confirmed</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
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
                            <TableCell>Order ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.userId}</TableCell>
                                <TableCell>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>${order.totalPrice?.toFixed(2) || '0.00'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status || 'N/A'}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleViewClick(order)}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleEditClick(order)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {viewDialog && selectedOrder && (
                <ViewOrderDialog
                    open={viewDialog}
                    order={selectedOrder}
                    onClose={handleDialogClose}
                />
            )}

            {editDialog && selectedOrder && (
                <EditOrderDialog
                    open={editDialog}
                    order={selectedOrder}
                    onClose={handleDialogClose}
                    onOrderUpdated={handleOrderUpdated}
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

export default OrderList; 