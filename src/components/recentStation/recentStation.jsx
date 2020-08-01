import React from "react";
import "./recentStation.css";
import defaultFavicon from "../../public/default-station-favicon.jpg";

function RecentStation(props) {
  let { name, countryOrLanguage, favicon } = props;

  function handleClick() {
    let { name, countryOrLanguage, url, favicon } = props;

    // Play this station if a different station is playing.
    // toggle between play and pause if it is already playing or paused
    props.onPlay({ name, countryOrLanguage, url, favicon });
  }

  return (
    <div className="recent-station" onClick={handleClick}>
      <img
        className="recent-station__favicon"
        src={favicon}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultFavicon;
        }}
        alt="station favicon"
      />
      <div className="recent-station__station-info-wrapper">
        <p className="recent-station__name">
          {name.length > 22 ? name.slice(0, 16) : name}
        </p>
        <p className="recent-station__country-or-language">
          {countryOrLanguage}
        </p>
      </div>
    </div>
  );
}

export default RecentStation;
