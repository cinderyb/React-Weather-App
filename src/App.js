import Axios from "axios";
import React from 'react';
import { useState } from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { useQuery } from "@tanstack/react-query";

function App() {

    const client = new QueryClient ();

  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;


  const apiCall = async (e) => {
    e.preventDefault()
    const loc = e.target.elements.loc.value
    const {req, isLoading} = useQuery(["weather"], ()=>{
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`).then((res) => res.data);
});
    // const res = await req?;
    setWeather({
        descp: req?.data.weather[0].description,
        temp: req?.data.main.temp,
        city: req?.data.name,
        humidity: req?.data.main.humidity,
        press: req?.data.main.pressure,
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
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  );
}

export default App;
