import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    TextField,
    InputAdornment,
    Alert,
    Snackbar,
    Chip,
    Button
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Add as AddIcon
} from '@mui/icons-material';
import axios from "../../../utils/axios";
import EditUserDialog from './EditUserDialog';
import AddUserDialog from './AddUserDialog';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
    const [editDialog, setEditDialog] = useState({ open: false, user: null });
    const [addDialog, setAddDialog] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/users/${userId}`);
                setSnackbar({
                    open: true,
                    message: 'User deleted successfully',
                    severity: 'success'
                });
                fetchUsers();
            } catch (err) {
                const errorMessage = err.response?.data?.error || 'Failed to delete user';
                setSnackbar({
                    open: true,
                    message: errorMessage,
                    severity: 'error'
                });
                console.error('Error deleting user:', err);
            }
        }
    };

    const handleEdit = (user) => {
        setEditDialog({ open: true, user });
    };

    const handleCloseEditDialog = () => {
        setEditDialog({ open: false, user: null });
    };

    const handleEditSuccess = () => {
        setSnackbar({
            open: true,
            message: 'User updated successfully',
            severity: 'success'
        });
        fetchUsers();
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return 'Invalid Date';
            }
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const handleAdd = () => {
        setAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialog(false);
    };

    const handleAddSuccess = () => {
        setSnackbar({
            open: true,
            message: 'User created successfully',
            severity: 'success'
        });
        fetchUsers();
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    User Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add User
                </Button>
            </Box>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 3 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={user.role} 
                                        color={user.role === 'admin' ? 'primary' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{formatDate(user.createdAt)}</TableCell>
                                <TableCell>{formatDate(user.updatedAt)}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <EditUserDialog
                open={editDialog.open}
                onClose={handleCloseEditDialog}
                user={editDialog.user}
                onSuccess={handleEditSuccess}
            />

            <AddUserDialog
                open={addDialog}
                onClose={handleCloseAddDialog}
                onSuccess={handleAddSuccess}
            />
        </Box>
    );
};

export default UserList; 