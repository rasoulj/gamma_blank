import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

function CategoryMusic({color, ...props}) {
  const finalColor = getColor({color: color || '#1de9b6'});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="music"
        fill="none"
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M757.4 336.88a3.12 3.12 0 11-3.12-3.12 3.12 3.12 0 013.12 3.12z"
          transform="translate(-748 -318)"
        />
        <Path
          data-name="Vector"
          d="M768.84 334.8v-12.2c0-2.6-1.63-2.96-3.28-2.51l-6.24 1.7a2.491 2.491 0 00-1.92 2.51v12.57"
          transform="translate(-748 -318)"
        />
        <Path
          data-name="Vector"
          d="M768.84 334.8a3.12 3.12 0 11-3.12-3.12 3.12 3.12 0 013.12 3.12zM757.4 327.52l11.44-3.12"
          transform="translate(-748 -318)"
        />
      </G>
    </Svg>
  );
}

export default CategoryMusic;
