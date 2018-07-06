import React from 'react';
import PropTypes from 'prop-types';
import Holidays from 'date-holidays';
import Styled from "styled-components";
import Day from '../Day';
import * as Helper from './helper';

const DayElement = Styled.div`
  background: white;
  height: 28px;
  width: 28px;
  text-align: center;
  vertical-align: middle;
  line-height: 28px;
  font-size: 12px;
  border: 1px solid white;
  border-radius: 4px;
`;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function showMonth(dates) {
  if (dates.length > 0) {
    const startInvalidDays = dates[0].getDay();
    const endInvalidDays = dates[dates.length -1].getDay();

    const invalidStart = addInvalidDays(startInvalidDays, 'start');
    const validDates = addValidDays(dates);
    const invalidEnd = addInvalidDays(endInvalidDays, 'end');

    let allDates = [];
    allDates = invalidStart.concat(validDates);
    allDates = allDates.concat(invalidEnd);

    const result = Helper.chunkArray(allDates, 7);

    return (
      <div className="row" style={{ maxWidth: 200 }}>
        <div className="col-12">
          <div className="row">
            {
              ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <DayElement>
                  {day}
                </DayElement>
              ))
            }
          </div>
        </div>
        <div className="col-12">
          <span>
            {`${monthNames[dates[0].getMonth()]} ${dates[0].getFullYear()}`}
          </span>
        </div>
        {
          result.map((week, index) => (
            <div className="col-12" key={`row-${index}`}>
              <div className="row">
              {
                week.map((day) =>
                  day
                )
              }
              </div>
            </div>
          ))
        }
      </div>
    )
  }
  return <div />
}

function addValidDays(dates) {
  let hd = new Holidays('US');
  let validDays = [];
  dates.forEach((date) => {
    const number =date.getDate()
    if (hd.isHoliday(date)) {
      validDays.push(<Day dateType='H' day={number} key={date}/>)
    } else if (date.getDay() === 0 || date.getDay() === 6) {
      validDays.push(<Day dateType='W' day={number} key={date}/>)
    } else {
      validDays.push(<Day dateType='N' day={number} />)
    }
  })
  return validDays;
}

function addInvalidDays(startInvalidDays, key) {
  let invalidDays = [];
  for(let i = 0; i < startInvalidDays; i++) {
    invalidDays.push(<Day dateType='I' key={`${key}-${i}`}/>)
  }
  return invalidDays;
}

const Month = ({ dates }) => (
  showMonth(dates)
)

Month.propTypes = {
  dates: PropTypes.any,
};

export default Month;
