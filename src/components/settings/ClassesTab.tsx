import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Fab,
    Avatar,
    useTheme,
    IconButton,
} from '@mui/material';
import dynamic from 'next/dynamic';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '@mui/icons-material/Delete';
import { Class } from '@/types/school';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { SuccessModal } from '../shared/SuccessModal';

const AddClassModal = dynamic(() => import('./AddClassModal').then((mod) => mod.AddClassModal));

const INITIAL_CLASSES: Class[] = [
    { id: '1', name: 'Primary 1', category: 'Basic (Primary)', studentCount: 30 },
    { id: '2', name: 'Primary 2', category: 'Basic (Primary)', studentCount: 28 },
    { id: '3', name: 'Primary 5', category: 'Basic (Primary)', studentCount: 35 },
    { id: '4', name: 'JSS 1', category: 'Secondary', studentCount: 45 },
    { id: '5', name: 'JSS 2', category: 'Secondary', studentCount: 42 },
    { id: '6', name: 'SS 1', category: 'Secondary', studentCount: 38 },
];

export const ClassesTab = () => {
    const theme = useTheme();
    const [classes, setClasses] = useState<Class[]>(INITIAL_CLASSES);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal states for deletion
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [classToDelete, setClassToDelete] = useState<string | null>(null);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    // Provide default fallback in case theme colors are slightly different
    const primaryMain = theme.palette?.primary?.main || '#4F46E5';

    const handleAddClass = (name: string, category: string) => {
        const newClass: Class = {
            id: Date.now().toString(),
            name,
            category,
            studentCount: 0,
        };
        setClasses([...classes, newClass]);
    };

    const handleDeleteClick = (id: string) => {
        setClassToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDeleteClass = () => {
        if (classToDelete) {
            setClasses(classes.filter((cls) => cls.id !== classToDelete));
            setDeleteModalOpen(false);
            setClassToDelete(null);
            setSuccessModalOpen(true);
        }
    };

    // Group classes by category
    const groupedClasses = React.useMemo(() => {
        return classes.reduce((acc, cls) => {
            if (!acc[cls.category]) {
                acc[cls.category] = [];
            }
            acc[cls.category].push(cls);
            return acc;
        }, {} as Record<string, Class[]>);
    }, [classes]);

    return (
        <Box sx={{ position: 'relative', minHeight: '60vh', p: 1 }}>
            {Object.keys(groupedClasses).map((category) => (
                <Box key={category} sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" fontWeight="600" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem', mb: 2, ml: 1 }}>
                        {category} Classes ({groupedClasses[category].length})
                    </Typography>
                    <Grid container spacing={3}>
                        {groupedClasses[category].map((cls) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cls.id}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        borderRadius: 4,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                                            borderColor: 'transparent'
                                        },
                                        cursor: 'pointer',
                                        background: 'linear-gradient(145deg, #ffffff, #fdfdfd)'
                                    }}
                                >
                                    <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: `${primaryMain}15`,
                                                    color: primaryMain,
                                                    width: 48,
                                                    height: 48,
                                                    mr: 2,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {cls.name.charAt(0)}
                                            </Avatar>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" fontWeight="700" color="text.primary">
                                                    {cls.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Class Information
                                                </Typography>
                                            </Box>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(cls.id);
                                                }}
                                                sx={{
                                                    opacity: 0.6,
                                                    '&:hover': { opacity: 1, bgcolor: 'error.lighter' }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <GroupIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                            <Typography variant="body2" fontWeight="500" color="text.secondary">
                                                {cls.studentCount} Students
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add class"
                onClick={() => setIsModalOpen(true)}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    boxShadow: '0 8px 16px rgba(79, 70, 229, 0.3)',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s',
                    }
                }}
            >
                <AddIcon />
            </Fab>

            <AddClassModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddClass}
            />

            <ConfirmationModal
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setClassToDelete(null);
                }}
                onConfirm={confirmDeleteClass}
                text="Are you sure you want to delete this class? This action cannot be undone."
            />

            <SuccessModal
                open={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                text="The class has been successfully deleted."
            />
        </Box>
    );
};
