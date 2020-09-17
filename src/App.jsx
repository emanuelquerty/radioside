import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNav from "./components/sidenav/sidenav.jsx";
import PlayerContainer from "./components/playerContainer/playerContainer.jsx";
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import Recents from "./components/recents/recents.jsx";
import Countries from "./components/countries/countries.jsx";
import Languages from "./components/languages/languages.jsx";
import Stations from "./components/stations/stations.jsx";
import PageTitle from "./components/pageTitle/pageTitle.jsx";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Cancel from "@material-ui/icons/Cancel";
import Info from "@material-ui/icons/Info";

/*
 ********** Explanation of state properties **********************
 * navIsClosed: this property holds the state of the navbar -whether it is open or closed
 *
 * countryOrLanguage: This is useful for holding the language or country of the page to display
 * when the user clicks in a country/language from which to search stations ( see Stations component).
 * Another use of it is to display the country or language of a given station in the PlayerContainer component.
 * Finally, it is also  used in the getPageTitle method bellow.
 *
 * isCountry: tells the app if the search results was by country or language.
 * This is useful in the stations component for figuring out the query string
 * and other informations (see Stations component)
 *
 * player: this is the player that plays the audio in the handle play method of the App component
 *
 * aStationIsPlaying: this tells if there is a station playing. Useful in the PlayerContainer and Stations Component
 * for swiching between the pause and play icon
 *
 * stationPlaying: this holds the station name that is displayed in the PlayerContainer Component
 *
 *****************************************************************/
class App extends Component {
  constructor() {
    super();

    // Get initial page title. This is update everytime a component is unmounted
    this.state.pageTitle = <PageTitle countryOrLanguage="Angola" />;
  }

  state = {
    navIsClosed: true,
    countryOrLanguage: "Angola",
    isCountry: true,
    player: new Audio(),
    aStationIsPlaying: false,
    aStationIsLoading: false,
    stationPlaying: "No Station Playing",
    stationFavicon: "https://picsum.photos/100",
    cannotPlayStationPopUpIsClosed: true,
  };

  /* If nav is open, close nav. If closed, open nav */
  toggleNav = () => {
    this.setState({ navIsClosed: !this.state.navIsClosed });
  };

  /* This method sets and updates the page title on mobile devices */
  updatePageTitle = () => {
    this.setState({
      pageTitle: <PageTitle countryOrLanguage={this.state.countryOrLanguage} />,
    });
  };

  /* This method tells the app whether a search result is by country or language
  See Description above the App component for further information */
  setCountryOrLanguage = (info) => {
    this.setState({ countryOrLanguage: info.name, isCountry: info.isCountry });
  };

  /* This method saves a station that just started playing into a locaStorage
  variable for recently played stations */
  saveStationToRecents = (station) => {
    let { name, countryOrLanguage, url, favicon } = station;
    // window.localStorage.removeItem("recents");
    // return;

    // Save the station in recents
    if (window.localStorage.getItem("recents")) {
      let recents = JSON.parse(window.localStorage.getItem("recents"));
      let currentStation = recents.filter((station) => station.name === name);

      // Check if this station already exists
      if (currentStation.length === 0) {
        let recentStation = { name, countryOrLanguage, url, favicon };
        recents.unshift(recentStation);
        window.localStorage.setItem("recents", JSON.stringify(recents));
      }
    } else {
      let recents = [];
      let recentStation = { name, countryOrLanguage, url, favicon };
      recents.unshift(recentStation);
      window.localStorage.setItem("recents", JSON.stringify(recents));
    }
  };

  /* This is called from Stations Component as a function prop.
  See Stations component bellow for quick reference */
  handlePlay = (station) => {
    let { url, name, countryOrLanguage, favicon } = station;
    let { player } = this.state;

    if (
      player.paused &&
      player.currentTime > 0 &&
      player.src === url &&
      !player.ended
    ) {
      // If there's a station that has been paused,
      // and we click on it again, just resume the station
      player.play();
      this.setState({ aStationIsPlaying: true });
      return;
    } else if (!player.paused && player.src === url) {
      // If a station is playing and we click on it or on the play btn
      // pause the station
      player.pause();
      this.setState({ aStationIsPlaying: false });
      return;
    } else if (!player.paused) {
      // If there is a station playing and we selected a different station,
      // pause the currently-playing station and start the new selected station
      player.pause();
      this.setState({ aStationIsPlaying: false });
    }

    /* Play the station that has been selected */
    this.playAudio(player, name, url, countryOrLanguage, favicon);
  };

