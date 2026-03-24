'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress,
  linearProgressClasses,
  styled
} from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#3f51b5', // indigo
  },
}));

const academicProgressData = [
  { class: 'Grade 10A', completion: 100, teacher: 'Mr. Smith' },
  { class: 'Grade 10B', completion: 85, teacher: 'Mrs. Johnson' },
  { class: 'Grade 11A', completion: 60, teacher: 'Dr. Lee' },
  { class: 'Grade 11B', completion: 92, teacher: 'Ms. Davis' },
  { class: 'Grade 12A', completion: 30, teacher: 'Mr. Wilson', isLow: true },
  { class: 'Grade 12B', completion: 75, teacher: 'Mrs. Brown' },
];

export default function AcademicProgress() {
  return (
    <Card sx={{ height: '100%', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.04)', borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Academic Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Grade Entry Completion % by Class
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {academicProgressData.map((item, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {item.class}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.teacher}
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle2" 
                  fontWeight={700}
                  color={item.isLow ? 'error.main' : 'text.primary'}
                >
                  {item.completion}%
                </Typography>
              </Box>
              <BorderLinearProgress 
                variant="determinate" 
                value={item.completion} 
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: item.isLow ? 'error.main' : item.completion === 100 ? 'secondary.main' : 'primary.main',
                  }
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
