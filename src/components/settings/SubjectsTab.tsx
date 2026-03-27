import React, { useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Fab,
    Chip,
    Divider,
    useTheme,
    IconButton,
} from '@mui/material';
import dynamic from 'next/dynamic';
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import ScienceIcon from '@mui/icons-material/Science';
import CalculateIcon from '@mui/icons-material/Calculate';
import PublicIcon from '@mui/icons-material/Public';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Subject } from '@/types/school';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { SuccessModal } from '../shared/SuccessModal';



const AddSubjectModal = dynamic(() => import('./AddSubjectModal').then((mod) => mod.AddSubjectModal));

const INITIAL_SUBJECTS: Subject[] = [
    { id: '1', name: 'Mathematics', category: 'General' },
    { id: '2', name: 'English Language', category: 'General' },
    { id: '3', name: 'Physics', category: 'Science' },
    { id: '4', name: 'Chemistry', category: 'Science' },
    { id: '5', name: 'Biology', category: 'Science' },
    { id: '6', name: 'Accounting', category: 'Commercial' },
    { id: '7', name: 'Commerce', category: 'Commercial' },
    { id: '8', name: 'Government', category: 'Arts' },
    { id: '9', name: 'Literature in English', category: 'Arts' },
    { id: '10', name: 'French', category: 'Languages' },
];

export const SubjectsTab = () => {
    const theme = useTheme();
    const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal states for deletion
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const handleAddSubject = (name: string, category: string) => {
        const newSubject: Subject = {
            id: Date.now().toString(),
            name,
            category,
        };
        setSubjects([...subjects, newSubject]);
    };

    const handleDeleteClick = (id: string) => {
        setSubjectToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDeleteSubject = () => {
        if (subjectToDelete) {
            setSubjects(subjects.filter((subject) => subject.id !== subjectToDelete));
            setDeleteModalOpen(false);
            setSubjectToDelete(null);
            setSuccessModalOpen(true);
        }
    };

    // Group subjects by category
    const groupedSubjects = useMemo(() => {
        return subjects.reduce((acc, subject) => {
            if (!acc[subject.category]) {
                acc[subject.category] = [];
            }
            acc[subject.category].push(subject);
            return acc;
        }, {} as Record<string, Subject[]>);
    }, [subjects]);

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'science': return <ScienceIcon color="info" />;
            case 'general': return <CalculateIcon color="primary" />;
            case 'commercial': return <BusinessCenterIcon color="warning" />;
            case 'arts': return <PublicIcon color="success" />;
            default: return <MenuBookIcon color="action" />;
        }
    };

    const getCategoryChipColor = (category: string): any => {
        switch (category.toLowerCase()) {
            case 'science': return 'info';
            case 'general': return 'primary';
            case 'commercial': return 'warning';
            case 'arts': return 'success';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '60vh', p: 1 }}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden'
                }}
            >
                {Object.keys(groupedSubjects).sort().map((category, index, array) => (
                    <Box key={category}>
                        <Box sx={{ bgcolor: 'background.default', px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="subtitle1" fontWeight="600" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.8rem' }}>
                                {category} Subjects ({groupedSubjects[category].length})
                            </Typography>
                        </Box>
                        <List disablePadding>
                            {groupedSubjects[category].map((subject, idx) => (
                                <React.Fragment key={subject.id}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleDeleteClick(subject.id)}
                                                sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        sx={{
                                            px: 3,
                                            py: 2,
                                            transition: 'background-color 0.2s',
                                            '&:hover': {
                                                bgcolor: 'action.hover'
                                            }
                                        }}
                                    >
                                        <ListItemIcon>
                                            {getCategoryIcon(category)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" fontWeight="500">
                                                    {subject.name}
                                                </Typography>
                                            }
                                        />
                                        <Chip
                                            label={category}
                                            size="small"
                                            color={getCategoryChipColor(category)}
                                            variant="outlined"
                                            sx={{ borderRadius: 1.5, fontWeight: 500, mr: 2 }}
                                        />
                                    </ListItem>
                                    {idx < groupedSubjects[category].length - 1 && <Divider component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                ))}
            </Paper>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add subject"
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

            <AddSubjectModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddSubject}
            />

            <ConfirmationModal
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSubjectToDelete(null);
                }}
                onConfirm={confirmDeleteSubject}
                text="Are you sure you want to delete this subject? This action cannot be undone."
            />

            <SuccessModal
                open={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                text="The subject has been successfully deleted."
            />
        </Box>
    );
};
