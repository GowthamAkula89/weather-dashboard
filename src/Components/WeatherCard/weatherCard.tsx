import React from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { useTemperature } from '../../temparatureContext';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {WiDaySunny, WiNightClear, WiCloud, WiSnow, WiThunderstorm, WiDayCloudy, WiNightCloudy, WiDayRain, WiNightRain, WiDaySnow, WiNightSnow} from 'react-icons/wi';
import "./weatherCard.css";
  
const getWeatherIcon = (condition: string, temp: number, isDay: boolean): JSX.Element => {

    if (condition.includes('Thunderstorm')) {
        return <WiThunderstorm />;
    } else if (condition.includes('Rain')) {
        return isDay ? <WiDayRain /> : <WiNightRain />;
    } else if (condition.includes('Snow')) {
        return isDay ? <WiDaySnow /> : <WiNightSnow />;
    } else if (condition.includes('Cloudy') || condition.includes('Clouds')) {
        return isDay ? <WiDayCloudy /> : <WiNightCloudy />;
    } else if (condition.includes('Clear') || condition.includes('Sunny')) {
        return isDay ? <WiDaySunny /> : <WiNightClear />;
    } else if (temp < 0) {
        return <WiSnow />;
    } else if (temp > 30) {
        return <WiDaySunny />;
    }

    return <WiCloud />;
};


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

interface WeatherWidgetProps {
    widget: Widget;
    onRemove: (id: number) => void;
}



const WeatherWidget: React.FC<WeatherWidgetProps> = ({ widget, onRemove }) => {
    const { unit } = useTemperature();
    const temperature = unit === 'C' ? widget.temp : (widget.temp * 9 / 5) + 32;
    
    const currentHour = new Date().getHours();
    const isDay = currentHour >= 6 && currentHour < 18;

    return (
        <Card className='widget-card'>
            <CardContent sx={{ position: 'relative' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography variant="h4">{temperature.toFixed(2)}°{unit}</Typography>
                    <Box className="icon-container">
                        {getWeatherIcon(widget.condition, widget.temp, isDay)}
                    </Box>
                </Box>

                <Typography variant="h5">{widget.name}</Typography>
                <Typography variant="h6">
                    {widget.state}, {widget.country}
                </Typography>
                <Typography variant="body2">Condition: {widget.condition}</Typography>
                <Typography variant="body2">Wind: {widget.windSpeed} km/h</Typography>
                <IconButton onClick={() => onRemove(widget.id)} aria-label="remove widget" className='remove-btn'>
                    <DeleteRoundedIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default WeatherWidget;