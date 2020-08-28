import React from "react";
import "./station.css";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import Loader from "react-loader-spinner";

function Station(props) {
  let {
    stationName,
    countryOrLanguage,
    aStationIsPlaying,
    aStationIsLoading,
    selectedStation,
  } = props;

  function handleClick() {
    let { stationName, countryOrLanguage, url, favicon } = props;

    // Play this station if a different station is playing.
    // toggle between play and pause if it is already playing or paused
    props.onPlay({ name: stationName, countryOrLanguage, url, favicon });
  }

  return (
    <div className="station" onClick={handleClick}>
      <div className="station__flag">
        <img src={"https://picsum.photos/100"} alt="station flag" />
      </div>
      <div className="station__inner-wrapper">
        <div className="inner-wrapper__name">
          {stationName.length > 22 ? stationName.substring(0, 22) : stationName}
        </div>
        <div className="inner-wrapper__countryOrLanguage">
          {countryOrLanguage}
        </div>
      </div>
      <div className="station__play-icon-wrapper">
        {aStationIsPlaying && selectedStation === stationName ? (
          <Pause className="pause-icon-wrapper__icon" />
        ) : selectedStation === stationName && aStationIsLoading ? (
          <Loader
            className="audio-loader"
            type="Puff"
            color="#c4c4c4"
            height={40}
            width={40}
          />
        ) : (
          <PlayArrow className="play-icon-wrapper__icon" />
        )}
      </div>
    </div>
  );
}

export default Station;
