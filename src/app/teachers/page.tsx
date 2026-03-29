'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StaffTable from '@/components/teachers/StaffTable';
import InviteStaffModal from '@/components/teachers/InviteStaffModal';
import DutyAllocationModal from '@/components/teachers/DutyAllocationModal';
import { StaffMember, SubjectAssignment } from '@/components/teachers/types';

// Initial Mock Data
const initialStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@school.edu',
    whatsapp: '+1234567890',
    role: 'Admin',
    status: 'Active',
    subjectAssignments: [],
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@school.edu',
    whatsapp: '+0987654321',
    role: 'Teacher',
    status: 'Active',
    assignedClass: 'SS1 Gold',
    subjectAssignments: [
      { subject: 'Mathematics', classGroup: 'SS1 Gold' },
      { subject: 'Mathematics', classGroup: 'SS1 Silver' },
    ],
  },
];

export default function TeachersPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [allocationStaff, setAllocationStaff] = useState<StaffMember | null>(null);

  const handleInviteOpen = () => setIsInviteOpen(true);
  const handleInviteClose = () => setIsInviteOpen(false);

  const handleInvite = (data: { name: string; email: string; whatsapp: string }) => {
    const newStaff: StaffMember = {
      id: Math.random().toString(36).substring(7),
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      role: 'Teacher', // Default role for invites
      status: 'Invited',
      subjectAssignments: [],
    };
    setStaffList([...staffList, newStaff]);
  };

  const handleManageDuties = (staff: StaffMember) => {
    setAllocationStaff(staff);
  };

  const handleCloseAllocation = () => {
    setAllocationStaff(null);
  };

  const handleSaveDuties = (staffId: string, assignedClass: string, subjectAssignments: SubjectAssignment[]) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === staffId
          ? { ...staff, assignedClass, subjectAssignments }
          : staff
      )
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Staff Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your school staff, assignments, and invitations
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleInviteOpen}
        >
          Invite Staff
        </Button>
      </Box>

      <StaffTable staff={staffList} onManageDuties={handleManageDuties} />

      <InviteStaffModal
        open={isInviteOpen}
        onClose={handleInviteClose}
        onInvite={handleInvite}
      />

      <DutyAllocationModal
        open={Boolean(allocationStaff)}
        onClose={handleCloseAllocation}
        staff={allocationStaff}
        onSave={handleSaveDuties}
      />
    </Container>
  );
}