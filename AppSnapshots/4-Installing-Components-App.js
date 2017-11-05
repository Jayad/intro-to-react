import React, { Component } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";

import fetch from "isomorphic-fetch";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Singapore", latitude: 1.2948, longitude: 103.8565 },
  { name: "Seoul", latitude: 37.5665, longitude: 126.978 },
  { name: "Honolulu", latitude: 21.3069, longitude: -157.8583 },
  { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
  { name: "Menlo Park", latitude: 37.453, longitude: -122.1817 }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const latitude = this.props.latitude;
    const longitude = this.props.longitude;
    const URL =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=a50c863a9328b69267ad0fed0863cb93&units=imperial";
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        this.setState({ weatherData: json });
      });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "https://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°c</p>
        <p>High: {weatherData.main.temp_max}°c</p>
        <p>Low: {weatherData.main.temp_min}°c</p>
        <p>Wind Speed: {weatherData.wind.speed} km/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>React Simple Weather App</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}>
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>
                    {place.name}
                  </NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay
                key={activePlace}
                latitude={PLACES[activePlace].latitude}
                longitude={PLACES[activePlace].longitude}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
