import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function EventPlusIcon(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25.999}
      height={25.999}
      viewBox="0 0 25.999 25.999"
      {...props}>
      <G data-name="Light Theme / Add-circle">
        <Path
          data-name="Path 348"
          d="M29 16A13 13 0 1116 3a13 13 0 0113 13z"
          transform="translate(4.381 -2.49) translate(-7.381 -.51)"
          fill="#fff"
        />
        <Path
          data-name="Path 349"
          d="M18 12v10.4"
          transform="translate(4.381 -2.49) translate(-9.381 -1.71)"
          fill="#1de9b6"
          stroke="#1de9b6"
        />
        <Path
          data-name="Path 350"
          d="M12 18h10.4"
          transform="translate(4.381 -2.49) translate(-8.581 -2.51)"
          fill="#1de9b6"
          stroke="#1de9b6"
        />
      </G>
    </Svg>
  );
}

export default EventPlusIcon;
