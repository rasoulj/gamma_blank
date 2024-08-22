import dayjs from 'dayjs';

export const getDateDiffTitle = (date: Date) => {
  let todayDate = dayjs().format('YYYY-MM-DD');
  let currentDate = dayjs(date).format('YYYY-MM-DD');
  let nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
  let dayDiff = dayjs(currentDate).diff(todayDate, 'day');

  if (nextDate === currentDate) return 'Tommorrow';
  if (todayDate === currentDate) return 'Today';
  if (dayDiff > 1 && dayDiff < 8) return 'Week';
  else if (dayDiff > 7) return 'Month';
  else return 'Expired';
};

export const getTime = date => {
  let time = date?.toString()?.split('T')?.[1]?.split(':');
  let hour = parseInt(time?.[0] ?? '0');
  let hourString = hour > 12 ? hour - 12 : hour;
  let hourFString = hourString < 10 ? `0${hourString}` : `${hourString}`;
  const timeString = `${hourFString}:${time?.[1]} ${hour > 11 ? 'PM' : 'AM'}`;

  return timeString;
};

export const getTimeByDayjs = date => {
  return dayjs(date).format('hh:mm A');
};

export const getDateMonth = date => dayjs(date).format('MMM D');
