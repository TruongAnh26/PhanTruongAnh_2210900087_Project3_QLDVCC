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
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {
    Person as UserIcon,
    ShoppingCart as OrderIcon,
    CalendarToday as DateIcon,
    AttachMoney as MoneyIcon,
    Inventory as ProductIcon
} from '@mui/icons-material';
import axios from '../../../utils/axios';

const orderStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
];

const EditOrderDialog = ({ open, order, onClose, onOrderUpdated }) => {
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (order && open) {
            setStatus(order.status || '');
            fetchOrderDetails();
        }
    }, [order, open]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/orders/${order.id}`);
            setOrderDetails(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch order details');
            console.error('Error fetching order details:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.put(`/orders/${order.id}/status?status=${status}`);
            onOrderUpdated();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update order status');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
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

    if (!order) return null;

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
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
                        Update Order Status
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        Order #{order.id}
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
                                <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <OrderIcon color="primary" />
                                        <Typography variant="subtitle2">Order ID</Typography>
                                    </Box>
                                    <Typography sx={{ ml: 4 }}>
                                        #{order.id}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <UserIcon color="primary" />
                                        <Typography variant="subtitle2">Customer</Typography>
                                    </Box>
                                    <Typography sx={{ ml: 4 }}>
                                        #{order.userId}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <DateIcon color="primary" />
                                        <Typography variant="subtitle2">Order Date</Typography>
                                    </Box>
                                    <Typography sx={{ ml: 4 }}>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <MoneyIcon color="primary" />
                                        <Typography variant="subtitle2">Total Amount</Typography>
                                    </Box>
                                    <Typography sx={{ ml: 4 }}>
                                        ${order.totalPrice?.toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                                Current Status
                            </Typography>
                            <Chip
                                label={order.status || 'N/A'}
                                color={getStatusColor(order.status)}
                                sx={{ 
                                    fontWeight: 500,
                                    minWidth: 100
                                }}
                            />
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ mb: 3 }}>
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
                                    {orderStatuses.map((status) => (
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

                        {orderDetails && (
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <ProductIcon color="primary" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        Order Items
                                    </Typography>
                                </Box>
                                <TableContainer 
                                    component={Paper}
                                    variant="outlined"
                                    sx={{ 
                                        borderRadius: 2,
                                        mb: 2
                                    }}
                                >
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: 'grey.50' }}>
                                                <TableCell>Plant ID</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderDetails?.orderDetails?.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.plantId}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell align="right">
                                                        ${item.price?.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell colSpan={3} align="right" sx={{ fontWeight: 600 }}>
                                                    Total Amount:
                                                </TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 600 }}>
                                                    ${order.totalPrice?.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}
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

export default EditOrderDialog; 