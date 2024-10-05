import React from 'react';
import {Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { useTemperature } from '../../temparatureContext';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import "./weatherCard.css"

  
interface Widget {
    id: number;
    name: string;
    state: string;
    country: string;
    temp: number;
    windSpeed:number;
    condition: string;
    icon: JSX.Element | null;
}

interface WeatherWidgetProps {
    widget: Widget;
    onRemove: (id: number) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ widget, onRemove }) => {
    const { unit } = useTemperature();
    const temperature = unit === 'C' ? widget.temp : (widget.temp * 9 / 5) + 32;

    return (
        
        <Card >
            <CardContent sx={{position:"relative"}}>
                <Box sx={{display:"flex", gap:2, alignItems:"center"}}>
                    <Typography variant="h2">{temperature.toFixed(2)}°{unit}</Typography>
                    {/* <Typography variant="h2">{widget.icon}</Typography> */}
                </Box>
                
                <Typography variant="h6">{widget.name}</Typography>
                <Typography variant="body1">
                    {widget.state}, {widget.country}
                </Typography>
                <Typography variant="body2">Condition: {widget.condition} </Typography>
                <Typography variant="body2"> Wind Speed: {widget.windSpeed} km/h </Typography>
                <IconButton onClick={() => onRemove(widget.id)} aria-label="remove widget" className='remove-btn'>
                    <DeleteRoundedIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default WeatherWidget;
