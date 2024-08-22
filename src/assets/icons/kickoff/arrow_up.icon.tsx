import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function ArrowUpIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M191.92 267.053l-6.52-6.523a1.986 1.986 0 00-2.8 0l-6.52 6.523"
        fill="none"
        stroke="#292d32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        transform="translate(-172 -252)"
        data-name="arrow-up"
      />
    </Svg>
  );
}

export default ArrowUpIcon;
