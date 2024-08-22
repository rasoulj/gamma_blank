import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
import {Pressable} from '~/components/elemental';
import {getColor} from '~/components/elemental';
function CommentsIcon({color, ...props}: any) {
  const c = getColor({
    color: color || theme?.components?.Icon?.color?.default || 'gray.400',
  });
  return (
    <Pressable onPress={props?.onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={14}
        viewBox="0 0 16 14"
        {...props}>
        <Path
          data-name="Path 29935"
          d="M10 3C5.6 3 2 5.784 2 9.222A5.562 5.562 0 004.2 13.5c0 .467-.336 1.688-2.2 3.5a8.973 8.973 0 005.176-1.944 10.478 10.478 0 002.824.388c4.4 0 8-2.784 8-6.222S14.4 3 10 3m0 10.889c-3.536 0-6.4-2.092-6.4-4.667S6.464 4.556 10 4.556s6.4 2.092 6.4 4.667-2.864 4.666-6.4 4.666z"
          transform="translate(-2 -3)"
          fill={c}
        />
      </Svg>
    </Pressable>
  );
}

export default CommentsIcon;
