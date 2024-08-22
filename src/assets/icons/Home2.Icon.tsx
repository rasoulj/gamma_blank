import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
function Home_2(props) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#1de9b6';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G fill="none" stroke={color} strokeLinejoin="round" strokeWidth={1.5}>
        <Path
          d="M302 210h20"
          strokeLinecap="round"
          transform="translate(-300 -188)"
        />
        <Path
          data-name="Vector"
          d="M302.95 210l.05-12.03a2.015 2.015 0 01.77-1.57l7-5.45a2.011 2.011 0 012.46 0l7 5.44a1.99 1.99 0 01.77 1.58V210"
          transform="translate(-300 -188)"
        />
        <Path
          data-name="Vector"
          d="M315.5 199h-7a1.5 1.5 0 00-1.5 1.5v9.5h10v-9.5a1.5 1.5 0 00-1.5-1.5zM310 204.25v1.5M310.5 195.5h3"
          strokeLinecap="round"
          transform="translate(-300 -188)"
        />
      </G>
    </Svg>
  );
}

export default Home_2;
