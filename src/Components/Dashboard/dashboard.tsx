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
    windSpeed: number;
    condition: string;
    icon: JSX.Element | null;
}

interface DashboardProps {
    widgets: Widget[];
    removeWidget: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ widgets, removeWidget }) => {
    return (
        <Box sx={{ p: 2 }}>
            <div className="toggle-btn" style={{ display: "flex", justifyContent: "end" }}>
                <TemperatureToggle />
            </div>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {widgets.map((widget) => (
                <Grid size={{ xs: 12, sm:6, md: 4, lg:3 }} key={widget.id}>
                    <WeatherWidget widget={widget} onRemove={removeWidget} />
                </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
