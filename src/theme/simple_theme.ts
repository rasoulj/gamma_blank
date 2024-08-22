import {deepMergeObject, getTextColor} from './';
import {extendTheme} from 'native-base';
import {sharedTheme} from './shared_theme';
import {getColor} from '~/utils/helper/theme.methods';

export const simpleTheme = extendTheme(
  deepMergeObject(sharedTheme, {
    colors: {
      primary: {
        '100': '#d8fff5',
        '200': '#9DCCCC',
        '300': '#6CB3B3',
        '400': '#3B9999',
        '500': '#0A8080',
        '600': '#086666',
        '700': '#064D4D',
        '800': '#043333',
        '900': '#021A1A',
      },
      secondary: {
        '100': '#CCDFEA',
        '200': '#99C0D4',
        '300': '#66A0BF',
        '400': '#3381A9',
        '500': '#006194',
        '600': '#004E76',
        '700': '#003A59',
        '800': '#00273B',
        '900': '#00131E',
      },
      background: {
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#ffffff',
        '500': '#ffffff',
        '600': '#f9f9f9',
        '700': '#e6e6e6',
        '800': '#44403C',
        '900': '#1C1917',
      },
    },
    components: {
      Text: {
        baseStyle: {
          color: 'gray.800',
        },
      },
      Input: {
        baseStyle: {
          borderWidth: 1,
          borderColor: '#B5B5B5',
          borderRadius: 'full',
          color: '#B5B5B5',
        },
        defaultProps: {
          bgColor: '#FFFFFF',
          placeholderTextColor: '#65656D',
        },
        sizes: {
          '2xl': {
            px: 7,
            py: 3,
          },
          lg: {
            px: 6,
            py: 2.5,
          },
          md: {
            px: 5,
            py: 2,
          },
          sm: {
            px: 4,
            py: 2,
          },
          xs: {
            px: 3,
            py: 1,
          },
        },
      },
      Select: {
        borderRadius: {
          default: 'full',
          xs: 20,
          sm: 20,
          md: 25,
          lg: 30,
          full: 100,
        },
      },
      Button: {
        borderRadius: {
          default: 'full',
          xs: 20,
          sm: 20,
          md: 25,
          lg: 30,
          full: 100,
        },
      },
      TextArea: {
        borderRadius: {
          default: 14,
          xs: 5,
          sm: 5,
          md: 5,
          lg: 17,
          full: 100,
        },

        borderWidths: {
          default: 1,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
        },
      },
      UploadMedia: {
        borderRadius: {
          default: 'full',
          xs: 20,
          sm: 20,
          md: 25,
          lg: 30,
          full: 100,
        },
        borderWidths: {
          default: 1,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
        },
        iconColor: {
          default: 'primary.800',
        },
      },
    },
  }),
);
