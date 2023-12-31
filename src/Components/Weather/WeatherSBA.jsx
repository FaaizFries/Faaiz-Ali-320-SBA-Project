import React, { Component } from 'react';
import './WeatherSBA.css';

// this imports the weather icons for diffrent conditions.
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';


class WeatherSBA extends Component {
  constructor(props) {
    super(props);
    // Setting up the initial state of the component
    this.state = {
      wicon: cloud_icon, //the default is cloud icon
    };
    this.api_key = "9902fbcf349e760ee357716f1bc2ac61"; // open weather api key
  }
// this function searches the weather data based on the input
  search = async () => {
    const element = document.getElementsByClassName("cityInput");
    //if input is empty without api call
    if (element[0].value === "") {
      return 0;
    }
    // api url based on the user input
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=imperial&appid=${this.api_key}`;

    // fetching the data from the api
    let response = await fetch(url);
    let data = await response.json();
    //getting the dom elements to display the information
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    //this will display the information from the api
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " mph";
    temprature[0].innerHTML = data.main.temp + "°F";
    location[0].innerHTML = data.name;


    // and this will update the weather icon based on the weather conditon
    if (data.weather[0].icon === '01d' || data.weather[0].icon === "01n") {
      this.setState({ wicon: clear_icon });
    } else if (data.weather[0].icon === '02d' || data.weather[0].icon === "02n") {
      this.setState({ wicon: cloud_icon });
    } else if (data.weather[0].icon === '03d' || data.weather[0].icon === "03n") {
      this.setState({ wicon: drizzle_icon });
    } else if (data.weather[0].icon === '04d' || data.weather[0].icon === "04n") {
      this.setState({ wicon: drizzle_icon });
    } else if (data.weather[0].icon === '09d' || data.weather[0].icon === "09n") {
      this.setState({ wicon: rain_icon });
    } else if (data.weather[0].icon === '10d' || data.weather[0].icon === "10n") {
      this.setState({ wicon: rain_icon });
    } else if (data.weather[0].icon === '13d' || data.weather[0].icon === "13n") {
      this.setState({ wicon: snow_icon });
    } else {
      this.setState({ wicon: clear_icon });
    }
  };
// and everything else will render the weather app
  render() {
    return (
      <div className='container'>
        <div className="top-bar">
          <input type="text" className='cityInput' placeholder='Search' />
          <div className="search-icon" onClick={() => { this.search() }}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={this.state.wicon} alt="" />
        </div>
        <div className="weather-temp">80°F</div>
        <div className="weather-location">Niagra Falls</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className='icon' />
            <div className="data" >
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className='icon' />
            <div className="data" >
              <div className="wind-rate">3 mph</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherSBA;

