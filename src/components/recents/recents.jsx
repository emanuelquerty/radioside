import React, { Component } from "react";
import "./recents.css";
import RecentStation from "../recentStation/recentStation.jsx";

class Recents extends Component {
  state = {};

  componentWillUnmount() {
    this.props.onUpdatePageTitle();
  }

  handlePlay = (station) => {
    this.props.onPlay(station);
  };

  render() {
    let recents = [];
    if (window.localStorage.getItem("recents")) {
      recents = JSON.parse(window.localStorage.getItem("recents"));
    }

    return (
      <div className="page recents">
        {recents.length !== 0 && (
          <p className="recent-page-title">Recently Played</p>
        )}
        <div className="recents-inner-wrapper">
          {recents.length === 0 ? (
            <p className="recent-description--on-no-recent-stations">
              Opsss... You haven't played any station recently.
            </p>
          ) : (
            recents.map((station) => {
              return (
                <RecentStation
                  key={station.name}
                  name={station.name}
                  countryOrLanguage={station.countryOrLanguage}
                  favicon={station.favicon}
                  url={station.url}
                  onPlay={this.handlePlay}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default Recents;
