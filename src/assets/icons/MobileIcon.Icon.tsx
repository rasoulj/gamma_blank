import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function MobileIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="mobile"
        fill="none"
        stroke="#1de9b6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M128 387v10c0 4-1 5-5 5h-6c-4 0-5-1-5-5v-10c0-4 1-5 5-5h6c4 0 5 1 5 5z"
          transform="translate(-108 -380)"
        />
        <Path
          data-name="Vector"
          d="M122 385.5h-4M121.55 397.55A1.55 1.55 0 11120 396a1.55 1.55 0 011.55 1.55z"
          transform="translate(-108 -380)"
        />
      </G>
    </Svg>
  );
}

export default MobileIcon;
