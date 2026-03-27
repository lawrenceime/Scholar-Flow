import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    useTheme,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    text: string;
    icon?: React.ReactNode;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
    open,
    onClose,
    title = 'Success!',
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
                {icon ? icon : (
                    <CheckCircleRoundedIcon 
                        sx={{ 
                            fontSize: 72, 
                            color: theme.palette.success.main,
                        }} 
                    />
                )}
            </Box>
            <DialogContent sx={{ pb: 3, pt: 1 }}>
                <Typography variant="h5" fontWeight="700" color="text.primary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {text}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                    onClick={onClose} 
                    variant="contained"
                    color="success"
                    disableElevation
                    sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none', 
                        px: 4,
                        py: 1,
                        fontWeight: 600
                    }}
                >
                    Great!
                </Button>
            </DialogActions>
        </Dialog>
    );
};
