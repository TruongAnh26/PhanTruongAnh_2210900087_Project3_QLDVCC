import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Alert,
    Button,
    Chip,
} from '@mui/material';
import {
    ShoppingCart as OrderIcon,
    LocalFlorist as PlantIcon,
    Schedule as ScheduleIcon,
    Notifications as NotificationIcon,
    CalendarToday as CalendarIcon,
    ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dashboard, setDashboard] = useState({
        recentOrders: [],
        upcomingSchedules: [],
        myPlants: [],
        notifications: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError('');

            const [orders, schedules] = await Promise.all([
                axios.get(`/orders/user/${user.id}`),
                axios.get(`/maintenance-schedules/user/${user.id}`)
            ]);

            // Get recent orders
            const recentOrders = orders.data
                .sort((a, b) => b.id - a.id)
                .slice(0, 3);

            // Get upcoming schedules
            const upcomingSchedules = schedules.data
                .filter(schedule => schedule.status !== 'completed')
                .slice(0, 3);

            // Get unique plants from orders
            const myPlants = new Set();
            orders.data.forEach(order => {
                order.orderDetails?.forEach(detail => {
                    myPlants.add(detail.plantId);
                });
            });

            setDashboard({
                recentOrders,
                upcomingSchedules,
                myPlants: Array.from(myPlants),
                notifications: generateNotifications(upcomingSchedules)
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const generateNotifications = (schedules) => {
        const notifications = [];
        schedules.forEach(schedule => {
            if (schedule.status === 'pending') {
                notifications.push({
                    id: schedule.id,
                    type: 'schedule',
                    message: `You have a pending maintenance schedule for Plant #${schedule.plantId}`,
                    severity: 'info'
                });
            }
        });
        return notifications;
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

    const WelcomeCard = () => (
        <Paper 
            sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome back, {user?.name || 'Customer'}!
            </Typography>
            <Typography variant="body1">
                Manage your orders, schedules, and plant care all in one place.
            </Typography>
        </Paper>
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <WelcomeCard />

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Notifications */}
            {dashboard.notifications.length > 0 && (
                <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <NotificationIcon color="primary" />
                        <Typography variant="h6">Notifications</Typography>
                    </Box>
                    <List>
                        {dashboard.notifications.map((notification) => (
                            <ListItem key={notification.id}>
                                <ListItemIcon>
                                    <NotificationIcon color={notification.severity} />
                                </ListItemIcon>
                                <ListItemText primary={notification.message} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}

            <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 2 
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <OrderIcon color="primary" />
                                <Typography variant="h6">Recent Orders</Typography>
                            </Box>
                            <Button 
                                endIcon={<ArrowIcon />}
                                onClick={() => navigate('/customer/orders')}
                            >
                                View All
                            </Button>
                        </Box>
                        {dashboard.recentOrders.length > 0 ? (
                            <List>
                                {dashboard.recentOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <OrderIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {`Order #${order.id}`}
                                                        <Chip 
                                                            label={order.status}
                                                            color={getStatusColor(order.status)}
                                                            size="small"
                                                        />
                                                    </Box>
                                                }
                                                secondary={`$${order.totalPrice?.toFixed(2)}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                No orders yet
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Upcoming Schedules */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 2 
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <ScheduleIcon color="warning" />
                                <Typography variant="h6">Upcoming Maintenance</Typography>
                            </Box>
                            <Button 
                                endIcon={<ArrowIcon />}
                                onClick={() => navigate('/customer/schedule')}
                            >
                                View All
                            </Button>
                        </Box>
                        {dashboard.upcomingSchedules.length > 0 ? (
                            <List>
                                {dashboard.upcomingSchedules.map((schedule) => (
                                    <React.Fragment key={schedule.id}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScheduleIcon color="warning" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {`Schedule #${schedule.id}`}
                                                        <Chip 
                                                            label={schedule.status}
                                                            color={getStatusColor(schedule.status)}
                                                            size="small"
                                                        />
                                                    </Box>
                                                }
                                                secondary={`Plant #${schedule.plantId}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                No upcoming maintenance schedules
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                {/* My Plants Summary */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 2 
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <PlantIcon color="success" />
                                <Typography variant="h6">My Plants</Typography>
                            </Box>
                            <Button 
                                endIcon={<ArrowIcon />}
                                onClick={() => navigate('/customer/my-plants')}
                            >
                                View All
                            </Button>
                        </Box>
                        <Typography variant="h4" sx={{ textAlign: 'center', color: 'success.main' }}>
                            {dashboard.myPlants.length}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            Plants in Your Collection
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard; 