import {simpleTheme} from './simple_theme';
import {modernTheme} from './modern_theme';
import {mysteryTheme} from './mystery_theme';
import {friendlyTheme} from './friendly_theme';
import {colors, themeName} from './data';
import {getColor} from '~/components/elemental';

const themes = {
  simple: simpleTheme,
  modern: modernTheme,
  mystery: mysteryTheme,
  friendly: friendlyTheme,
};
const theme = themes[themeName || 'simple'];
export default deepMergeObject(theme ?? themes.simple, {
  colors: colors || {},
  components: {
    Button: {
      variants: {
        solid: ({colorScheme}) => {
          return {
            backgroundColor: 'primary.500',
            _text: {
              color: getTextColor(theme.colors.primary['500']),
              fontWeight: 'bold',
            },
            borderRadius: 'full',
          };
        },
        outline: ({colorScheme}) => {
          return {
            bgColor: 'transparent',
            _text: {color: 'primary.500'},
            borderRadius: 'full',
            borderWidth: 1,
            borderColor: 'primary.500',
          };
        },
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
  },
});

export function deepMergeObject(...objects: object[]) {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  function deepMergeInner(target: object, source: object) {
    Object.keys(source).forEach((key: string) => {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = deepMergeInner(
          Object.assign({}, targetValue),
          sourceValue,
        );
      } else {
        target[key] = sourceValue;
      }
    });

    return target;
  }

  if (objects.length < 2) {
    throw new Error(
      'deepMerge: this function expects at least 2 objects to be provided',
    );
  }

  if (objects.some(object => !isObject(object))) {
    throw new Error('deepMerge: all values should be of type "object"');
  }

  const target = objects.shift();
  let source: object;

  while ((source = objects.shift())) {
    deepMergeInner(target, source);
  }

  return target;
}

function getRGB(c) {
  return parseInt(c, 16) || c;
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor?.substr(1, 2)) +
    0.7152 * getsRGB(hexColor?.substr(3, 2)) +
    0.0722 * getsRGB(hexColor?.substr(-2))
  );
}

function getContrast(f, b) {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

export function getTextColor(bgColor) {
  const removedAlpha = removeAlpha(bgColor);
  const whiteContrast = getContrast(removedAlpha, '#ffffff');
  const blackContrast = getContrast(removedAlpha, '#000000');

  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

export function removeAlpha(hexColor) {
  if (/^#([A-Fa-f0-9]{8})$/.test(hexColor)) {
    return `#${hexColor?.substring(1, 7)}`;
  }
  if (/^#([A-Fa-f0-9]{4})$/.test(hexColor)) {
    return `#${hexColor?.substring(1, 4)}`;
  }
  return hexColor;
}

type Colors = {
  trueColor: string;
  falseColor: string;
};

export function applyColorTo(themeArray, {falseColor, trueColor}: Colors) {
  return themeArray?.includes(themeName) ? trueColor : falseColor;
}
