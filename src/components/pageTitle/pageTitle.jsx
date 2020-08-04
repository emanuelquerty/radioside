import React from "react";

function PageTitle(props) {
  function getPageTitle() {
    let location = window.location.pathname;
    let pageTitle;
    switch (location) {
      case "/radioside/":
        pageTitle = "Recently Played";
        break;
      case "/radioside/countries":
        pageTitle = "Browse Stations by Country";
        break;
      case "/radioside/languages":
        pageTitle = "Browse Stations by Language";
        break;
      case "/radioside/favorites":
        pageTitle = "Your Favorite Stations";
        break;
      case "/radioside/stations-by-country":
        pageTitle = `Radio stations from ${props.countryOrLanguage}`;
        break;
      case "/radioside/stations-by-language":
        pageTitle = `Radio stations in ${props.countryOrLanguage}`;
        break;

      default:
        break;
    }

    return pageTitle;
  }

  return <p>{getPageTitle()}</p>;
}

export default PageTitle;
