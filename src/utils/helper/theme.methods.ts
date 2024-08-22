import {simpleTheme} from '~/theme/simple_theme';
import currentTheme from '~/theme';

export function indexobj(obj, is, value) {
  if (typeof is == 'string') return indexobj(obj, is.split('.'), value);
  else if (is.length == 1 && value !== undefined) return (obj[is?.[0]] = value);
  else if (is.length == 0) return obj;
  else return indexobj(obj?.[is?.[0]], is.slice(1), value);
}

export function getTheme(props): typeof simpleTheme {
  return props.theme as unknown as typeof simpleTheme;
}

export function getColor(props) {
  if(!props.color){
    return
  }
  if (isColor(props.color)) {
    return props.color;
  }
  const theme =
    getTheme(props) || (currentTheme as unknown as typeof simpleTheme);
  const array = props?.color?.split?.('.') || [];

  // @ts-ignore
  return indexobj(
    theme?.colors,
    array?.length > 1 ? props.color : (props.color || 'primary') + '.400',
  );
}

function isColor(strColor) {
  const regHex = /^#([0-9a-f]{3}){1,2}$/i;
  const hexTest = regHex.test(strColor);
  const regRGB =
    /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/i;
  const rgbTest = regRGB.test(strColor);

  return hexTest || rgbTest;
}
