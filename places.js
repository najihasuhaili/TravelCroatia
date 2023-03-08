function getWeather() {
    const city = document.getElementById("city").value;
    
    if (city === "") {
      alert("Please select a city.");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`;
    fetch(url) /*fetch url */
      .then(response => response.json())
      .then(data => {
        const weather = document.getElementById("weather");
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const speed = data.wind.speed
        const max = Math.round(data.main.temp_max - 273.15);
        const min = Math.round(data.main.temp_min - 273.15);
        /*display data*/
        weather.innerHTML = `
          <h2>${city}</h2>
          <p><b>Current Temperature:<b> ${temperature} &deg;C</p>
          <p><b>Estimate Temperature is between:</b> ${min}&deg;C AND ${max}&deg;C</p>
          <p><b>Wind Speed:<b> ${speed}</p>
          <p>${description}</p>
          <img src="${icon}" alt="${description}">
        `;
      })
      .catch(error => {
        console.log(error);
        const weather = document.getElementById("weather");
        weather.innerHTML = `<p>Could not retrieve weather data for ${city}</p>`;
      });
  }