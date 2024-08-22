import * as React from 'react';
import {Pressable} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import {getColor, isDark} from '~/components/elemental';

const SvgComponent = props => {
  const finalColor = getColor({
    color: props?.color || 'secondary.500',
  });

  return props.large ? (
    <Pressable onPress={props?.onPress} style={{...props?.style}}>
      <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <G
          fill="none"
          stroke={finalColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}>
          <Path d="M7.13 18.31h8a5 5 0 0 0 0-10h-11" />
          <Path d="M6.43 10.81 3.87 8.25l2.56-2.56" data-name="Vector" />
        </G>
      </Svg>
    </Pressable>
  ) : (
    <Pressable onPress={props?.onPress} style={{...props?.style}}>
      <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} {...props}>
        <G
          data-name="undo"
          fill="none"
          stroke={finalColor}
          strokeLinecap="round"
          strokeLinejoin="round">
          <Path d="M4.753 12.207h5.333a3.334 3.334 0 0 0 0-6.667H2.753" />
          <Path data-name="Vector" d="M4.287 7.206 2.58 5.5l1.707-1.707" />
        </G>
      </Svg>
    </Pressable>
  );
};

export default SvgComponent;
