import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Alert
} from '@mui/material';
import axios from "../../../utils/axios";
import ImageUpload from './ImageUpload';

const categories = [
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'desk', label: 'Desk' },
    { value: 'decorative', label: 'Decorative' }
];

const AddPlantDialog = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        careGuide: '',
        price: '',
        imageUrl: '',
        category: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (imageUrl) => {
        setFormData(prev => ({
            ...prev,
            imageUrl
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axios.post('/plants', formData);
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                name: '',
                description: '',
                careGuide: '',
                price: '',
                imageUrl: '',
                category: ''
            });
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to create plant';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Plant</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            select
                            required
                            fullWidth
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            type="number"
                            required
                            fullWidth
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <TextField
                            label="Care Guide"
                            name="careGuide"
                            value={formData.careGuide}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <ImageUpload
                            currentImageUrl={formData.imageUrl}
                            onImageUpload={handleImageUpload}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Plant'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddPlantDialog; 