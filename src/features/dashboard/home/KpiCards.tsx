'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import BadgeIcon from '@mui/icons-material/Badge';

const kpiData = [
  {
    title: 'Total Students',
    value: '2,845',
    icon: <SchoolIcon />,
    color: 'primary.main',
    bgColor: 'primary.light',
    trend: '+5% this month',
    trendColor: 'success.main',
  },
  {
    title: 'Total Fees Collected',
    value: '$124,500',
    icon: <AccountBalanceWalletIcon />,
    color: 'secondary.main', // Emerald Green
    bgColor: 'secondary.light',
    trend: '+12% this month',
    trendColor: 'success.main',
  },
  {
    title: 'Total Outstanding Debt',
    value: '$15,800',
    icon: <MoneyOffIcon />,
    color: 'error.main',
    bgColor: 'error.light',
    trend: '-2% this month',
    trendColor: 'success.main',
  },
  {
    title: 'Staff Present Today',
    value: '142 / 150',
    icon: <BadgeIcon />,
    color: 'info.main',
    bgColor: 'info.light',
    trend: '94% attendance',
    trendColor: 'text.secondary',
  },
];

export default function KpiCards() {
  return (
    <Grid container spacing={3}>
      {kpiData.map((kpi, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.04)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" fontWeight={600} gutterBottom>
                    {kpi.title}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="text.primary">
                    {kpi.value}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: (theme) => `${kpi.color}15`, // Adding some transparency to the color
                    color: kpi.color,
                    width: 48,
                    height: 48
                  }}
                >
                  {kpi.icon}
                </Avatar>
              </Box>
              <Typography variant="body2" color={kpi.trendColor} fontWeight={500}>
                {kpi.trend}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
