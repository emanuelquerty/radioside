import React from "react";

function PageTitle(props) {
  function getPageTitle() {
    let location = window.location.pathname;
    let pageTitle;
    switch (location) {
      case "/radio/":
        pageTitle = "Recently Played";
        break;
      case "/radio/countries":
        pageTitle = "Browse Stations by Country";
        break;
      case "/radio/languages":
        pageTitle = "Browse Stations by Language";
        break;
      case "/radio/favorites":
        pageTitle = "Your Favorite Stations";
        break;
      case "/radio/stations-by-country":
        pageTitle = `Radio stations from ${props.countryOrLanguage}`;
        break;
      case "/radio/stations-by-language":
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
