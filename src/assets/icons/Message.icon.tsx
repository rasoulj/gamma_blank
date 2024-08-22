import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {Pressable, View} from 'react-native';
import theme from '~/theme';
function MessageIcon({style = {}, onClick, ...props}) {
  const {height, width, left, right, top, bottom, position, ...rest} = style;
  const color = props.color || theme?.Icon?.color?.default;
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
      onPress={onClick}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        style={{
          ...rest,
        }}
        {...props}>
        <G transform="translate(-279 -68) translate(279 68)">
          <Path
            data-name="Path 29967"
            d="M12 23a1 1 0 01-1-1v-3H7a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-4.1l-3.7 3.71a1.046 1.046 0 01-.7.29H12m-9-8H1V3a2 2 0 012-2h16v2H3z"
            fill={color}
          />
          <Path
            data-name="Rectangle 3102"
            fill="rgba(0,0,0,0)"
            d="M0 0H24V24H0z"
          />
        </G>
      </Svg>
    </Pressable>
  );
}

export default MessageIcon;
