import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Paper
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import axios from '../../../utils/axios';

const ImageUpload = ({ currentImageUrl, onImageUpload }) => {
    const [preview, setPreview] = useState(currentImageUrl);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setError('');
        setLoading(true);

        try {
            // Create FormData
            const formData = new FormData();
            formData.append('file', file);

            // Upload image
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update preview with the full URL from server
            setPreview(response.data.url);
            // Extract the relative path for database storage
            const relativeUrl = response.data.url.split('/uploads/')[1];
            onImageUpload('/uploads/' + relativeUrl);
        } catch (err) {
            setError('Failed to upload image');
            console.error('Error uploading image:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper 
                sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    border: '2px dashed #ccc',
                    cursor: 'pointer'
                }}
            >
                {preview ? (
                    <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            disabled={loading}
                        >
                            Change Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Box>
                ) : (
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        disabled={loading}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                )}
                {loading && (
                    <CircularProgress 
                        size={24} 
                        sx={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }} 
                    />
                )}
            </Paper>
            {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default ImageUpload; 