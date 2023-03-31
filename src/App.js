import Axios from "axios";
import React from 'react'
import { useState } from 'react'


function App() {

  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;


  const apiCall = async (e) => {
    e.preventDefault()
    const loc = e.target.elements.loc.value
    const req = Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`);
    const res = await req;
    setWeather({
        descp: res.data.weather[0].description,
        temp: res.data.main.temp,
        city: res.data.name,
        humidity: res.data.main.humidity,
        press: res.data.main.pressure,
    })

    setCity(res.data.name)

}

let k = weather.temp;
let C = k - 273.15

const GetWeather = () => {
  return <div>
    <div className="winfo">
                Weather information for {city}
                <hr></hr>
            </div>
            <div className="Weath">
                <div className="welement">
                    Weather : {weather.descp}
                </div>
                <div className="welement">
                    Temperature : {C.toFixed(2)} &#8451;
                </div>
                <div className="welement">
                    Humidity : {weather.humidity} %
                </div>
                <div className="welement">
                    Pressure :  {weather.press} mb
                </div>
            </div>
  </div>
}

  return (
    <div className="App">
    <div className="weathhead">Weather Info</div>
        <div className="mainweather">
            <div className="weather">
                <form onSubmit={apiCall} className="form">
                    <input type="text" 
                     placeholder="City" 
                     name="loc" />
                    <button className="btn">Search</button>
                </form>

                {weather && <GetWeather />}
            </div>
        </div>
      
    </div>
  );
}

export default App;
