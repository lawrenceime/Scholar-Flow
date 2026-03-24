'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import KpiCards from '../components/dashboard/KpiCards';
import RecentPayments from '../components/dashboard/RecentPayments';
import AcademicProgress from '../components/dashboard/AcademicProgress';

export default function Home() {
  return (
    <Box sx={{ pb: 4, maxWidth: '1400px', mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, Admin. Here's what's happening today.
          </Typography>
        </Box>
      </Box>

      {/* KPI Section */}
      <Box sx={{ mb: 4 }}>
        <KpiCards />
      </Box>

      {/* Main Content Section */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <RecentPayments />
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <AcademicProgress />
        </Grid>
      </Grid>
    </Box>
  );
}
