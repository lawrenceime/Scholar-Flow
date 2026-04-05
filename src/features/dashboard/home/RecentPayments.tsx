'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Divider,
  Box,
  Chip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const recentPayments = [
  { id: 1, studentName: 'Emma Thompson', amount: '$500.00', time: '10 mins ago', grade: 'Grade 10A' },
  { id: 2, studentName: 'Michael Chen', amount: '$250.00', time: '45 mins ago', grade: 'Grade 8B' },
  { id: 3, studentName: 'Sophia Rodriguez', amount: '$1,200.00', time: '2 hours ago', grade: 'Grade 12C' },
  { id: 4, studentName: 'James Wilson', amount: '$150.00', time: '3 hours ago', grade: 'Grade 9A' },
  { id: 5, studentName: 'Olivia Davis', amount: '$800.00', time: '5 hours ago', grade: 'Grade 11B' },
];

export default function RecentPayments() {
  return (
    <Card sx={{ height: '100%', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.04)', borderRadius: 2 }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>
            Recent Payments Feed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time updates of incoming fees
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {recentPayments.map((payment, index) => (
            <React.Fragment key={payment.id}>
              <ListItem alignItems="flex-start" sx={{ px: 3, py: 2 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {payment.studentName}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={700} color="secondary.main">
                        {payment.amount}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {payment.grade}
                      </Typography>
                      <Typography component="span" variant="caption" color="text.secondary">
                        {payment.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < recentPayments.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
