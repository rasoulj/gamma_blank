import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function FlashStarIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#FFC107';

  return (
    <Svg
      width={55}
      height={55}
      viewBox="0 0 55 55"
      fill={'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M41.044 24.567h-7.072v-16.5c0-3.85-2.086-4.63-4.63-1.742L27.51 8.411 11.995 26.057c-2.132 2.406-1.238 4.377 1.97 4.377h7.082v16.5c0 3.85 2.085 4.629 4.629 1.741l1.833-2.085 15.515-17.646c2.122-2.406 1.228-4.377-1.98-4.377z"
        fill={getColor({color: color})}
      />
      <Path
        transform="rotate(-45 36.953 12.311)"
        fill={getColor({color: color})}
        d="M36.9531 12.311H41.05932V16.41722H36.9531z"
      />
      <Path
        transform="rotate(-45 40.39 7.11)"
        fill={getColor({color: color})}
        d="M40.3906 7.10938H43.05138V9.77016H40.3906z"
      />
      <Path
        transform="rotate(-45 38.075 3.075)"
        fill={getColor({color: color})}
        d="M38.0752 3.0752H39.99316V4.9931600000000005H38.0752z"
      />
    </Svg>
  );
}
