import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import PlantForm from './PlantForm';

const PlantDialog = ({ open, onClose, onSubmit, initialValues }) => {
    const handleSubmit = (values) => {
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {initialValues ? 'Edit Plant' : 'Add New Plant'}
            </DialogTitle>
            <DialogContent>
                <PlantForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlantDialog; 