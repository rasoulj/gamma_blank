import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function CopyIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="copy"
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size ?? '24'}
      height={props?.size ?? '24'}
      viewBox="0 0 24 24">
      <G id="copy-2" data-name="copy" transform="translate(-682 -382)">
        <Path
          id="Vector"
          d="M14,4.9V9.1c0,3.5-1.4,4.9-4.9,4.9H4.9C1.4,14,0,12.6,0,9.1V4.9C0,1.4,1.4,0,4.9,0H9.1C12.6,0,14,1.4,14,4.9Z"
          transform="translate(684 390)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M14,4.9V9.1c0,3.5-1.4,4.9-4.9,4.9H8V10.9C8,7.4,6.6,6,3.1,6H0V4.9C0,1.4,1.4,0,4.9,0H9.1C12.6,0,14,1.4,14,4.9Z"
          transform="translate(690 384)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(682 382)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
