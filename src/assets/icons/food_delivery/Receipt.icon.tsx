import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/components/elemental/helper';
function ReceiptIcon(props) {
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
      fill={'none'}
      {...props}>
      <Path
        d="M6 4v2.42A2.4 2.4 0 013.42 9H0V2.01A2.019 2.019 0 012.02 0 3.995 3.995 0 016 4z"
        transform="translate(16 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        stroke={getColor({color, theme})}
      />
      <Path
        data-name="Vector"
        d="M0 5v14a1 1 0 001.6.8l1.71-1.28a1.007 1.007 0 011.32.1l1.66 1.67a1.008 1.008 0 001.42 0l1.68-1.68a.991.991 0 011.3-.09l1.71 1.28A1 1 0 0014 19V2a2.006 2.006 0 012-2H4C1 0 0 1.79 0 4z"
        transform="translate(2 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        stroke={getColor({color, theme})}
      />
      <Path
        data-name="Vector"
        d="M0 0h3"
        transform="translate(9 13.01)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        stroke={getColor({color, theme})}
      />
      <Path
        data-name="Vector"
        d="M0 0h3"
        transform="translate(9 9.01)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        stroke={getColor({color, theme})}
      />
      <Path
        data-name="Vector"
        d="M0 0h.009"
        transform="translate(5.996 13)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke={getColor({color, theme})}
      />
      <Path
        data-name="Vector"
        d="M0 0h.009"
        transform="translate(5.996 9)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke={getColor({color, theme})}
      />
    </Svg>
  );
}

export default ReceiptIcon;
