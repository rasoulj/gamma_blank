import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function Desktop(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="monitor"
        fill="none"
        stroke="#1de9b6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M434.44 190h11.11c3.56 0 4.45.89 4.45 4.44v6.33c0 3.56-.89 4.44-4.44 4.44h-11.12c-3.55.01-4.44-.88-4.44-4.43v-6.34c0-3.55.89-4.44 4.44-4.44z"
          transform="translate(-428 -188)"
        />
        <Path
          data-name="Vector"
          d="M440 205.22V210M430 201h20M435.5 210h9"
          transform="translate(-428 -188)"
        />
      </G>
    </Svg>
  );
}

export default Desktop;
