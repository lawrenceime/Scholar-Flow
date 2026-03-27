import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    useTheme,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    text: string;
    icon?: React.ReactNode;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    text,
    icon,
}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    padding: 2,
                    minWidth: { xs: 300, sm: 400 },
                    boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.15)',
                    textAlign: 'center'
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
                {icon ? icon : (
                    <WarningAmberRoundedIcon 
                        sx={{ 
                            fontSize: 64, 
                            color: theme.palette.warning.main,
                            bgcolor: `${theme.palette.warning.main}15`,
                            borderRadius: '50%',
                            p: 1.5
                        }} 
                    />
                )}
            </Box>
            <DialogTitle sx={{ pb: 1 }}>
                <Typography variant="h6" fontWeight="700" color="text.primary">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ pb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                    {text}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
                <Button 
                    onClick={onClose} 
                    variant="outlined"
                    color="inherit" 
                    sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none', 
                        px: 3,
                        borderColor: 'divider',
                        fontWeight: 600
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }} 
                    variant="contained"
                    color="error"
                    disableElevation
                    sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none', 
                        px: 3,
                        fontWeight: 600
                    }}
                >
                    Confirm Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
