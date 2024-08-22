import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

function CategorySocial({color, ...props}) {
  const finalColor = getColor({color: color || '#1de9b6'});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        fill="none"
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        data-name="grammerly">
        <Path
          d="M767.07 320.951a10.008 10.008 0 01-.2 14.34 10.111 10.111 0 01-13.74 0 10 10 0 1113.94-14.34z"
          transform="translate(-748 -316)"
        />
        <Path
          data-name="Vector"
          d="M763.84 332.07a5.652 5.652 0 01-7.67 0"
          transform="translate(-748 -316)"
        />
      </G>
    </Svg>
  );
}

export default CategorySocial;
