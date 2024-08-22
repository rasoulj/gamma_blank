import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

function CategoryFilm({color, ...props}) {
  const finalColor = getColor({color: color || '#1de9b6'});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="video"
        fill="none"
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M120.53 274.42h-6.32c-3.16 0-4.21-2.1-4.21-4.21v-8.42c0-3.16 1.05-4.21 4.21-4.21h6.32c3.16 0 4.21 1.05 4.21 4.21v8.42c0 3.16-1.06 4.21-4.21 4.21z"
          transform="translate(-108 -254)"
        />
        <Path
          data-name="Vector"
          d="M127.52 271.1l-2.78-1.95v-6.31l2.78-1.95c1.36-.95 2.48-.37 2.48 1.3v7.62c0 1.67-1.12 2.25-2.48 1.29zM121 263.5a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z"
          transform="translate(-108 -254)"
        />
      </G>
    </Svg>
  );
}

export default CategoryFilm;
