import * as React from 'react';
import Svg, {G, Rect, Path} from 'react-native-svg';
import {Pressable} from 'react-native';
import theme from '~/theme';
import {getColor} from '~/components/elemental/helper';

function ArrowRightIcon({style = {}, color, actions, ...props}: any) {
  const {height, width, left, right, top, bottom, position, ...rest} = style;

  const c = color || theme?.components?.Icon?.color?.default;

  return (
    <Pressable
      style={{
        height,
        width,
        left,
        right,
        top,
        bottom,
        position,
      }}
      onPress={props.onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={13.12}
        height={21}
        viewBox="0 0 13.12 21"
        style={{
          ...rest,
        }}
        {...props}>
        <G transform="translate(1)">
          <Rect
            width={12.12}
            height={20}
            rx={6.06}
            transform="translate(-1)"
            fill="none"
          />
          <Path
            data-name="Path 29480"
            d="M0 17.88L7.88 10 0 2.12 2.12 0l10 10-10 10z"
            fill={getColor({color: c, theme})}
            transform="translate(0 1)"
          />
        </G>
      </Svg>
    </Pressable>
  );
}

export default ArrowRightIcon;
