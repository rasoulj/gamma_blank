import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
function MotorbikeIcon({color: iconColor, ...props}) {
  const color =
    iconColor ||
    props?.style?.color ||
    theme?.components?.Icon?.color?.default ||
    '#ccc';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18.4}
      height={13}
      viewBox="0 0 18.4 13"
      {...props}>
      <Path
        data-name="Path 29594"
        d="M17.4 4.857A1.84 1.84 0 0015.588 3h-2.717v1.857h2.718v2.461l-3.152 4.039h-3.19V6.714H5.624A3.669 3.669 0 002 10.429v2.786h1.812a2.718 2.718 0 105.435 0h4.058L17.4 7.968zM6.529 14.143a.92.92 0 01-.906-.929h1.812a.92.92 0 01-.906.929z"
        transform="translate(-2 -3)"
        fill={getColor({color, theme})}
      />
      <Path
        data-name="Path 29595"
        d="M19 11a3 3 0 103 3 3 3 0 00-3-3zm0 4a1 1 0 111-1 1 1 0 01-1 1z"
        transform="translate(-3.6 -4)"
        fill={getColor({color, theme})}
      />
      <Path
        data-name="Rectangle 2798"
        transform="translate(3 1)"
        d="M0 0H5V2H0z"
        fill={getColor({color, theme})}
      />
    </Svg>
  );
}

export default MotorbikeIcon;
