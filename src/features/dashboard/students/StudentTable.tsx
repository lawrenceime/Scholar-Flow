'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    Card,
    Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Student } from './types';

interface StudentTableProps {
    students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'Fully Paid':
                return 'success';
            case 'Partial':
                return 'warning';
            case 'Debtor':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <TableContainer sx={{ maxHeight: '60vh' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Student Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Parent Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Payment Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">No students found.</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            students.map((student) => (
                                <TableRow key={student.id} hover>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.classGroup}</TableCell>
                                    <TableCell>{student.parentName}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={student.paymentStatus}
                                            color={getPaymentStatusColor(student.paymentStatus) as any}
                                            size="small"
                                            sx={{ fontWeight: 500 }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<VisibilityIcon />}
                                            onClick={() => alert(`View Profile for ${student.name}`)}
                                        >
                                            View Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}
