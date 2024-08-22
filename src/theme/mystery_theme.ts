import {deepMergeObject} from './';
import {extendTheme} from 'native-base';
import {sharedTheme} from './shared_theme';

export const mysteryTheme = extendTheme(
  deepMergeObject(sharedTheme, {
    colors: {
      primary: {
        '100': '#dffed9',
        '200': '#bffdb3',
        '300': '#a0fb8d',
        '400': '#80fa67',
        '500': '#60F941',
        '600': '#2DC60E',
        '700': '#22950A',
        '800': '#166307',
        '900': '#0B3203',
      },
      secondary: {
        '100': '#FFFFFF',
        '200': '#FFFFFF',
        '300': '#FFFFFF',
        '400': '#FFFFFF',
        '500': '#FFFFFF',
        '600': '#cccccc',
        '700': '#999999',
        '800': '#666666	',
        '900': '#333333',
      },
      background: {
        '50': '#FFFFFF',
        '100': '#FFFFFF',
        '200': '#FFFFFF',
        '300': '#F9F6F4',
        '400': '#4E4E4E',
        '500': '#3A3A3A',
        '600': '#343434',
        '700': '#D4BEA6',
        '800': '#B79C7F',
        '900': '#9B7C5B',
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
      Text: {
        baseStyle: {
          color: 'gray.100',
        },
      },
      Select: {
        borderRadius: {
          default: 'full',
          xs: '0',
          sm: '0',
          md: '0',
          lg: '0',
          full: '0',
        },
      },
      Button: {
        borderRadius: {
          default: '0',
          xs: '0',
          sm: '0',
          md: '0',
          lg: '0',
          full: '0',
        },

        colorScheme: {
          default: 'primary.900',
        },
      },
      Input: {
        borderRadius: {
          default: 'full',
          xs: '20px',
          sm: '20px',
          md: '25px',
          lg: '30px',
          full: '0',
        },

        borderWidths: {
          default: 1,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
        },
      },
      TextArea: {
        borderRadius: {
          default: '0',
          xs: '0',
          sm: '0',
          md: '0',
          lg: '0',
          full: '0',
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
          xs: '0',
          sm: '0',
          md: '0',
          lg: '0',
          full: '0',
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

      Calendar: {
        colorScheme: {
          default: 'primary.50',
        },
      },
    },

    Icon: {
      color: {
        default: 'primary.900',
      },
    },
  }),
);
