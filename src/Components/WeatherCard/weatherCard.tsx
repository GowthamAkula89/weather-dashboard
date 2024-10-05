import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTemperature } from '../../temparatureContext';

interface Widget {
  id: number;
  name: string;
  state: string;
  country: string;
  temp: number;
  windSpeed:number;
}

interface WeatherWidgetProps {
  widget: Widget;
  onRemove: (id: number) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ widget, onRemove }) => {
    const { unit } = useTemperature();
    const temperature = unit === 'C' ? widget.temp : (widget.temp * 9 / 5) + 32;

    return (
        <Card>
        <CardContent>
            <Typography variant="h5">{widget.name}</Typography>
            <Typography variant="body1">
                {widget.state}, {widget.country}
            </Typography>
            <Typography variant="h6">
                {temperature.toFixed(2)}°{unit}
            </Typography>
            <IconButton onClick={() => onRemove(widget.id)} aria-label="remove widget">
                <RemoveIcon />
            </IconButton>
        </CardContent>
        </Card>
    );
};

export default WeatherWidget;
