import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    AppBar,
    Toolbar,
    Avatar,
    Divider
} from '@mui/material';
import {
    Person as PersonIcon,
    ShoppingCart as OrderIcon,
    CalendarToday as ScheduleIcon,
    Build as MaintenanceIcon,
    Menu as MenuIcon,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon
} from '@mui/icons-material';
import CustomerProfile from './customer/CustomerProfile';
import OrderList from './customer/OrderList';
import MaintenanceSchedule from './customer/MaintenanceSchedule';
import MaintenanceRequest from './customer/MaintenanceRequest';

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
                    <Route path="profile" element={<CustomerProfile />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="schedule" element={<MaintenanceSchedule />} />
                    <Route path="maintenance" element={<MaintenanceRequest />} />
                    <Route path="/" element={<CustomerProfile />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default CustomerDashboard; 