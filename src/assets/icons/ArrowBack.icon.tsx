import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Pressable} from 'react-native';
import theme from '~/theme';
import {getColor} from '~/components/elemental/helper';
function ArrowBackIcon({style = {}, color, actions, ...props}: any) {
  const {height, width, left, right, top, bottom, position, ...rest} = style;

  const finalColor =
    color || theme?.components?.Icon?.color?.default || '#333333';

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
        width={12}
        height={20}
        viewBox="0 0 12 20"
        style={{
          ...rest,
        }}
        {...props}>
        <Path
          d="M20 23.633L12.583 16 20 8.35 17.717 6 8 16l9.717 10z"
          transform="translate(-8 -6)"
          fill={getColor({color: finalColor})}
        />
      </Svg>
    </Pressable>
  );
}

export default ArrowBackIcon;
