import React, { Component } from "react";
import "./language.css";
import Search from "@material-ui/icons/Search";

class Language extends Component {
  state = {};
  render() {
    return (
      <div className="language">
        <div className="language__inner-wrapper">
          <div className="inner-wrapper__name">{this.props.name}</div>
          <div className="inner-wrapper__station-count">{`${this.props.stationCount} stations found`}</div>
        </div>
        <div className="language__seach-icon-wrapper">
          <Search className="seach-icon-wrapper__icon" />
        </div>
      </div>
    );
  }
}

export default Language;
