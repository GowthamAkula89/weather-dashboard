import React, { useState, useEffect } from 'react';
import './App.css';
import { TemperatureProvider } from './temparatureContext';
import Dashboard from './Components/Dashboard/dashboard';
import Header from './Components/Header/header';
import data from "./Utils/weatherData.json"
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

function App() {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const savedWidgets = localStorage.getItem('weatherWidgets');
    if (savedWidgets && savedWidgets.trim().length !== 0) {
      return JSON.parse(savedWidgets);
    } else {
      return data || [];
    }
  });
  console.log("widgets", widgets)
  useEffect(() => {
    localStorage.setItem('weatherWidgets', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (data: Omit<Widget, 'id'>) => {
    const widgetExists = widgets.some(widget => widget.name === data.name);
    if (widgetExists) {
      alert('A City with this name already exists.');
      return;
    }

    const newWidget: Widget = { id: Date.now(), ...data };
    setWidgets(prev => [...prev, newWidget]);
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
