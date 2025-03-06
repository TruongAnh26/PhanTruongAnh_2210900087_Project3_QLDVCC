import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
} from '@mui/material';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Access Denied
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        You don't have permission to access this page.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/dashboard')}
                        sx={{ mt: 2 }}
                    >
                        Go to Dashboard
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default Unauthorized; 