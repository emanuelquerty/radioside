import React from "react";

function PageTitle(props) {
  function getPageTitle() {
    let location = window.location.pathname;
    let pageTitle;
    switch (location) {
      case "/":
        pageTitle = "Recently Played";
        break;
      case "/countries":
        pageTitle = "Browse Stations by Country";
        break;
      case "/languages":
        pageTitle = "Browse Stations by Language";
        break;
      case "/favorites":
        pageTitle = "Your Favorite Stations";
        break;
      case "/stations-by-country":
        pageTitle = `Radio stations from ${props.countryOrLanguage}`;
        break;
      case "/stations-by-language":
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
