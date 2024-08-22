import theme from 'src/theme';

export function getColor(props) {
  if (isColor(props?.color)) {
    return props?.color;
  }

  const array = props?.color?.split?.('.') || [];

  // @ts-ignore
  return indexobj(theme?.colors, array?.length > 1 ? props?.color : '');
}

function isColor(strColor) {
  const withoutAlpha = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(strColor);

  const regex = /^#([a-fA-F0-9]{8}|[a-fA-F0-9]{4})$/;
  return regex.test(strColor) || withoutAlpha;
}

export function indexobj(obj, is, value) {
  if (typeof is == 'string') return indexobj(obj, is.split('.'), value);
  else if (is?.length == 1 && value !== undefined)
    return (obj[is?.[0]] = value);
  else if (is?.length == 0) return obj;
  else return indexobj(obj?.[is?.[0]], is.slice(1), value);
}
