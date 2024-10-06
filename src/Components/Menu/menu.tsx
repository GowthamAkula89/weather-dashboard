import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import "./menu.css";

interface City {
  id: string;
  name: string;
  admin1: string;
  country: string;
  country_code: string;
}

interface MenuProps {
  filteredCities: City[];
  handleSearchCity: (city: City) => void;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ filteredCities, handleSearchCity, onClose }) => {
  return (
    <Paper
      sx={{width: "50%", position: "absolute", top: "56px", zIndex: 1, maxHeight: "300px", overflowY: "auto"}}
      elevation={3}
    >
      <Box>
        <List
          className="list-container"
          sx={{ width: "100%", maxHeight: "250px", overflowY: "auto" }}
        >
          {filteredCities?.length > 0 ? (
            filteredCities.map((city) => (
              <ListItem
                key={city.id}
                onClick={() => {
                  handleSearchCity(city);
                  onClose();
                }}
                sx={{
                  cursor: "pointer",
                  '&:hover': { backgroundColor: "#f0f0f0" }
                }}
              >
                <ListItemText
                  primary={<Typography variant="h6">{city.name}</Typography>}
                  secondary={
                    <Typography variant="body2">
                      {city.admin1}, {city.country}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">No results found</Typography>}
              />
            </ListItem>
          )}
        </List>
      </Box>
    </Paper>
  );
};

export default Menu;
