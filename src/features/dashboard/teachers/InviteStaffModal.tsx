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
} from '@mui/material';

interface InviteStaffModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (data: { name: string; email: string; whatsapp: string }) => void;
}

export default function InviteStaffModal({ open, onClose, onInvite }: InviteStaffModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleInvite = () => {
    onInvite({ name, email, whatsapp });
    setName('');
    setEmail('');
    setWhatsapp('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Invite Staff</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="WhatsApp Number"
            variant="outlined"
            fullWidth
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            helperText="Include country code, e.g., +1234567890"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleInvite} variant="contained" color="primary">
          Send Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
}
