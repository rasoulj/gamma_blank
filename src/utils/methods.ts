import {Dimensions, PixelRatio, Platform} from 'react-native';
import {getColor} from '~/components/elemental';
import {getTextColor} from '~/theme';
import {themeName} from '~/theme/data';
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
const {height: Height} = Dimensions.get('screen');
const isIOS = Platform.OS === 'ios';
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 720;
const globalBorderRadius = {
  button: 10,
  input: 10,
};
const screenSize = Math.sqrt(deviceWidth * deviceHeight) / 100;
const scale = (size: any) => (deviceWidth / guidelineBaseWidth) * size;
const verticalScale = (size: any) => (Height / guidelineBaseHeight) * size;
const moderateScale = (size: any, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const scaleSpace = (size: any) =>
  `${((size / deviceHeight) * 100).toFixed(2)}%`;

const SAFE_AREA_HEIGHT = Platform.OS === 'ios' ? 48 : 0;
const isDev = __DEV__;

const print = (...args) => {
  if (isDev) {
    console.log(...args);
  }
};

const generateUuid = () => {
  return 'xxxxxxxx'.replace(/[x]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const uniqueArray = (arr: any[]) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const isDark = (key: 'primary' | 'background' = 'background') => {
  return getTextColor(getColor({color: `${key}.500`})) === '#000000'
    ? false
    : true;
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

const shadow = {
  shadowColor: '#cecece',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.4,
  shadowRadius: 5,
  elevation: 5,
};
export {
  SAFE_AREA_HEIGHT,
  scaleSpace,
  scale,
  verticalScale,
  moderateScale,
  screenSize,
  deviceWidth,
  deviceHeight,
  isDev,
  generateUuid,
  print,
  uniqueArray,
  isIOS,
  shadow,
  isDark,
  calculateDistance,
  globalBorderRadius,
};
