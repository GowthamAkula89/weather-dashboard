import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import WeatherWidget from '../WeatherCard/weatherCard';
import TemperatureToggle from '../ToggleBtn/toggleBtn';

interface Widget {
    id: number;
    name: string;
    state: string;
    country: string;
    temp: number;
    windSpeed:number;
}

interface DashboardProps {
    widgets: Widget[];
    removeWidget: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ widgets, removeWidget }) => {
    return (
        <Box sx={{ p: 2 }}>
        <TemperatureToggle />
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {widgets.map((widget) => (
            <Grid size={{ xs: 12, md: 4, lg:3 }} key={widget.id}>
                <WeatherWidget widget={widget} onRemove={removeWidget} />
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};

export default Dashboard;
