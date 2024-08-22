import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor, theme} from '~/components/elemental';

function DownloadIcon({color, ...props}) {
  const finalColor = getColor({
    color: color || props?.style?.color || theme?.components?.Icon?.color?.default || 'primary.400',
  });
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="Download"
        fill="none"
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M636.44 452.9c3.6.31 5.07 2.16 5.07 6.21v.13c0 4.47-1.79 6.26-6.26 6.26h-6.51c-4.47 0-6.26-1.79-6.26-6.26v-.13c0-4.02 1.45-5.87 4.99-6.2"
          transform="translate(-620 -444)"
        />
        <Path
          data-name="Vector"
          d="M632 446v12.88M635.35 456.65L632 460l-3.35-3.35"
          transform="translate(-620 -444)"
        />
      </G>
    </Svg>
  );
}

export default DownloadIcon;
