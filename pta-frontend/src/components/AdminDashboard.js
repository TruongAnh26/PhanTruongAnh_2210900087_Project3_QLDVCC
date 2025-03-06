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
    Toolbar
} from '@mui/material';
import {
    People as PeopleIcon,
    LocalFlorist as PlantIcon,
    ShoppingCart as OrderIcon,
    CalendarToday as ScheduleIcon,
    Menu as MenuIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import PlantList from './admin/plants/PlantList';
import UserList from './admin/users/UserList';

const drawerWidth = 240;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Plants', icon: <PlantIcon />, path: '/admin/plants' },
        { text: 'Orders', icon: <OrderIcon />, path: '/admin/orders' },
        { text: 'Maintenance Schedules', icon: <ScheduleIcon />, path: '/admin/schedules' },
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Admin Panel
                </Typography>
            </Toolbar>
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
                        Plant Service Admin
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
                        keepMounted: true, // Better open performance on mobile.
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
                    <Route path="users" element={<UserList />} />
                    <Route path="plants/*" element={<PlantList />} />
                    {/* Add other routes here */}
                </Routes>
            </Box>
        </Box>
    );
};

export default AdminDashboard; 