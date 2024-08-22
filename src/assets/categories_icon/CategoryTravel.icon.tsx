import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

function CategoryTravel({color, ...props}) {
  const finalColor = getColor({color: color || '#1de9b6'});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M124.03 209.69l2.33-1.96a1.023 1.023 0 011.28 0l2.33 1.96a1.008 1.008 0 001.4-.58l.44-1.33a1.106 1.106 0 00-.24-1.03l-2.27-2.28a1.112 1.112 0 01-.3-.71v-2.85a.466.466 0 01.7-.46l4.91 2.12a.931.931 0 001.4-.92v-1.29a2 2 0 00-1.12-1.7l-5.59-2.41a.554.554 0 01-.3-.46v-3a3.065 3.065 0 00-1.53-2.48 1.059 1.059 0 00-.95 0 3.081 3.081 0 00-1.53 2.487v3a.554.554 0 01-.3.46l-5.58 2.412a1.97 1.97 0 00-1.12 1.69v1.29a.931.931 0 001.4.92l4.91-2.12a.465.465 0 01.7.46v2.85a1.156 1.156 0 01-.29.71l-2.27 2.28a1.1 1.1 0 00-.24 1.03l.44 1.33a.983.983 0 001.39.581z"
        fill="none"
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        transform="translate(-115 -188)"
        data-name="airplane"
      />
    </Svg>
  );
}

export default CategoryTravel;
