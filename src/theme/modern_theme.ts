import {deepMergeObject, getTextColor} from './';
import {extendTheme} from 'native-base';
import {sharedTheme} from './shared_theme';

export const modernTheme = extendTheme(
  deepMergeObject(sharedTheme, {
    colors: {
      primary: {
        '100': '#dfdffb',
        '200': '#bec0f6',
        '300': '#9ea0f2',
        '400': '#7d81ed',
        '500': '#5D61E9',
        '600': '#4a4eba',
        '700': '#383a8c',
        '800': '#25275d',
        '900': '#13132f',
      },
      secondary: {
        '100': '#D7F0FF',
        '200': '#AFE1FF',
        '300': '#86D3FF',
        '400': '#5EC4FF',
        '500': '#36B5FF',
        '600': '#2B91CC',
        '700': '#206D99',
        '800': '#164866',
        '900': '#0B2433',
      },
      background: {
        '50': '#2F3166',
        '100': '#282A58',
        '200': '#22244B',
        '300': '#232446',
        '400': '#2d2e45',
        '500': '#161730',
        '600': '#121226',
        '700': '#06071E',
        '800': '#03041A',
        '900': '#01020F',
      },
      gray: {
        '50': '#18181b',
        '100': '#27272a',
        '200': '#3f3f46',
        '300': '#52525b',
        '400': '#71717a',
        '500': '#a1a1aa',
        '600': '#d4d4d8',
        '700': '#e4e4e7',
        '800': '#f4f4f5',
        '900': '#fafafa',
      },
    },

    components: {
      RelativeLayout: {
        colorScheme: {
          default: 'background.500',
        },
        color: {
          default: 'primary.500',
        },
        hover: {
          default: 'primary.400',
        },
      },
      Text: {
        baseStyle: {
          color: 'gray.100',
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
      Input: {
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
        baseStyle: {
          color: '#000000',
        },
      },
      TextArea: {
        borderRadius: {
          default: 17,
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
          default: 'primary.50',
        },
      },
      Icon: {
        color: {
          default: 'primary.400',
        },
      },
    },
  }),
);
