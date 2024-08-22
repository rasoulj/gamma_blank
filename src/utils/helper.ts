import dayjs from 'dayjs';
import {themeName} from '~/theme/data';

export function randomString(length: number) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function removeEmpty(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
    else if (obj[key] === undefined || obj[key] === null) delete obj[key];
  });
  return obj;
}

export function deleteKeys(obj, keys) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    for (var prop in obj) {
      if (prop === key) {
        delete obj[prop];
        break;
      } else if (obj[prop] instanceof Object) {
        deleteKeys(obj[prop], [key]);
      }
    }
  }
}

export function deleteKeysContaining(obj, str) {
  for (var prop in obj) {
    if (prop.indexOf(str) !== -1) {
      delete obj[prop];
    } else if (obj[prop] instanceof Object) {
      deleteKeysContaining(obj[prop], str);
    }
  }
}

type Colors = {
  trueColor: string;
  falseColor: string;
};

export function applyColorTo(themeArray, {falseColor, trueColor}: Colors) {
  return themeArray?.includes(themeName) ? trueColor : falseColor;
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function numberWithCommas(x: number = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function convertDurationToTime(duration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/; // Regular expression to parse duration

  const match = duration.match(regex); // Extract hours, minutes, and seconds

  const hours = match[1] ? `${match[1]} hours` : '';
  const minutes = match[2] ? `${match[2]} minutes` : '';
  const seconds = match[3] ? `${match[3]} seconds` : '';

  // Construct the human-readable duration
  let humanReadableDuration = '';
  if (hours) humanReadableDuration += hours;
  if (minutes) humanReadableDuration += (hours ? ' ' : '') + minutes;
  if (seconds) humanReadableDuration += (hours || minutes ? ' ' : '') + seconds;

  return humanReadableDuration.trim();
}

export function toPascalCase(inputString = '') {
  const lowerCaseString = (inputString ?? '').toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
}

export function toSplitWords(inputString) {
  return inputString.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function toNumericPart(inputString) {
  var numericPart = inputString.match(/\d+/);
  if (numericPart) {
    return numericPart[0];
  } else {
    console.log('No numeric part found in the string.');
  }
}

export const durationToSeconds = duration => {
  const match = duration?.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
};

export const seprate2Numbers = number => {
  let numbers = number.replace(/\D+/g, '');
  let formattedText = numbers.replace(/(.{2})/g, '$1/');

  return formattedText;
};

export const seprate4Numbers = number => {
  let numbers = number.replace(/\D+/g, '');
  let formattedText = numbers.replace(/(.{4})/g, '$1 ');

  return formattedText;
};

export const removeNonNumericCharacters = number => {
  return number.replace(/\D+/g, '');
};

export const localTime = date => {
  return new Date(date).toLocaleDateString('US-EN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

export const checkPaymentInputs = inputs => {
  return (
    inputs?.cvv &&
    inputs?.date &&
    inputs?.cardNumber &&
    inputs?.name &&
    inputs?.zipCode
  );
};

export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

export function countWords(text) {
  text = text?.trim();

  const words = text?.split(/\s+/);

  return words?.length;
}

export const formatMillisecondsToTimespan = ms => {
  const duration = dayjs.duration(ms);

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const parts = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }
  if (hours > 0) {
    parts.push(`${hours}H`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}M`);
  }
  if (seconds > 0) {
    parts.push(`${seconds}S`);
  }

  return parts.join('');
};

export const formatMillisecondsToString = ms => {
  const duration = dayjs.duration(ms);

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const parts = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }
  if (hours > 0) {
    parts.push(`${hours} Hour`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} Minuts`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} Seconds`);
  }

  return seconds === 0 && hours === 0 && minutes === 0
    ? `0 Seconds`
    : parts.join(' ');
};

export function appFormatDate(date?: Date, format: string = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export function creditCardType(cc: string) {
  let amex = new RegExp('^3[47][0-9]{13}$');
  let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
  let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

  let mastercard = new RegExp('^5[1-5][0-9]{14}$');
  let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

  let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
  let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
  let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

  let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
  let jcb = new RegExp('^35[0-9]{14}[0-9]*$');

  if (visa.test(cc)) {
    return 'VISA';
  }
  if (amex.test(cc)) {
    return 'AMEX';
  }
  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return 'MASTERCARD';
  }
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    return 'DISCOVER';
  }
  if (diners.test(cc)) {
    return 'DINERS';
  }
  if (jcb.test(cc)) {
    return 'JCB';
  }
  if (cup1.test(cc) || cup2.test(cc)) {
    return 'CHINA_UNION_PAY';
  }
  return undefined;
}

export const validateInstagramUrl = inputUrl => {
  const instagramUrlPattern =
    /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/[a-zA-Z0-9._]+\/?$/;
  return instagramUrlPattern.test(inputUrl);
};

export const validateFacebookUrl = inputUrl => {
  const facebookUrlPattern =
    /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/[a-zA-Z0-9.]+\/?$/;
  return facebookUrlPattern.test(inputUrl);
};

export const validateLinkedInUrl = inputUrl => {
  const linkedInUrlPattern =
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|profile)\/[a-zA-Z0-9\_\-\/]+\/?$/;
  return linkedInUrlPattern.test(inputUrl);
};

export const validateYouTubeUrl = inputUrl => {
  const youtubeUrlPattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
  return youtubeUrlPattern.test(inputUrl);
};
