import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

const VoiceIcon = (props: SvgProps) => {
  const finalColor = getColor({color: props?.color || '#fff'});
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        fill="none"
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}>
        <Path d="M12 15.5a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v5.5a4 4 0 0 0 4 4Z" />
        <Path
          data-name="Vector"
          d="M4.35 9.65v1.7a7.65 7.65 0 1 0 15.3 0v-1.7M10.61 6.43a4.027 4.027 0 0 1 2.78 0M11.2 8.55a3.138 3.138 0 0 1 1.61 0M12 19v3"
        />
      </G>
    </Svg>
  );
};

export default VoiceIcon;
