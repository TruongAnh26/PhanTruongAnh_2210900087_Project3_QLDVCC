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
    Grid
} from '@mui/material';
import {
    Search as SearchIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';
import axios from '../../utils/axios';
import { useAuth } from '../../contexts/AuthContext';

const OrderList = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [viewDialog, setViewDialog] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/orders/user/${user.id}`);
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

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setViewDialog(true);
    };

    const handleCloseViewDialog = () => {
        setViewDialog(false);
        setSelectedOrder(null);
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
                minute: '2-digit',
                second: '2-digit'
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
            case 'processing':
                return 'info';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                My Orders
            </Typography>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search orders by ID or status..."
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 3 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={order.status} 
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleViewOrder(order)}
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
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Order Information
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Order ID
                                        </Typography>
                                        <Typography variant="body1">
                                            {selectedOrder.id}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate(selectedOrder.createdAt)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Status
                                        </Typography>
                                        <Chip 
                                            label={selectedOrder.status} 
                                            color={getStatusColor(selectedOrder.status)}
                                            size="small"
                                            sx={{ mt: 0.5 }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Amount
                                        </Typography>
                                        <Typography variant="body1">
                                            ${selectedOrder.totalAmount.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Order Items
                                </Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Plant</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Subtotal</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedOrder.orderItems?.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.plant.name}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
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

export default OrderList; 