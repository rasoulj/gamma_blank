import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

function CategoryEducation({color, ...props}) {
  const finalColor = getColor({color: color || '#1de9b6'});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="teacher"
        fill="none"
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M182.05 254.53l-6.02 3.93a3.186 3.186 0 000 5.34l6.02 3.93a3.91 3.91 0 003.94 0l5.993-3.931a3.186 3.186 0 000-5.33l-5.993-3.929a3.887 3.887 0 00-3.94-.01z"
          transform="translate(-172 -252)"
        />
        <Path
          data-name="Vector"
          d="M177.63 265.08l-.01 4.69a3.411 3.411 0 002.18 3.03l3.19 1.06a3.846 3.846 0 002.02 0l3.19-1.06a3.411 3.411 0 002.18-3.03v-4.64M193.4 267v-6"
          transform="translate(-172 -252)"
        />
      </G>
    </Svg>
  );
}

export default CategoryEducation;
