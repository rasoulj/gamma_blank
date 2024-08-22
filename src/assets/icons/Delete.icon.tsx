import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function DeleteIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}>
      <Path
        data-name="Path 29962"
        d="M17 4v2H3V4h3.5l1-1h5l1 1H17M4 19V7h12v12a2.006 2.006 0 01-2 2H6a2.006 2.006 0 01-2-2m15-4h2v2h-2v-2m0-8h2v6h-2z"
        transform="translate(-3 -3)"
        fill="red"
      />
    </Svg>
  );
}
