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
  Box,
  Typography,
} from '@mui/material';
import { StaffMember } from './types';

interface StaffTableProps {
  staff: StaffMember[];
  onManageDuties: (staff: StaffMember) => void;
}

export default function StaffTable({ staff, onManageDuties }: StaffTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: 'grey.50' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Staff Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Assigned Duties</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  No staff members found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            staff.map((member) => (
              <TableRow key={member.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {member.name}
                  </Typography>
                  {member.whatsapp && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      {member.whatsapp}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Chip
                    label={member.role}
                    size="small"
                    color={member.role === 'Admin' ? 'secondary' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={member.status}
                    size="small"
                    color={
                      member.status === 'Active' ? 'success' :
                      member.status === 'Invited' ? 'warning' : 'error'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {member.assignedClass && (
                      <Chip
                        label={`Class Teacher: ${member.assignedClass}`}
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                    {member.subjectAssignments?.map((assignment, idx) => (
                      <Chip
                        key={idx}
                        label={`${assignment.subject} (${assignment.classGroup})`}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                    {!member.assignedClass && (!member.subjectAssignments || member.subjectAssignments.length === 0) && (
                      <Typography variant="caption" color="text.secondary">
                        No duties assigned
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onManageDuties(member)}
                  >
                    Manage Duties
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
