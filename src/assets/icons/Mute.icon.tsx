import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor, theme} from '~/components/elemental';

const MuteIcon = (props: SvgProps) => {
  const color =
    getColor({
      color: props.color || theme?.components?.Icon?.color?.default,
      theme,
    }) || '#1DE9B6';

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        data-name="microphone-slash"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}>
        <Path d="M16 6.3V6a4 4 0 0 0-8 0v5" />
        <Path
          data-name="Vector"
          d="M9.04 14.19A3.973 3.973 0 0 0 12 15.5a4 4 0 0 0 4-4V11"
        />
        <Path
          data-name="Vector"
          d="M6.78 16.95a7.656 7.656 0 0 0 12.87-5.6v-1.7M4.35 9.65v1.7a7.588 7.588 0 0 0 .6 2.98M20.07 2.84 3.93 18.99M11 3v3M12 19v3"
        />
      </G>
    </Svg>
  );
};

export default MuteIcon;
