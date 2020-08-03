import React, { Component } from "react";
import "./stations.css";
import Station from "../station/station.jsx";
import Loader from "react-loader-spinner";

class Stations extends Component {
  state = {
    stations: [],
    selectedStation: "",
    loaded: false,
  };

  componentWillUnmount() {
    this.props.onUpdatePageTitle();
  }

  componentDidMount() {
    let { queryString, isCountry } = this.props;
    let url;

    // Construct the url to fetch stations
    isCountry
      ? (url = `https://de1.api.radio-browser.info/json/stations/bycountry/${queryString}`)
      : (url = `https://de1.api.radio-browser.info/json/stations/bylanguage/${queryString}`);

    // Fetch stations from the country or language given by queryString
    async function getStations() {
      let res = await fetch(url);
      return res.json();
    }

    getStations().then((res) => {
      let key = 0;
      let stationsCleaned = res.map((station) => {
        let { name, country, url, favicon } = station;
        key += 1;
        return { name, countryOrLanguage: country, url, key, favicon };
      });

      this.setState({ stations: stationsCleaned.slice(), loaded: true });
    });

    // // STREAMS
    // let key = 0;
    // oboe(url).node("!.*", (station) => {
    //   //   console.log(station);
    //   let stations = JSON.parse(JSON.stringify(this.state.stations));
    //   let countryOrLanguage;

    //   isCountry
    //     ? (countryOrLanguage = station.country)
    //     : (countryOrLanguage = station.language);

    //   let { name, url } = station;
    //   stations.push({ name, countryOrLanguage, url, key });
    //   this.setState({ stations });
    //   key += 1;
    // });
  }

  handlePlay = (station) => {
    // Play this station if a different station is playing.
    // Toggle between play and pause if it is already playing or paused
    this.props.onPlay(station);
    this.setState({ selectedStation: station.name });
  };

  render() {
    return (
      <div className="page stations">
        {this.state.loaded ? (
          this.state.stations.map((station) => {
            return (
              <Station
                key={station.key}
                stationName={station.name}
                countryOrLanguage={station.countryOrLanguage}
                url={station.url}
                favicon={station.favicon}
                onPlay={this.handlePlay}
                aStationIsPlaying={this.props.aStationIsPlaying}
                selectedStation={this.state.selectedStation}
                player={this.props.player}
              />
            );
          })
        ) : (
          <Loader
            className="loader"
            type="Audio"
            color="#c4c4c4"
            height={80}
            width={80}
          />
        )}
      </div>
    );
  }
}

export default Stations;
