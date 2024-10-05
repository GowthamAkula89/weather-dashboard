import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTemperature } from '../../temparatureContext';
import './toggleBtn.css'; 

const TemperatureToggle: React.FC = () => {
  const { unit, setUnit } = useTemperature();

  const handleUnitChange = (event: React.MouseEvent<HTMLElement>, newUnit: 'C' | 'F') => {
    if (newUnit) {
      setUnit(newUnit);
    }
  };

  return (
    <ToggleButtonGroup
      value={unit}
      exclusive
      onChange={handleUnitChange}
      aria-label="temperature unit"
      sx={{ mb: 2 }}
    >
      <ToggleButton
        value="C"
        aria-label="Celsius"
        className={`toggle-button ${unit === 'C' ? 'active' : ''}`} 
      >
        °C
      </ToggleButton>
      <ToggleButton
        value="F"
        aria-label="Fahrenheit"
        className={`toggle-button ${unit === 'F' ? 'active' : ''}`} 
      >
        °F
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TemperatureToggle;
