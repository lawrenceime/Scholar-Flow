'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { StaffMember, SubjectAssignment } from './types';

interface DutyAllocationModalProps {
  open: boolean;
  onClose: () => void;
  staff: StaffMember | null;
  onSave: (staffId: string, assignedClass: string, subjectAssignments: SubjectAssignment[]) => void;
}

const AVAILABLE_CLASSES = ['JSS1', 'JSS2', 'JSS3', 'SS1 Gold', 'SS1 Silver', 'SS2', 'SS3'];
const AVAILABLE_SUBJECTS = ['Mathematics', 'English', 'Physics', 'Biology', 'Chemistry', 'Economics'];

export default function DutyAllocationModal({ open, onClose, staff, onSave }: DutyAllocationModalProps) {
  const [assignedClass, setAssignedClass] = useState<string>('');
  const [assignments, setAssignments] = useState<SubjectAssignment[]>([]);

  useEffect(() => {
    if (staff) {
      setAssignedClass(staff.assignedClass || '');
      setAssignments(staff.subjectAssignments || []);
    }
  }, [staff, open]);

  if (!staff) return null;

  const handleAddAssignment = () => {
    setAssignments([...assignments, { subject: '', classGroup: '' }]);
  };

  const handleRemoveAssignment = (index: number) => {
    const updated = [...assignments];
    updated.splice(index, 1);
    setAssignments(updated);
  };

  const handleAssignmentChange = (index: number, field: keyof SubjectAssignment, value: string) => {
    const updated = [...assignments];
    updated[index] = { ...updated[index], [field]: value };
    setAssignments(updated);
  };

  const handleSave = () => {
    onSave(staff.id, assignedClass, assignments.filter(a => a.subject && a.classGroup));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Duty Allocation: {staff.name}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Class Teacher Assignment
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Assigned Class</InputLabel>
            <Select
              value={assignedClass}
              label="Assigned Class"
              onChange={(e) => setAssignedClass(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {AVAILABLE_CLASSES.map(cls => (
                <MenuItem key={cls} value={cls}>{cls}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Subject Allocations
          </Typography>
          {assignments.map((assignment, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              <FormControl fullWidth size="small">
                <InputLabel>Subject</InputLabel>
                <Select
                  value={assignment.subject}
                  label="Subject"
                  onChange={(e) => handleAssignmentChange(index, 'subject', e.target.value)}
                >
                  {AVAILABLE_SUBJECTS.map(sub => (
                    <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select
                  value={assignment.classGroup}
                  label="Class"
                  onChange={(e) => handleAssignmentChange(index, 'classGroup', e.target.value)}
                >
                  {AVAILABLE_CLASSES.map(cls => (
                    <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton color="error" onClick={() => handleRemoveAssignment(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddAssignment}
            size="small"
            color="primary"
          >
            Add Subject Assignment
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save Duties</Button>
      </DialogActions>
    </Dialog>
  );
}
