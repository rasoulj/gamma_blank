import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {getColor} from '~/utils/helper/theme.methods';
import theme from '~/theme';
function HomeIcon(props) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={13}
      viewBox="0 0 24 24"
      {...props}>
      <G fill="#fff" stroke={color}>
        <Path
          d="M7.02.823l-5.39 4.2A4.759 4.759 0 000 8.343v7.41a4.225 4.225 0 004.21 4.22h11.58a4.223 4.223 0 004.21-4.21v-7.28a4.723 4.723 0 00-1.8-3.45L12.02.7a4.487 4.487 0 00-5 .123z"
          transform="translate(-620 -188) translate(622 190.017)"
        />
        <Path
          data-name="Vector"
          d="M0 3V0"
          transform="translate(-620 -188) translate(632 202.99)"
        />
      </G>
    </Svg>
  );
}

export default HomeIcon;
