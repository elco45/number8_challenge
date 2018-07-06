import React, { Component } from 'react';
import Month from '../../components/Month';

class Home extends Component {
  getDates(startDate, endDate) {
    let dates = [],
    currentDate = startDate,
    addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      currentDate.setHours(0,0,0,0)
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  separateDatesByMonth(dates) {
    let result = [];
    let tempArray = [];
    dates.forEach((date, index) => {
      tempArray.push(date)
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      if (date.getTime() === lastDayOfMonth.getTime() || (dates.length === index + 1)) {
        result.push(tempArray);
        tempArray = [];
      }
    });
    return result;
  }

  render() {
    const testDate = new Date();
    testDate.setDate(testDate.getDate() + 30);

    const showDates = this.getDates(new Date(), testDate);
    console.log(this.separateDatesByMonth(showDates));
    return (
      <div className="container">

      </div>
    );
  }
}

export default Home;
