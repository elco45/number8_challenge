import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

function getColor(dateType) {
  switch (dateType) {
    case 'H': // Holiday
      return '#FF750C';
    case 'N': // Normal
      return '#C5DC89';
    case 'W': // Weekend
      return '#FEFD05';
    default:
      return '#CCCCCB';
  }
}

const DayElement = Styled.div`
  background: ${({ backgroundColor }) => backgroundColor};
  height: 28px;
  width: 28px;
  text-align: center;
  vertical-align: middle;
  line-height: 28px;
  font-size: 12px;
  border: 2px solid white;
`;

const Day = ({ dateType, day }) => (
  <DayElement
    backgroundColor={getColor(dateType)}
  >
    {day}
  </DayElement>
);

Day.propTypes = {
  dateType: PropTypes.string,
  day: PropTypes.string.isRequired
};

export default Day;