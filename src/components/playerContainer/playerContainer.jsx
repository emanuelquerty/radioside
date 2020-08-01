import React, { Component } from "react";
import "./playerContainer.css";
import SkipPrevious from "@material-ui/icons/SkipPrevious";
import SkipNext from "@material-ui/icons/SkipNext";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";

class PlayerContainer extends Component {
  render() {
    let {
      stationName,
      countryOrLanguage,
      aStationIsPlaying,
      stationFavicon,
    } = this.props;

    return (
      <div className="player-container">
        <div className="player-container__inner-wrapper">
          <div className="inner-wrapper__favicon-container">
            <img
              className="favicon-container__img"
              src={stationFavicon}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/100";
              }}
              alt="station"
            />
          </div>
          <div className="inner-wrapper_station-info">
            <p className="inner-wrapper__station-name">
              {stationName.length > 22
                ? stationName.substring(0, 22)
                : stationName}
            </p>
            <p className="inner-wrapper__station-country">
              {countryOrLanguage}
            </p>
          </div>
          <div className="inner-wrapper__player-control-btns">
            <SkipPrevious className="player-control-btns__skip-previous" />
            <div
              onClick={() => this.props.togglePlaying()}
              className="player-control-btns__play-arrow-wrapper"
            >
              {aStationIsPlaying ? (
                <Pause className="pause-arrow-wrapper__pause-arrow" />
              ) : (
                <PlayArrow className="play-arrow-wrapper__play-arrow" />
              )}
            </div>
            <SkipNext className="player-control-btns__skip-next" />
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerContainer;
