import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function BookIconSet(props: SvgProps & {solid?: boolean}) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  const moreProps: any = !props.solid
    ? {
        fill: 'none',
        stroke: getColor({theme, color}),
      }
    : {
        stroke: getColor({theme, color}),
        fill: 'white',
      };

  return (
    <Svg
      id="book"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="book-2" data-name="book" transform="translate(-556 -188)">
        <Path
          id="Vector"
          d="M20,14.078V2.008A1.97,1.97,0,0,0,17.83.018h-.06a18.851,18.851,0,0,0-7.07,2.37l-.17.11a1.108,1.108,0,0,1-1.06,0l-.25-.15A18.757,18.757,0,0,0,2.16.008,1.967,1.967,0,0,0,0,2v12.08a2.055,2.055,0,0,0,1.74,1.98l.29.04a25.693,25.693,0,0,1,7.44,2.44l.04.02a1.08,1.08,0,0,0,.96,0,25.461,25.461,0,0,1,7.46-2.46l.33-.04A2.055,2.055,0,0,0,20,14.078Z"
          transform="translate(558 190.662)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          {...moreProps}
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V15"
          transform="translate(568 193.49)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          {...moreProps}
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M2.25,0H0"
          transform="translate(561.5 196.49)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          {...moreProps}
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M3,0H0"
          transform="translate(561.5 199.49)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          {...moreProps}
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(580 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
