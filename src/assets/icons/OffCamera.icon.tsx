import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

const OffCameraIcon = (props: SvgProps) => {
  const finalColor = getColor({color: props?.color || '#fff'});
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G data-name="video-slash" fill={finalColor}>
        <Path
          d="M17.74 7.57a.81.81 0 0 1 0 .22c0-.07-.01-.14-.01-.21Z"
          opacity={0.4}
        />
        <Path
          data-name="Vector"
          d="M17.28 6.56 3.83 20.01A4.6 4.6 0 0 1 1.88 16V8c0-3.42 1.33-4.75 4.75-4.75h6c2.89 0 4.28.95 4.65 3.31Z"
        />
        <Path
          data-name="Vector"
          d="M21.4 2.23a.773.773 0 0 0-1.09 0L1.85 20.69a.773.773 0 0 0 0 1.09.81.81 0 0 0 .54.22.758.758 0 0 0 .54-.23L21.4 3.305a.761.761 0 0 0 0-1.075ZM22.38 8.38v7.24a2.274 2.274 0 0 1-1.1 2.21 1.864 1.864 0 0 1-.86.21 2.726 2.726 0 0 1-1.58-.58l-1.48-1.04c-.07 2.21-.77 3.47-2.36 4a7.116 7.116 0 0 1-2.38.33h-6a5.633 5.633 0 0 1-.71-.04L15 11.63l5.65-5.65a1.512 1.512 0 0 1 .63.19 2.274 2.274 0 0 1 1.1 2.21Z"
        />
      </G>
    </Svg>
  );
};

export default OffCameraIcon;
