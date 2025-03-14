import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    useTheme,
    useMediaQuery,
    Avatar,
    Badge,
    Button,
} from '@mui/material';
import {
    Menu as MenuIcon,
    People as PeopleIcon,
    LocalFlorist as PlantIcon,
    ShoppingCart as OrderIcon,
    Schedule as ScheduleIcon,
    Dashboard as DashboardIcon,
    Logout as LogoutIcon,
    Notifications as NotificationIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Plants', icon: <PlantIcon />, path: '/admin/plants' },
        { text: 'Orders', icon: <OrderIcon />, path: '/admin/orders' },
        { text: 'Maintenance Schedules', icon: <ScheduleIcon />, path: '/admin/schedules' },
    ];

    const drawer = (
        <Box>
            <Box
                sx={{
                    background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
                    p: 3,
                    color: 'white',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PlantIcon sx={{ fontSize: 32 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Plant Service
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Admin Panel
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
                    {user?.name?.charAt(0) || 'A'}
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user?.name || 'Admin'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.email || 'admin@example.com'}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <List sx={{ px: 2, py: 1 }}>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            if (isMobile) setMobileOpen(false);
                        }}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            '&:hover': {
                                backgroundColor: 'primary.lighter',
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'primary.lighter',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
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
                <Divider sx={{ my: 2 }} />
                <ListItem
                    button 
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 2,
                        color: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.lighter',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Logout"
                        primaryTypographyProps={{
                            fontWeight: 500,
                        }}
                    />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
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
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <DashboardIcon sx={{ color: 'primary.main' }} />
                            Admin Dashboard
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton color="default">
                                <Badge badgeContent={3} color="error">
                                    <NotificationIcon />
                                </Badge>
                            </IconButton>
                            <Avatar 
                                sx={{ 
                                    bgcolor: 'primary.main',
                                    width: 35,
                                    height: 35
                                }}
                            >
                                {user?.name?.charAt(0) || 'A'}
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
                            bgcolor: 'background.paper',
                            boxShadow: 2
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
                            bgcolor: 'background.paper',
                            boxShadow: 2
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
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                    minHeight: '100vh',
                    bgcolor: 'grey.50',
                    p: 3
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default AdminLayout;