import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Pressable, TouchableWithoutFeedback} from 'react-native';
import theme from '~/theme';
import {getColor} from '~/components/elemental/helper';

const NArrowBackIcon = ({style = {}, color, actions, ...props}: any) => {
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
      onPress={() => props?.onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={8.908}
        height={17.961}
        {...rest}>
        <Path
          d="m7.85 16.901-6.523-6.52a1.986 1.986 0 0 1 0-2.8l6.523-6.52"
          fill="none"
          stroke={getColor({color: finalColor, theme})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </Svg>
    </Pressable>
  );
};
export default NArrowBackIcon;
