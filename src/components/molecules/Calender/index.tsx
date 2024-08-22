import React from 'react';
import DurationCalender from './DurationCalender';
import HorizontalCalender from './HorizontalCalender';
import SimpleCalender from './SimpleCalender';

const Calender = ({
  shape,
  selectDay,
  type,
  label,
}: {
  shape: 'duration' | 'available' | 'simple' | 'horizontal';
  type?: 'select' | 'simple';
  selectDay?: (value) => void;
  label?: string;
}) => {
  const selectedDates: any = [
    '2023-05-13',
    '2023-05-20',
    '2023-05-16',
    '2023-05-18',
  ];

  switch (shape) {
    case 'duration':
      return <DurationCalender unavailableTimes={selectedDates} />;
    case 'available':
      return (
        <SimpleCalender
          selectDay={selectDay}
          availableTimes={selectedDates}
          label={label}
        />
      );
    case 'simple':
      return (
        <SimpleCalender
          availableTimes={selectedDates}
          label={label}
          selectDay={selectDay}
        />
      );
    case 'horizontal':
      return <HorizontalCalender />;
    default:
      return <SimpleCalender label={label} />;
  }
};

export default Calender;
