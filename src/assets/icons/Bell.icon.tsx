import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BellIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={21}
      viewBox="0 0 18 21"
      {...props}>
      <Path
        data-name="Path 29936"
        d="M21 19v1H3v-1l2-2v-6a6.99 6.99 0 015-6.71V4a2 2 0 014 0v.29A6.99 6.99 0 0119 11v6l2 2m-7 2a2 2 0 01-4 0"
        transform="translate(-3 -2)"
        fill={props.color ? props.color : '#ccc'}
      />
    </Svg>
  );
}

export default BellIcon;
