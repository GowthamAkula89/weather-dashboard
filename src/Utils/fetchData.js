const fetchData = async(city) => {
    const latitude = city.latitude;
    const longitude = city.longitude;
    try {
      let response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

      const data = await response.json();
      console.log(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }
 module.exports = fetchData