import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./languages.css";
import Language from "../language/language.jsx";
import Loader from "react-loader-spinner";

class Languages extends Component {
  state = {
    languages: [],
    loaded: false,
  };

  componentWillUnmount() {
    this.props.onUpdatePageTitle();
  }

  // Get all languages with their station count
  componentDidMount() {
    let url = "/json/languages";

    async function getLanguages() {
      let res = await fetch(url);
      return res.json();
    }

    getLanguages().then((res) => {
      this.setState({ languages: res.slice(3), loaded: true });
    });
  }

  handleLanguageClick = (languageName) => {
    let isCountry = false;
    this.props.onGetLanguageName({ name: languageName, isCountry });
  };

  render() {
    return (
      <div className="page languages">
        <p className="languages-page-title">Browse Stations by Language</p>
        <div className="languages-inner-wrapper">
          {this.state.loaded ? (
            this.state.languages.map((lang) => {
              let { name, stationcount } = lang;

              return (
                <Link
                  className="language-link"
                  key={name}
                  to="/stations-by-language"
                  onClick={() => {
                    this.handleLanguageClick(name);
                  }}
                >
                  <Language
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

export default Languages;
