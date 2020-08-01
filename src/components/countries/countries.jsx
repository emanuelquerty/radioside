import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./countries.css";
import Country from "../country/country.jsx";
import Loader from "react-loader-spinner";

class Countries extends Component {
  state = {
    countries: [],
    loaded: false,
  };

  componentWillUnmount() {
    this.props.onUpdatePageTitle();
  }

  // Get all countries with their station count
  componentDidMount() {
    let url = "/json/countries";

    async function getCountries() {
      let res = await fetch(url);
      return res.json();
    }

    getCountries().then((res) => {
      this.setState({ countries: res.slice(3), loaded: true });
    });
  }

  handleCountryClick = (countryName) => {
    let isCountry = true;
    this.props.onGetCountryName({ name: countryName, isCountry });
  };

  render() {
    return (
      <div className="page countries">
        <p className="countries-page-title">Browse Stations by Country</p>
        <div className="countries-inner-wrapper">
          {this.state.loaded ? (
            this.state.countries.map((country) => {
              let { name, stationcount } = country;
              return (
                <Link
                  className="country-link"
                  key={name}
                  to="/stations-by-country"
                  onClick={() => {
                    this.handleCountryClick(name);
                  }}
                >
                  <Country
                    name={
                      name.length > 20 ? `${name.substring(0, 22)}...` : name
                    }
                    stationCount={stationcount}
                  />
                </Link>
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
      </div>
    );
  }
}

export default Countries;
