import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function CalenderIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="calendar"
        fill="none"
        stroke="#828282"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path
          d="M500 190v3"
          strokeWidth={1.5}
          transform="translate(-492 -188)"
        />
        <Path
          data-name="Vector"
          d="M508 190v3M495.5 197.09h17M513 196.5v8.5c0 3-1.5 5-5 5h-8c-3.5 0-5-2-5-5v-8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z"
          strokeWidth={1.5}
          transform="translate(-492 -188)"
        />
        <Path
          data-name="Vector"
          d="M507.695 201.7h.005M507.695 204.7h.005M503.996 201.7h.005M503.996 204.7h.005M500.295 201.7h.005M500.295 204.7h.005"
          strokeWidth={2}
          transform="translate(-492 -188)"
        />
      </G>
    </Svg>
  );
}

export default CalenderIcon;
