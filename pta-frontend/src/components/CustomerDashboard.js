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
    Divider,
    useTheme,
} from '@mui/material';
import {
    Person as PersonIcon,
    ShoppingCart as OrderIcon,
    CalendarToday as ScheduleIcon,
    Build as MaintenanceIcon,
    Menu as MenuIcon,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    LocalFlorist as PlantIcon,
    Notifications as NotificationIcon,
} from '@mui/icons-material';
import CustomerProfile from './customer/CustomerProfile';
import OrderList from './customer/OrderList';
import MaintenanceSchedule from './customer/MaintenanceSchedule';
import MaintenanceRequest from './customer/MaintenanceRequest';
import Dashboard from './customer/Dashboard';

const drawerWidth = 240;

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();

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
            <Box
                sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    p: 2,
                    color: 'white',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PlantIcon sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Plant Service
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Customer Panel
                </Typography>
            </Box>
            <Box 
                sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Avatar 
                    sx={{ 
                        bgcolor: 'primary.main',
                        width: 50,
                        height: 50,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.email}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <List sx={{ px: 1 }}>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            setMobileOpen(false);
                        }}
                        sx={{
                            borderRadius: 1,
                            mb: 0.5,
                            '&:hover': {
                                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.text}
                            primaryTypographyProps={{
                                fontSize: '0.95rem',
                                fontWeight: 500
                            }}
                        />
                    </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                <ListItem 
                    button 
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 1,
                        color: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.lighter',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'error.main' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Logout"
                        primaryTypographyProps={{
                            fontSize: '0.95rem',
                            fontWeight: 500
                        }}
                    />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ 
                            mr: 2, 
                            display: { sm: 'none' },
                            color: 'text.primary'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Typography 
                            variant="h6" 
                            component="div"
                            sx={{ 
                                color: 'text.primary',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <PlantIcon sx={{ color: 'primary.main' }} />
                            Plant Service
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton color="primary">
                                <NotificationIcon />
                            </IconButton>
                            <Avatar 
                                sx={{ 
                                    bgcolor: 'primary.main',
                                    width: 35,
                                    height: 35
                                }}
                            >
                                {user?.name?.charAt(0) || 'U'}
                            </Avatar>
                        </Box>
                    </Box>
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
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth,
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        },
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
                    mt: 8,
                    backgroundColor: theme.palette.background.default,
                    minHeight: '100vh'
                }}
            >
                <Routes>
                    <Route path="profile" element={<CustomerProfile />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="schedule" element={<MaintenanceSchedule />} />
                    <Route path="maintenance" element={<MaintenanceRequest />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default CustomerDashboard; 