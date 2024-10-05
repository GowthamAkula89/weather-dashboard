import {
  WiDaySunny,
  WiCloudy,
  WiFog,
  WiRain,
  WiSnow,
  WiDayShowers,
  WiDayThunderstorm,
} from 'react-icons/wi';

const weatherCodeIconMap = {
  0: { condition: "Clear sky", icon: <WiDaySunny /> },
  1: { condition: "Mainly clear", icon: <WiDaySunny /> },
  2: { condition: "Partly cloudy", icon: <WiCloudy /> },
  3: { condition: "Overcast", icon: <WiCloudy /> },
  45: { condition: "Fog", icon: <WiFog /> },
  48: { condition: "Depositing rime fog", icon: <WiFog /> },
  51: { condition: "Drizzle: Light", icon: <WiRain /> },
  53: { condition: "Drizzle: Moderate", icon: <WiRain /> },
  55: { condition: "Drizzle: Dense intensity", icon: <WiRain /> },
  61: { condition: "Rain: Slight", icon: <WiRain /> },
  63: { condition: "Rain: Moderate", icon: <WiRain /> },
  65: { condition: "Rain: Heavy intensity", icon: <WiRain /> },
  71: { condition: "Snow fall: Slight", icon: <WiSnow /> },
  73: { condition: "Snow fall: Moderate", icon: <WiSnow /> },
  75: { condition: "Snow fall: Heavy intensity", icon: <WiSnow /> },
  80: { condition: "Rain showers: Slight", icon: <WiDayShowers /> },
  81: { condition: "Rain showers: Moderate", icon: <WiDayShowers /> },
  82: { condition: "Rain showers: Violent", icon: <WiDayThunderstorm /> },
  95: { condition: "Thunderstorm: Slight", icon: <WiDayThunderstorm /> },
  96: { condition: "Thunderstorm: With hail", icon: <WiDayThunderstorm /> },
};

const fetchData = async (city) => {
  const { latitude, longitude } = city;
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const data = await response.json();

  const { temperature, windspeed, weathercode } = data.current_weather;
  const weatherCondition = weatherCodeIconMap[weathercode] || { condition: "Unknown", icon: null };

  return {
    temperature,
    windspeed,
    condition: weatherCondition.condition,
    icon: weatherCondition.icon
  };
};

export default fetchData;
