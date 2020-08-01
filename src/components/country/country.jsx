import React, { Component } from "react";
import "./country.css";
import Search from "@material-ui/icons/Search";

class Country extends Component {
  state = {
    flagUrl: "https://picsum.photos/100",
  };
  render() {
    return (
      <div className="country">
        <div className="country__flag">
          <img src={this.state.flagUrl} alt="station flag" />
        </div>
        <div className="country__inner-wrapper">
          <div className="inner-wrapper__name">{this.props.name}</div>
          <div className="inner-wrapper__station-count">{`${this.props.stationCount} stations found`}</div>
        </div>
        <div className="country__seach-icon-wrapper">
          <Search className="seach-icon-wrapper__icon" />
        </div>
      </div>
    );
  }
}

export default Country;
