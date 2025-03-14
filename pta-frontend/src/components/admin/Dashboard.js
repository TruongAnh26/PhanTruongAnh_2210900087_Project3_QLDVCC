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
} from '@mui/material';
import {
    ShoppingCart as OrderIcon,
    LocalFlorist as PlantIcon,
    Person as UserIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import axios from '../../utils/axios';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalPlants: 0,
        totalUsers: 0,
        totalSchedules: 0,
        recentOrders: [],
        topPlants: [],
        monthlyRevenue: 0
    });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError('');

            // Fetch all data using existing endpoints
            const [orders, plants, users, schedules] = await Promise.all([
                axios.get('/orders'),
                axios.get('/plants'),
                axios.get('/users'),
                axios.get('/maintenance-schedules')
            ]);

            // Calculate statistics from the fetched data
            console.log('All orders:', orders.data); // Debug log

            // Calculate total revenue from all orders since createdAt is null
            const totalRevenue = orders.data.reduce((total, order) => {
                return total + (order.totalPrice || 0);
            }, 0);

            console.log('Total revenue:', totalRevenue); // Debug log

            // Sort orders by ID to get recent ones (since createdAt is null)
            const recentOrders = [...orders.data]
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);

            // Calculate plant sales from orders
            const plantSales = {};
            orders.data.forEach(order => {
                order.orderDetails?.forEach(detail => {
                    if (!plantSales[detail.plantId]) {
                        plantSales[detail.plantId] = 0;
                    }
                    plantSales[detail.plantId] += detail.quantity || 0;
                });
            });

            // Get top selling plants
            const topPlants = plants.data
                .map(plant => ({
                    ...plant,
                    soldCount: plantSales[plant.id] || 0
                }))
                .sort((a, b) => b.soldCount - a.soldCount)
                .slice(0, 5);

            setStats({
                totalOrders: orders.data.length,
                totalPlants: plants.data.length,
                totalUsers: users.data.length,
                totalSchedules: schedules.data.length,
                recentOrders,
                topPlants,
                monthlyRevenue: totalRevenue
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setError('Failed to fetch dashboard statistics. Please try again later.');
            setStats({
                totalOrders: 0,
                totalPlants: 0,
                totalUsers: 0,
                totalSchedules: 0,
                recentOrders: [],
                topPlants: [],
                monthlyRevenue: 0
            });
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon, title, value, color }) => (
        <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {React.createElement(icon, { 
                        sx: { 
                            fontSize: 40, 
                            color: `${color}.main`,
                            bgcolor: `${color}.lighter`,
                            p: 1,
                            borderRadius: 2
                        } 
                    })}
                </Box>
                <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 600 }}>
                    {value}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Dashboard
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={OrderIcon}
                        title="Total Orders"
                        value={stats.totalOrders}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={PlantIcon}
                        title="Total Plants"
                        value={stats.totalPlants}
                        color="success"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={UserIcon}
                        title="Total Users"
                        value={stats.totalUsers}
                        color="info"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={ScheduleIcon}
                        title="Active Schedules"
                        value={stats.totalSchedules}
                        color="warning"
                    />
                </Grid>
            </Grid>

            {/* Monthly Revenue */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <MoneyIcon color="success" />
                    <Typography variant="h6">Monthly Revenue</Typography>
                </Box>
                <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 600 }}>
                    ${stats.monthlyRevenue.toFixed(2)}
                </Typography>
            </Paper>

            {/* Recent Orders and Top Plants */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <OrderIcon color="primary" />
                            <Typography variant="h6">Recent Orders</Typography>
                        </Box>
                        {stats.recentOrders.length > 0 ? (
                            <List>
                                {stats.recentOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <OrderIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Order #${order.id}`}
                                                secondary={`$${order.totalPrice?.toFixed(2)} - ${new Date(order.createdAt).toLocaleDateString()}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                No recent orders
                            </Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <TrendingUpIcon color="success" />
                            <Typography variant="h6">Top Selling Plants</Typography>
                        </Box>
                        {stats.topPlants.length > 0 ? (
                            <List>
                                {stats.topPlants.map((plant) => (
                                    <React.Fragment key={plant.id}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PlantIcon color="success" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={plant.name}
                                                secondary={`${plant.soldCount} units sold`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                No plants data available
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard; 