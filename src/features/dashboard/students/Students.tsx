'use client';

import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    TextField,
    MenuItem,
    InputAdornment,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import StudentTable from './StudentTable';
import AddStudentModal from './AddStudentModal';
import { Student, PaymentStatus } from './types';

// Mock Classes from Settings
const INITIAL_CLASSES = [
    'Primary 1',
    'Primary 2',
    'Primary 5',
    'JSS 1',
    'JSS 2',
    'SS 1',
];

const INITIAL_STUDENTS: Student[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        classGroup: 'JSS 1',
        parentName: 'Mr. Johnson',
        parentWhatsapp: '+1234567890',
        paymentStatus: 'Fully Paid',
        totalFee: 50000,
        amountPaid: 50000,
    },
    {
        id: '2',
        name: 'Bob Smith',
        classGroup: 'Primary 5',
        parentName: 'Mrs. Smith',
        parentWhatsapp: '+0987654321',
        paymentStatus: 'Partial',
        totalFee: 50000,
        amountPaid: 25000,
    },
    {
        id: '3',
        name: 'Charlie Davis',
        classGroup: 'SS 1',
        parentName: 'Mr. Davis',
        parentWhatsapp: '+1122334455',
        paymentStatus: 'Debtor',
        totalFee: 60000,
        amountPaid: 0,
    },
];

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [classFilter, setClassFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const handleAddOpen = () => setIsAddOpen(true);
    const handleAddClose = () => setIsAddOpen(false);

    const handleAddStudent = (data: any) => {
        let status: PaymentStatus = 'Debtor';
        if (data.amountPaid >= data.totalFee) {
            status = 'Fully Paid';
        } else if (data.amountPaid > 0) {
            status = 'Partial';
        }

        const newStudent: Student = {
            id: Math.random().toString(36).substring(7),
            name: data.name,
            classGroup: data.classGroup,
            parentName: data.parentName,
            parentWhatsapp: data.parentWhatsapp,
            totalFee: data.totalFee,
            amountPaid: data.amountPaid,
            paymentStatus: status,
        };
        setStudents([...students, newStudent]);
    };

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  student.parentName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesClass = classFilter === 'All' ? true : student.classGroup === classFilter;
            const matchesStatus = statusFilter === 'All' ? true : student.paymentStatus === statusFilter;

            return matchesSearch && matchesClass && matchesStatus;
        });
    }, [students, searchQuery, classFilter, statusFilter]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                        Student Directory
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage student enrollment, details, and payment statuses
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={handleAddOpen}
                    sx={{ px: 3, py: 1 }}
                >
                    Add Student
                </Button>
            </Box>

            {/* Filters */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'stretch' }}>
                <TextField
                    placeholder="Search by student or parent name..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: 300, bgcolor: 'background.paper' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                
                <TextField
                    select
                    label="Class"
                    size="small"
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    sx={{ minWidth: 150, bgcolor: 'background.paper' }}
                >
                    <MenuItem value="All">All Classes</MenuItem>
                    {INITIAL_CLASSES.map((cls) => (
                        <MenuItem key={cls} value={cls}>
                            {cls}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Payment Status"
                    size="small"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ minWidth: 180, bgcolor: 'background.paper' }}
                >
                    <MenuItem value="All">All Statuses</MenuItem>
                    <MenuItem value="Fully Paid">Fully Paid</MenuItem>
                    <MenuItem value="Partial">Partial</MenuItem>
                    <MenuItem value="Debtor">Debtor</MenuItem>
                </TextField>
            </Box>

            <StudentTable students={filteredStudents} />

            <AddStudentModal
                open={isAddOpen}
                onClose={handleAddClose}
                onAdd={handleAddStudent}
                availableClasses={INITIAL_CLASSES}
            />
        </Container>
    );
}
