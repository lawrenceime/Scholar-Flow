'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Stepper,
    Step,
    StepLabel,
    MenuItem,
} from '@mui/material';

interface AddStudentModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: any) => void;
    availableClasses: string[];
}

const steps = ['Student Details', 'Parent Guardian Details', 'Fee Payment'];

export default function AddStudentModal({ open, onClose, onAdd, availableClasses }: AddStudentModalProps) {
    const [activeStep, setActiveStep] = useState(0);

    // Form State
    const [name, setName] = useState('');
    const [classGroup, setClassGroup] = useState('');
    const [parentName, setParentName] = useState('');
    const [parentWhatsapp, setParentWhatsapp] = useState('');
    const [totalFee, setTotalFee] = useState('');
    const [amountPaid, setAmountPaid] = useState('');

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // submit
            onAdd({
                name,
                classGroup,
                parentName,
                parentWhatsapp,
                totalFee: Number(totalFee),
                amountPaid: Number(amountPaid),
            });
            resetForm();
            onClose();
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const resetForm = () => {
        setActiveStep(0);
        setName('');
        setClassGroup('');
        setParentName('');
        setParentWhatsapp('');
        setTotalFee('');
        setAmountPaid('');
    };

    const handleInitialClose = () => {
        resetForm();
        onClose();
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3, px: 1 }}>
                        <TextField
                            label="Student Full Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            select
                            label="Assign Class"
                            variant="outlined"
                            fullWidth
                            value={classGroup}
                            onChange={(e) => setClassGroup(e.target.value)}
                        >
                            {availableClasses.map((cls) => (
                                <MenuItem key={cls} value={cls}>
                                    {cls}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3, px: 1 }}>
                        <TextField
                            label="Parent/Guardian Name"
                            variant="outlined"
                            fullWidth
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                        />
                        <TextField
                            label="WhatsApp Number"
                            variant="outlined"
                            fullWidth
                            value={parentWhatsapp}
                            onChange={(e) => setParentWhatsapp(e.target.value)}
                            helperText="Include country code, e.g., +1234567890"
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3, px: 1 }}>
                        <TextField
                            label="Total Session/Term Fee"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={totalFee}
                            onChange={(e) => setTotalFee(e.target.value)}
                        />
                        <TextField
                            label="Initial Amount Paid"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    // Validation to prevent progressing
    const isNextDisabled = () => {
        if (activeStep === 0) {
            return !name || !classGroup;
        }
        if (activeStep === 1) {
            return !parentName || !parentWhatsapp;
        }
        if (activeStep === 2) {
            return !totalFee || !amountPaid || Number(amountPaid) > Number(totalFee);
        }
        return false;
    };

    return (
        <Dialog open={open} onClose={handleInitialClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600 }}>Add New Student</DialogTitle>
            <DialogContent dividers>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {renderStepContent(activeStep)}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                {activeStep > 0 && (
                    <Button onClick={handleBack} color="inherit" sx={{ mr: 'auto' }}>
                        Back
                    </Button>
                )}
                {activeStep === 0 && (
                    <Button onClick={handleInitialClose} color="inherit" sx={{ mr: 'auto' }}>
                        Cancel
                    </Button>
                )}
                <Button 
                    onClick={handleNext} 
                    variant="contained" 
                    color="primary"
                    disabled={isNextDisabled()}
                >
                    {activeStep === steps.length - 1 ? 'Complete Enrollment' : 'Next Step'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
