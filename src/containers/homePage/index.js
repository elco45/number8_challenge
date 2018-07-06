import React, { Component } from "react";
import Moment from "moment";
import Styled from "styled-components";
import Month from "../../components/Month";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      startDate: new Date(),
      numDays: 30,
      countryCode: "US"
    };

    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onNumberDateChange = this.onNumberDateChange.bind(this);
    this.onCountryCodeChange = this.onCountryCodeChange.bind(this);
  }

  getDates(startDate, endDate) {
    let dates = [],
      currentDate = startDate,
      addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      currentDate.setHours(0, 0, 0, 0);
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  separateDatesByMonth(dates) {
    let result = [];
    let tempArray = [];
    dates.forEach((date, index) => {
      tempArray.push(date);
      const lastDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );
      if (
        date.getTime() === lastDayOfMonth.getTime() ||
        dates.length === index + 1
      ) {
        result.push(tempArray);
        tempArray = [];
      }
    });
    return result;
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  onStartDateChange(e) {
    const date = e.target.value;
    const temp = new Date(date);

    this.setState({
      startDate: new Date(temp.getTime() + temp.getTimezoneOffset() * 60 * 1000)
    });
  }

  onNumberDateChange(e) {
    const number = e.target.value;

    this.setState({
      numDays: Number(number)
    });
  }

  onCountryCodeChange(e) {
    const countryCode = e.target.value;

    this.setState({
      countryCode
    });
  }
  render() {
    const { startDate, numDays, countryCode } = this.state;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numDays);
    const allDates = this.separateDatesByMonth(
      this.getDates(startDate, endDate)
    );

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3">
            <p>Start Date:</p>
            <input
              type="date"
              value={Moment(startDate).format("YYYY-MM-DD")}
              onChange={this.onStartDateChange}
            />
          </div>
          <div className="col-3">
            <p>Number of days:</p>
            <input
              type="number"
              value={numDays}
              onChange={this.onNumberDateChange}
            />
          </div>
          <div className="col-3">
            <p>Country code:</p>
            <input
              type="text"
              value={countryCode}
              onChange={this.onCountryCodeChange}
            />
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          {allDates.map((monthDates, index) => (
            <div className="col-3" key={`monthC-${index}`}>
              <Month key={`month-${index}`} dates={monthDates} countryCode={countryCode}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
