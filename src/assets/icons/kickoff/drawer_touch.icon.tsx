import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function DrawerTouchIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={85}
      height={7}
      viewBox="0 0 85 7"
      {...props}>
      <Rect
        data-name="Rectangle 22"
        width={85}
        height={7}
        rx={3.5}
        fill={props.color || '#e7e7e7'}
      />
    </Svg>
  );
}

export default DrawerTouchIcon;
