import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';
import {
    Menu as MenuIcon,
    Person as PersonIcon,
    ShoppingCart as OrderIcon,
    CalendarToday as ScheduleIcon,
    Build as MaintenanceIcon,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    LocalShipping as DeliveryIcon,
    SupportAgent as SupportIcon
} from '@mui/icons-material';
import CustomerProfile from './CustomerProfile';
import OrderList from './OrderList';
import MaintenanceSchedule from './MaintenanceSchedule';
import MaintenanceRequest from './MaintenanceRequest';

const drawerWidth = 240;

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/customer' },
        { text: 'Profile', icon: <PersonIcon />, path: '/customer/profile' },
        { text: 'Orders', icon: <OrderIcon />, path: '/customer/orders' },
        { text: 'Maintenance Schedule', icon: <ScheduleIcon />, path: '/customer/schedule' },
        { text: 'Request Maintenance', icon: <MaintenanceIcon />, path: '/customer/maintenance' },
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Customer Panel
                </Typography>
            </Toolbar>
            <Divider />
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <Box>
                    <Typography variant="subtitle1">{user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                </Box>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            setMobileOpen(false);
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <Divider />
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    const DashboardHome = () => (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Welcome, {user?.name}!
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <OrderIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">Orders</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                View and track your orders
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="small" 
                                onClick={() => navigate('/customer/orders')}
                            >
                                View Orders
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">Maintenance</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Check maintenance schedules
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="small" 
                                onClick={() => navigate('/customer/schedule')}
                            >
                                View Schedule
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <MaintenanceIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">Request Service</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Request maintenance service
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="small" 
                                onClick={() => navigate('/customer/maintenance')}
                            >
                                New Request
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <SupportIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">Support</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Get help and support
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="small" 
                                onClick={() => navigate('/customer/support')}
                            >
                                Contact Support
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Plant Service Customer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8
                }}
            >
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="profile" element={<CustomerProfile />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="schedule" element={<MaintenanceSchedule />} />
                    <Route path="maintenance" element={<MaintenanceRequest />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default CustomerDashboard; 