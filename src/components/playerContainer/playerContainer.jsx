import React from "react";
import "./playerContainer.css";
import SkipPrevious from "@material-ui/icons/SkipPrevious";
import SkipNext from "@material-ui/icons/SkipNext";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import Loader from "react-loader-spinner";

function PlayerContainer(props) {
  let {
    stationPlaying,
    countryOrLanguage,
    aStationIsPlaying,
    aStationIsLoading,
    stationFavicon,
  } = props;

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
            {stationPlaying.length > 22
              ? stationPlaying.substring(0, 22)
              : stationPlaying}
          </p>
          <p className="inner-wrapper__station-country">{countryOrLanguage}</p>
        </div>
        <div className="inner-wrapper__player-control-btns">
          <SkipPrevious className="player-control-btns__skip-previous" />
          <div
            onClick={() => props.togglePlaying()}
            className="player-control-btns__play-arrow-wrapper"
          >
            {/* Show the station loading animation while a station is loading */}
            {aStationIsLoading && (
              <Loader
                className="audio-loader"
                type="Puff"
                color="#c4c4c4"
                height={40}
                width={40}
              />
            )}

            {/* Show the pause button if a station is playing  */}
            {aStationIsPlaying && (
              <Pause className="pause-arrow-wrapper__pause-arrow" />
            )}

            {/* Show the play button if there is no station playing */}
            {!aStationIsLoading && !aStationIsPlaying && (
              <PlayArrow className="play-arrow-wrapper__play-arrow" />
            )}
          </div>
          <SkipNext className="player-control-btns__skip-next" />
        </div>
      </div>
    </div>
  );
}

export default PlayerContainer;
