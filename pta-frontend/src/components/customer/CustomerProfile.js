import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Avatar,
    Divider,
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const CustomerProfile = () => {
    const { user } = useAuth();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
                My Profile
            </Typography>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: 'primary.main',
                            fontSize: '2.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        {user?.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box sx={{ ml: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>{user?.name}</Typography>
                        <Typography color="text.secondary">{user?.email}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PersonIcon color="primary" />
                            <Box>
                                <Typography variant="body2" color="text.secondary">Full Name</Typography>
                                <Typography variant="body1">{user?.name}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <EmailIcon color="primary" />
                            <Box>
                                <Typography variant="body2" color="text.secondary">Email Address</Typography>
                                <Typography variant="body1">{user?.email}</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <AccessTimeIcon color="primary" />
                            <Box>
                                <Typography variant="body2" color="text.secondary">Member Since</Typography>
                                <Typography variant="body1">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CustomerProfile; 