import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function LocationOutlineIcon(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#006194';

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || props?.width || '24'}
      height={props?.size || props?.height || '24'}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
        stroke={color ?? '#FF8A65'}
        stroke-width="1.5"></Path>
      <Path
        d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z"
        stroke={color ?? '#FF8A65'}
        stroke-width="1.5"></Path>
    </Svg>
  );
}
