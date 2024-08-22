import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function BicycleIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={13}
      viewBox="0 0 18 13"
      {...props}>
      <G transform="translate(-.4)" fill="#1de9b6">
        <Path
          data-name="Path 29594"
          d="M17 4.857A1.818 1.818 0 0015.236 3h-2.648v1.857h2.647v2.461l-3.071 4.039H9.059V6.714h-3.53A3.624 3.624 0 002 10.429v2.786h1.765A2.715 2.715 0 006.412 16a2.715 2.715 0 002.647-2.786h3.953L17 7.968zM6.412 14.143a.909.909 0 01-.882-.929h1.764a.909.909 0 01-.882.929z"
          transform="translate(-1.6 -3)"
        />
        <Path
          data-name="Path 29595"
          d="M19 11a3 3 0 103 3 3 3 0 00-3-3zm0 4a1 1 0 111-1 1 1 0 01-1 1z"
          transform="translate(-3.6 -4)"
        />
        <Path
          data-name="Rectangle 2798"
          transform="translate(3.4 1)"
          d="M0 0H5V2H0z"
        />
      </G>
    </Svg>
  );
}

export default BicycleIcon;
