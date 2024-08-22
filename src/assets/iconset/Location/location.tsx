import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function LocationIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#006194';

  return (
    <Svg
      {...props}
      id="location"
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '24'}
      height={props?.height || '24'}
      viewBox="0 0 24 24">
      <Path
        fill={getColor({color, theme})}
        d="M20.62 8.45A8.626 8.626 0 0 0 12 1.75h-.01a8.624 8.624 0 0 0-8.62 6.69C2.2 13.6 5.36 17.97 8.22 20.72a5.422 5.422 0 0 0 7.55 0c2.86-2.75 6.02-7.11 4.85-12.27ZM12 13.46a3.15 3.15 0 1 1 0-6.3 3.15 3.15 0 0 1 0 6.3Z"
      />
    </Svg>
  );
}