  /* Play the station that has been selected */
  playAudio = async (player, name, url, countryOrLanguage, favicon) => {
    try {
      // Set the url of the station to play
      player.src = url;

      // wait until station plays. This throws an error if station can't play
      // for reasons like station url is corrupted, station unavailable etc
      this.setState({ aStationIsLoading: true });
      await player.play();

      // Set aStationIsPlaying flag to true
      if (!player.paused) {
        this.setState({
          aStationIsLoading: false,
          aStationIsPlaying: true,
          stationPlaying: name,
          countryOrLanguage,
          stationFavicon: favicon,
        });

        // Save this station to recently-played-stations page
        this.saveStationToRecents({ name, url, countryOrLanguage, favicon });
      }
    } catch (err) {
      let cannotPlayStationPopUpIsClosed = true;
      let aStationIsLoading = true;
      console.log(err.name);

      if (err.name !== "AbortError") {
        cannotPlayStationPopUpIsClosed = false;
        aStationIsLoading = false;
        player.pause();
      }

      this.setState({
        aStationIsLoading,
        aStationIsPlaying: false,
        stationPlaying: "No station playing",
        cannotPlayStationPopUpIsClosed,
      });
    }
  };

  /* This method controls the radio player by toggling between play and pause
   * depending on user pressing the play or pause button
   */
  togglePlaying = () => {
    if (this.state.stationPlaying === "No Station Playing") return;

    // toggle the current station. If playing, pause it. Resume, otherwise.
    let { player, aStationIsPlaying } = this.state;
    if (aStationIsPlaying) {
      player.pause();
    } else {
      player.play();
    }

    this.setState({ aStationIsPlaying: !aStationIsPlaying });
  };

  render() {
    let {
      stationPlaying,
      countryOrLanguage,
      aStationIsLoading,
      aStationIsPlaying,
      isCountry,
      pageTitle,
      stationFavicon,
      cannotPlayStationPopUpIsClosed,
    } = this.state;

    let cannotPlayStationPopUpClassName = "cannot-play-station-pop-up";
    let backDropClassName = "backdropShadow";
    if (cannotPlayStationPopUpIsClosed) {
      cannotPlayStationPopUpClassName += " cannot-play-station-pop-up--hide";
      backDropClassName += " backdropShadow--hide";
    } else {
      cannotPlayStationPopUpClassName += " cannot-play-station-pop-up--show";
      backDropClassName += " backdropShadow--show";
    }

    return (
      <div className="app">
        <Router basename={process.env.PUBLIC_URL}>
          <main className="container">
            <label className="container__label" htmlFor="hamburger-checkbox">
              <div className="label__hamburger-circle" onClick={this.toggleNav}>
                {this.state.navIsClosed ? (
                  <Menu className="hamburger-circle__menu" />
                ) : (
                  <Close className="hamburger-circle__menu" />
                )}
              </div>
            </label>
            <input type="checkbox" id="hamburger-checkbox" />

            <SideNav
              navIsClosed={this.state.navIsClosed}
              onNavLinkClick={this.toggleNav}
            />
            <div className="page-description">{pageTitle}</div>
            <PlayerContainer
              aStationIsLoading={aStationIsLoading}
              aStationIsPlaying={aStationIsPlaying}
              stationPlaying={stationPlaying}
              countryOrLanguage={countryOrLanguage}
              stationFavicon={stationFavicon}
              togglePlaying={this.togglePlaying}
            />

            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <Recents
                    onUpdatePageTitle={this.updatePageTitle}
                    onPlay={this.handlePlay}
                  />
                )}
              />
              <Route
                path="/countries"
                render={() => {
                  return (
                    <Countries
                      onGetCountryName={this.setCountryOrLanguage}
                      onUpdatePageTitle={this.updatePageTitle}
                    />
                  );
                }}
              />
              <Route
                path="/languages"
                render={() => {
                  return (
                    <Languages
                      onGetLanguageName={this.setCountryOrLanguage}
                      onUpdatePageTitle={this.updatePageTitle}
                    />
                  );
                }}
              />
              <Route
                path="/stations-by-country"
                render={() => {
                  return (
                    <Stations
                      queryString={countryOrLanguage}
                      isCountry={isCountry}
                      onPlay={this.handlePlay}
                      aStationIsPlaying={aStationIsPlaying}
                      player={this.state.player}
                      onUpdatePageTitle={this.updatePageTitle}
                      aStationIsLoading={aStationIsLoading}
                    />
                  );
                }}
              />
              <Route
                path="/stations-by-language"
                render={() => {
                  return (
                    <Stations
                      queryString={this.state.countryOrLanguage}
                      isCountry={this.state.isCountry}
                      onPlay={this.handlePlay}
                      aStationIsPlaying={aStationIsPlaying}
                      player={this.state.player}
                      onUpdatePageTitle={this.updatePageTitle}
                      aStationIsLoading={aStationIsLoading}
                    />
                  );
                }}
              />
            </Switch>
          </main>
          <div className={cannotPlayStationPopUpClassName}>
            <h2 className="cannot-play-station-pop-up__error-title">
              <Info className="error-title__info-btn" />{" "}
              <span className="error-title__description">
                Station is anavailable
              </span>
            </h2>
            Cannot play this station because it is either currently unavailable
            or not supported.
            <Cancel
              className="cannot-play-station-pop-up__close-btn"
              onClick={() => {
                this.setState({ cannotPlayStationPopUpIsClosed: true });
              }}
            />
          </div>
          <div className={backDropClassName}></div>
        </Router>
      </div>
    );
  }
}

export default App;
