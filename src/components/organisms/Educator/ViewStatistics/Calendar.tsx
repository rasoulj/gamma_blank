import dayjs from 'dayjs';
import {ChevronLeftIcon, ChevronRightIcon, HStack} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {Typography} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';

const CalendarComponent = ({selectedYear, onSelectYear}) => {
  const [months, setMonths] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);

  const decrementMonth = () => {
    const newYear = selectedYear - 1;
    onSelectYear(newYear);
  };

  const incrementMonth = () => {
    const newYear =
      dayjs().format('YYYY') === selectedYear ? selectedYear : selectedYear + 1;

    onSelectYear(newYear);
  };

  return (
    <HStack justifyContent={'space-between'} my="4">
      <Typography fontWeight={'500'} color="gray.800" fontSize="md">
        {selectedYear}
      </Typography>
      <HStack space={'6'}>
        <TouchableOpacity onPress={decrementMonth}>
          <ChevronLeftIcon size={'6'} color={getColor({color: 'gray.800'})} />
        </TouchableOpacity>

        <TouchableOpacity onPress={incrementMonth}>
          <ChevronRightIcon size={'6'} color={getColor({color: 'gray.800'})} />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
};

export default CalendarComponent;
