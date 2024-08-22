import {deepMergeObject} from './';
import {extendTheme} from 'native-base';
import {sharedTheme} from './shared_theme';

export const friendlyTheme = extendTheme(
  deepMergeObject(sharedTheme, {
    colors: {
      primary: {
        '100': '#EED5E1',
        '200': '#DDABC2',
        '300': '#CB81A4',
        '400': '#BA5785',
        '500': '#A92D67',
        '600': '#872452',
        '700': '#651B3E',
        '800': '#441229',
        '900': '#220915',
      },
      secondary: {
        '100': '#CEE2F2',
        '200': '#9EC6E5',
        '300': '#6DA9D7',
        '400': '#3D8DCA',
        '500': '#0C70BD',
        '600': '#0A5A97',
        '700': '#074371',
        '800': '#052D4C',
        '900': '#021626',
      },
      background: {
        '50': '#FFFFFF',
        '100': '#FFFFFF',
        '200': '#FFFFFF',
        '300': '#F3FCFC',
        '400': '#F4FAFF',
        '500': '#F1F9FF',
        '600': '#DFECF5',
        '700': '#68BCB9',
        '800': '#419A96',
        '900': '#419A96',
      },
    },

    components: {
      Text: {
        baseStyle: {
          color: 'gray.800',
        },
      },
      Select: {
        borderRadius: {
          default: '3px',
          xs: '20px',
          sm: '20px',
          md: '25px',
          lg: '30px',
          full: '999em',
        },
      },
      Button: {
        borderRadius: {
          default: '3px',
          xs: '20px',
          sm: '20px',
          md: '25px',
          lg: '30px',
          full: '999em',
        },
      },
      Input: {
        borderRadius: {
          default: 3,
          xs: 20,
          sm: 20,
          md: 25,
          lg: 30,
          full: 60,
        },

        borderWidths: {
          default: 2,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
        },
      },
      TextArea: {
        borderRadius: {
          default: '3px',
          xs: '5px',
          sm: '5px',
          md: '5px',
          lg: '17px',
          full: '999em',
        },

        borderWidths: {
          default: 2,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
        },
      },

      UploadMedia: {
        borderRadius: {
          default: '3px',
          xs: '20px',
          sm: '20px',
          md: '25px',
          lg: '30px',
          full: '999em',
        },
        borderWidths: {
          default: 2,
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

    Icon: {
      color: {
        default: '#272343',
      },
    },
  }),
);
