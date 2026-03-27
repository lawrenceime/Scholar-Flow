import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    useTheme,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

interface AddSubjectModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (name: string, category: string) => void;
}

const CATEGORIES = ['Science', 'Arts', 'Commercial', 'General', 'Languages', 'Vocational'];

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ open, onClose, onAdd }) => {
    const theme = useTheme();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && category) {
            onAdd(name.trim(), category);
            setName('');
            setCategory('');
            onClose();
        }
    };

    const handleClose = () => {
        setName('');
        setCategory('');
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    padding: 1,
                    minWidth: { xs: 300, sm: 400 },
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                }
            }}
        >
            <DialogTitle>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                    Add New Subject
                </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            autoFocus
                            id="name"
                            label="Subject Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Mathematics, Biology"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                }
                            }}
                        />
                        <FormControl fullWidth required>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value as string)}
                                sx={{ borderRadius: 2 }}
                            >
                                {CATEGORIES.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button 
                        onClick={handleClose} 
                        color="inherit" 
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained"
                        disableElevation
                        sx={{ 
                            borderRadius: 2, 
                            textTransform: 'none', 
                            px: 3,
                            bgcolor: theme.palette.primary.main,
                            '&:hover': {
                                bgcolor: theme.palette.primary.dark,
                            }
                        }}
                    >
                        Add Subject
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
