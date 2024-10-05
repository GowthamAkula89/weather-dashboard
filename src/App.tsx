import React, { useState, useEffect } from 'react';
import './App.css';
import { TemperatureProvider } from './temparatureContext';
import Dashboard from './Components/Dashboard/dashboard';
import Header from './Components/Header/header';

interface Widget {
  id: number;
  name: string;
  state: string;
  country: string;
  temp: number;
  windSpeed:number
}

function App() {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const savedWidgets = localStorage.getItem('weatherWidgets');
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });

  useEffect(() => {
    localStorage.setItem('weatherWidgets', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (data: Omit<Widget, 'id'>) => {
    const newWidget = { id: Date.now(), ...data };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const removeWidget = (id: number) => {
    setWidgets((prev) => prev.filter(widget => widget.id !== id));
  };

  return (
    <TemperatureProvider>
      <Header addWidget={addWidget} />
      <Dashboard widgets={widgets} removeWidget={removeWidget} />
    </TemperatureProvider>
  );
}

export default App;
