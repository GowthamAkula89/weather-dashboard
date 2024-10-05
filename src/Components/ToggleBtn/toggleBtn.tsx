import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useTemperature } from '../../temparatureContext';
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
      <ToggleButton value="C" aria-label="Celsius">
        °C
      </ToggleButton>
      <ToggleButton value="F" aria-label="Fahrenheit">
        °F
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TemperatureToggle;
