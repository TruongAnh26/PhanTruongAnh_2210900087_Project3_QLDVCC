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
    Button,
    IconButton,
    Typography,
    TextField,
    InputAdornment,
    Pagination,
    Stack,
    Alert,
    Snackbar
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import axios from "../../../utils/axios";
import EditPlantDialog from './EditPlantDialog';
import AddPlantDialog from './AddPlantDialog';

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const rowsPerPage = 10;
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
    const [editDialog, setEditDialog] = useState({ open: false, plant: null });
    const [addDialog, setAddDialog] = useState(false);

    useEffect(() => {
        fetchPlants();
    }, []);

    const fetchPlants = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/plants');
            // Add full URL to image paths
            const plantsWithFullUrls = response.data.map(plant => ({
                ...plant,
                imageUrl: plant.imageUrl ? `http://localhost:8080${plant.imageUrl}` : null
            }));
            setPlants(plantsWithFullUrls);
        } catch (err) {
            setError('Failed to fetch plants');
            console.error('Error fetching plants:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (plant) => {
        setEditDialog({ open: true, plant });
    };

    const handleDelete = async (plantId) => {
        if (window.confirm('Are you sure you want to delete this plant?')) {
            try {
                await axios.delete(`/plants/${plantId}`);
                setSnackbar({
                    open: true,
                    message: 'Plant deleted successfully',
                    severity: 'success'
                });
                fetchPlants();
            } catch (err) {
                const errorMessage = err.response?.data?.error || 'Failed to delete plant';
                setSnackbar({
                    open: true,
                    message: errorMessage,
                    severity: 'error'
                });
                console.error('Error deleting plant:', err);
            }
        }
    };

    const handleAdd = () => {
        setAddDialog(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleCloseEditDialog = () => {
        setEditDialog({ open: false, plant: null });
    };

    const handleCloseAddDialog = () => {
        setAddDialog(false);
    };

    const handleEditSuccess = () => {
        setSnackbar({
            open: true,
            message: 'Plant updated successfully',
            severity: 'success'
        });
        fetchPlants();
    };

    const handleAddSuccess = () => {
        setSnackbar({
            open: true,
            message: 'Plant added successfully',
            severity: 'success'
        });
        fetchPlants();
    };

    const filteredPlants = plants.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Plant Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add New Plant
                </Button>
            </Box>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search plants by name or category..."
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
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Care Guide</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPlants.map((plant) => (
                            <TableRow key={plant.id}>
                                <TableCell>{plant.id}</TableCell>
                                <TableCell>{plant.name}</TableCell>
                                <TableCell>{plant.category}</TableCell>
                                <TableCell>${plant.price}</TableCell>
                                <TableCell>{plant.description}</TableCell>
                                <TableCell>{plant.careGuide}</TableCell>
                                <TableCell>
                                    {plant.imageUrl && (
                                        <img 
                                            src={plant.imageUrl} 
                                            alt={plant.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{new Date(plant.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(plant)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(plant.id)}
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

            <EditPlantDialog
                open={editDialog.open}
                onClose={handleCloseEditDialog}
                plant={editDialog.plant}
                onSuccess={handleEditSuccess}
            />

            <AddPlantDialog
                open={addDialog}
                onClose={handleCloseAddDialog}
                onSuccess={handleAddSuccess}
            />
        </Box>
    );
};

export default PlantList; 