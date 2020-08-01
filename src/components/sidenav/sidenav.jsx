import React from "react";
import "./sidenav.css";
import VideoLibrary from "@material-ui/icons/VideoLibrary";
import Public from "@material-ui/icons/Public";
import PinDrop from "@material-ui/icons/PinDrop";
import GitHub from "@material-ui/icons/GitHub";

import { Link } from "react-router-dom";

function SideNav(props) {
  function handleClick() {
    props.onNavLinkClick();
  }

  let classes = "sidenav ";
  classes += props.navIsClosed ? "sidenav-close" : "sidenav-open";
  return (
    <div className={classes}>
      <h1 className="app-title"> Hack Radio</h1>
      <ul className="sidenav__list">
        <li className="sidenav__item" onClick={handleClick}>
          <Link to="/">
            <VideoLibrary className="icon" />
            Recently Played
          </Link>
        </li>
        <li className="sidenav__item" onClick={handleClick}>
          <Link to="countries">
            <Public className="icon" />
            Countries
          </Link>
        </li>
        <li className="sidenav__item" onClick={handleClick}>
          <Link to="languages">
            <PinDrop className="icon" />
            Languages
          </Link>
        </li>
      </ul>

      <div className="app-author-and-github-box">
        <div className="app-github">
          Connect with me
          <a
            className="github-link"
            href="https://github.com/emanuelquerty?tab=repositories"
            target="__blank"
          >
            <GitHub className="app-github__icon" />
          </a>
          <p className="developer-name">
            Created with &hearts; by Emanuel Inacio
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
