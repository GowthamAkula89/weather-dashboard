import React, { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import Menu from "../Menu/menu";
import {AppBar, Toolbar, Typography, TextField, Button, Box,} from "@mui/material";
import fetchData from "../../Utils/fetchData"; 
import "./header.css";

interface City {
  name: string;
  admin1: string;
  country: string;
  country_code: string;
  id: string;
  [key: string]: any;
}

interface HeaderProps {
  addWidget: (widgetData: any) => void;
}

const Header: React.FC<HeaderProps> = ({ addWidget }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null); 

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const performSearch = async (text: string) => {
    if (text.trim() === "") {
      setFilteredCities([]);
      return;
    }
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=10&language=en&format=json`
      );
      const data = await response.json();
      setFilteredCities(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Debouncing Implementation
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredCities([]);
      return;
    }
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const timer = setTimeout(() => {
      performSearch(searchValue.trim());
    }, 500);
    setDebounceTimer(timer);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  const handleSearchCity = (city: City) => {
    const searchText = `${city.name}, ${city.admin1}, ${city.country_code}`;
    setSearchValue(searchText);
    setSelectedCity(city);
    setIsMenuOpen(false);
  };

  const handleAdd = async () => {
    if (!selectedCity) {
      console.error("No city selected");
      return;
    }

    // Fetch weather data for the selected city
    const weather = await fetchData(selectedCity);
    console.log("Weather", weather)
    // Use the selectedCity and weather data to construct the widget details
    const details = {
      name: selectedCity.name,
      state: selectedCity.admin1,
      country: selectedCity.country,
      temp: weather.current_weather.temperature,
      windspeed: weather.current_weather.windspeed
    };
    setSearchValue("")
    setSelectedCity(null)
    // Call addWidget with the details
    addWidget(details);
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MdSunny className="appLogo" />
          <Typography variant="h6" sx={{ ml: 1, color: "#fff" }}>
            Weather
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex:1 }}>
          <TextField
            variant="outlined"
            value={searchValue}
            placeholder="Search City..."
            onFocus={toggleMenu}
            onChange={(e) => setSearchValue(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
          {isMenuOpen && (
            <Menu
              filteredCities={filteredCities}
              handleSearchCity={handleSearchCity}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
