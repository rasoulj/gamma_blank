import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/components/elemental/helper';
function RoundedOutlineShoppingCardIcon(props) {
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.Icon?.color?.default ||
    '#ccc';

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="shopping-cart"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          fill="none"
          stroke={getColor({color, theme})}
          d="M0 0h1.74a1.85 1.85 0 011.84 2l-.83 9.96a2.8 2.8 0 002.79 3.03h10.65A2.877 2.877 0 0019 12.38l.54-7.5a2.773 2.773 0 00-2.81-3.01H3.82"
          transform="translate(-622 -188) translate(624 190)"
        />
        <Path
          fill={getColor({color, theme})}
          data-name="Vector"
          d="M2.5 1.25A1.25 1.25 0 111.25 0 1.25 1.25 0 012.5 1.25z"
          transform="translate(-622 -188) translate(637 207.5)"
        />
        <Path
          fill={getColor({color, theme})}
          data-name="Vector"
          d="M2.5 1.25A1.25 1.25 0 111.25 0 1.25 1.25 0 012.5 1.25z"
          transform="translate(-622 -188) translate(629 207.5)"
        />
        <Path
          fill={getColor({color, theme})}
          data-name="Vector"
          d="M0 0h12"
          transform="translate(-622 -188) translate(631 196)"
        />
      </G>
    </Svg>
  );
}

export default RoundedOutlineShoppingCardIcon;
