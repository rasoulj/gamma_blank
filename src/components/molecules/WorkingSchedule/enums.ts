export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}
export enum WorkingScheduleRepeatType {
  Custom = 'CUSTOM',
  FirstWeekOfMonth = 'FIRST_WEEK_OF_MONTH',
  FourthWeekOfMonth = 'FOURTH_WEEK_OF_MONTH',
  LastWeekOfMonth = 'LAST_WEEK_OF_MONTH',
  SecondWeekOfMonth = 'SECOND_WEEK_OF_MONTH',
  ThirdWeekOfMonth = 'THIRD_WEEK_OF_MONTH',
  Weekly = 'WEEKLY',
}
export enum WorkingScheduleRepeatEveryType {
  Days = 'DAYS',
  Months = 'MONTHS',
  Weeks = 'WEEKS',
  Years = 'YEARS',
}
export const shortDayNames = [
  {value: 'SATURDAY', label: 'Sa'},
  {value: 'SUNDAY', label: 'Su'},
  {value: 'MONDAY', label: 'Mo'},
  {value: 'TUESDAY', label: 'Tu'},
  {value: 'WEDNESDAY', label: 'We'},
  {value: 'THURSDAY', label: 'Th'},
  {value: 'FRIDAY', label: 'Fr'},
];
export const repeatEveryData = [
  {value: WorkingScheduleRepeatEveryType.Days, label: 'Day'},
  {value: WorkingScheduleRepeatEveryType.Weeks, label: 'Week'},
  {value: WorkingScheduleRepeatEveryType.Months, label: 'Month'},
  {value: WorkingScheduleRepeatEveryType.Years, label: 'Year'},
];
