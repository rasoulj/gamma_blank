import * as React from 'react';
import Svg, {Defs, ClipPath, Path, G, Circle} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';
function ProfileIcon(props: any) {
  const color =
    props.color ||
    getColor({color: theme?.components?.Icon?.color?.default, theme}) ||
    '#ccc';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      viewBox="0 0 19 19"
      {...props}>
      <Defs>
        <ClipPath id="a">
          <Path data-name="Rectangle 664" fill="#fff" d="M0 0H19V19H0z" />
        </ClipPath>
      </Defs>
      <G
        data-name="Profile"
        clipPath="url(#a)"
        fill="none"
        stroke="#1de9b6"
        strokeWidth={1}>
        <Path
          data-name="Path 3435"
          d="M3.098 13.942a3.1 3.1 0 013.1-3.1h6.2a3.1 3.1 0 013.1 3.1h0a1.549 1.549 0 01-1.549 1.549H4.647a1.549 1.549 0 01-1.549-1.549z"
          strokeLinejoin="round"
        />
        <Circle
          data-name="Ellipse 368"
          cx={2.5}
          cy={2.5}
          r={2.5}
          transform="translate(7 3)"
        />
      </G>
    </Svg>
  );
}

export default ProfileIcon;
