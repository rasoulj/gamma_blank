import {deviceWidth} from '../methods';

export function getWidth(column = 2, padding) {
  return (deviceWidth - padding * 2) / column;
}
