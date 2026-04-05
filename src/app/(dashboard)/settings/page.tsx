'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Container,
    useTheme,
    alpha
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ClassesTab } from 'src/components/settings/ClassesTab';
import { SubjectsTab } from 'src/components/settings/SubjectsTab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `settings-tab-${index}`,
        'aria-controls': `settings-tabpanel-${index}`,
    };
}

const SettingsPage = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                    School Configuration
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage classes, subjects, and general school settings.
                </Typography>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="school configuration tabs"
                        sx={{
                            px: 2,
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                minHeight: 64,
                                py: 2
                            }
                        }}
                    >
                        <Tab
                            icon={<SchoolIcon sx={{ mx: 1 }} />}
                            iconPosition="start"
                            label="Manage Classes"
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={<MenuBookIcon sx={{ mx: 1 }} />}
                            iconPosition="start"
                            label="Manage Subjects"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>

                <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: alpha(theme.palette.background.default, 0.6) }}>
                    <CustomTabPanel value={tabValue} index={0}>
                        <ClassesTab />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <SubjectsTab />
                    </CustomTabPanel>
                </Box>
            </Paper>
        </Container>
    );
};

export default SettingsPage;