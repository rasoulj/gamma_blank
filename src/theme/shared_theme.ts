import { applyColorTo } from './';

export const sharedTheme = {
  colors: {
    gray: {
      '50': '#FAFAFA',
      '100': '#f4f4f5',
      '200': '#e4e4e7',
      '300': '#d4d4d8',
      '400': '#a1a1aa',
      '500': '#71717a',
      '600': '#52525b',
      '700': '#3f3f46',
      '800': '#27272a',
      '900': '#18181b',
    },
    rate: {
      '100': '#FFC107',
    },
    link: {
      '100': '#0086df',
    },
  },
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins',
      },
      200: {
        normal: 'Poppins',
      },
      300: {
        normal: 'Poppins',
      },
      400: {
        normal: 'Poppins',
      },
      500: {
        normal: 'Poppins',
      },
      600: {
        normal: 'Poppins',
      },
    },
    Arial: {
      100: {
        normal: 'Arial',
      },
      200: {
        normal: 'Arial',
      },
      300: {
        normal: 'Arial',
      },
      400: {
        normal: 'Arial',
      },
      500: {
        normal: 'Arial',
      },
      600: {
        normal: 'Arial',
      },
    },
  },

  components: {
    Text: {
      baseStyle: {
        color: '#fff',
      },
    },
    Carousel: {
      colorScheme: {
        default: 'primary.400',
      },
    },
    Button: {
      colorScheme: {
        default: 'primary.500',
      },
    },
    Switch: {
      colorScheme: {
        inactive: {
          thumb: '#E4E4E7',
          track: '#A1A1AA',
        },
      },
      thumbShadow: {
        default: '0px 1px 6px #00000050',
      },
    },
    Input: {
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
      colorScheme: {
        default: 'background.400',
      },
      borderWidths: {
        default: 1,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
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
    TextArea: {
      colorScheme: {
        default: 'background.400',
      },
    },
    UploadMedia: {
      colorScheme: {
        default: 'background.400',
      },
    },
    TabNavigation: {
      colorScheme: {
        default: 'background.400',
      },
      color: {
        // default: 'trueGray.300'
        default: 'primary.200',
      },
      hover: {
        default: 'primary.400',
      },
    },
    Tabs: {
      borderColor: {
        default: 'primary.400',
      },
    },
    // RelativeLayout: {
    //     colorScheme: {
    //         default: 'background.400'
    //     }
    // },
    Card: {
      colorScheme: {
        default: 'background.300',
      },
    },
    Screen: {
      colorScheme: {
        default: 'background.400',
      },
    },
    Divider: {
      colorScheme: {
        default: 'primary.400',
      },
    },
    Chart: {
      colorScheme: {
        default: 'primary.400',
      },
    },
    Accordion: {
      colorScheme: {
        default: 'background.100',
      },
    },
    // Calendar: {
    //     colorScheme: {
    //         default: 'secondary.100'
    //     },
    //     hover: {
    //         default: 'primary.500'
    //     }
    // }
  },
  shadows: {
    default: 'none',
  },
};
