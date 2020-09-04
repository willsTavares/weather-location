import React, { Fragment, useState, useEffect } from 'react';
import "./App.css";
import axios from 'axios';


function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location == false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser.
      </Fragment>
    )
  }
  else if (weather == false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  }
  else {
    return (
      <Fragment>
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 15) ? 'app warm' : 'app') : 'app'}>
          <main>
            <h3>Clima agora ({weather['weather'][0]['description']})</h3>
            <br></br>
            <hr />
            <br></br>
            <ul>
              <li>Localização: {weather['sys']['country']},{weather['name']}</li>
              <li>Temperatura atual: {weather['main']['temp']}°</li>
              <li>Sensação Térmica: {weather['main']['feels_like']}°</li>
              <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
              <li>Temperatura minima: {weather['main']['temp_min']}°</li>
              <li>Pressão: {weather['main']['pressure']} hpa</li>
              <li>Humidade: {weather['main']['humidity']}%</li>
            </ul>
          </main>
        </div>
      </Fragment>
    );
  }
}
export default App;
