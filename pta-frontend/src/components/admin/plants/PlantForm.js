import React from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    MenuItem,
    Paper
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const plantTypes = [
    'Indoor',
    'Outdoor',
    'Succulent',
    'Flowering',
    'Foliage',
    'Herb'
];

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    scientificName: Yup.string()
        .required('Scientific name is required'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be positive'),
    stock: Yup.number()
        .required('Stock is required')
        .integer('Stock must be an integer')
        .min(0, 'Stock cannot be negative'),
    type: Yup.string()
        .required('Type is required'),
    careInstructions: Yup.string()
        .required('Care instructions are required')
        .min(20, 'Care instructions must be at least 20 characters')
});

const PlantForm = ({ initialValues, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            name: '',
            scientificName: '',
            description: '',
            price: '',
            stock: '',
            type: '',
            careInstructions: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                {initialValues ? 'Edit Plant' : 'Add New Plant'}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="scientificName"
                            name="scientificName"
                            label="Scientific Name"
                            value={formik.values.scientificName}
                            onChange={formik.handleChange}
                            error={formik.touched.scientificName && Boolean(formik.errors.scientificName)}
                            helperText={formik.touched.scientificName && formik.errors.scientificName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            rows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="stock"
                            name="stock"
                            label="Stock"
                            type="number"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="type"
                            name="type"
                            select
                            label="Type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                        >
                            {plantTypes.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="careInstructions"
                            name="careInstructions"
                            label="Care Instructions"
                            multiline
                            rows={4}
                            value={formik.values.careInstructions}
                            onChange={formik.handleChange}
                            error={formik.touched.careInstructions && Boolean(formik.errors.careInstructions)}
                            helperText={formik.touched.careInstructions && formik.errors.careInstructions}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {initialValues ? 'Update' : 'Add'} Plant
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default PlantForm; 