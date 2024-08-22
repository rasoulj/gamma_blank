import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function Brush(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="brush"
        fill="none"
        stroke="#1de9b6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path d="M9.5 19.5V18h-5a1.955 1.955 0 01-1.41-.59A1.955 1.955 0 012.5 16a2.014 2.014 0 011.81-1.99A1.148 1.148 0 014.5 14h15a1.148 1.148 0 01.19.01 1.9 1.9 0 011.22.58 1.976 1.976 0 01.58 1.59 2.069 2.069 0 01-2.1 1.82H14.5v1.5a2.5 2.5 0 01-5 0z" />
        <Path
          data-name="Vector"
          d="M20.17 5.3l-.48 8.71a1.148 1.148 0 00-.19-.01h-15a1.148 1.148 0 00-.19.01L3.83 5.3A3 3 0 016.814 2h10.38a3 3 0 012.976 3.3zM7.99 2v5M12 2v2"
        />
      </G>
    </Svg>
  );
}

export default Brush;
