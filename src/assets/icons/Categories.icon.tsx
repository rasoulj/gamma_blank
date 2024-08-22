import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {Pressable} from 'react-native';
import theme from '~/theme';
function CategoriesIcon({style = {}, onClick, ...props}: any) {
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
        <G transform="translate(-273 -68) translate(273 68)">
          <Path
            data-name="Path 29965"
            d="M12.6 2.86c2.67 1.24 5.4 2.53 8.06 3.77.15.07.34.12.34.32s-.19.24-.34.31C18 8.5 15.3 9.77 12.62 11a1.3 1.3 0 01-1.24 0C8.69 9.76 6 8.5 3.32 7.25 3.18 7.19 3 7.14 3 6.94c0-.18.18-.23.31-.29C6 5.39 8.74 4.1 11.44 2.85a1.775 1.775 0 011.16.01M12 21.15a1.871 1.871 0 01-.62-.18c-2.69-1.24-5.38-2.5-8.05-3.75-.14-.07-.33-.11-.33-.32s.19-.24.34-.31c.44-.21.89-.42 1.33-.63a1.515 1.515 0 011.33.01q2.685 1.245 5.35 2.49a1.493 1.493 0 001.32 0q2.67-1.26 5.33-2.5a1.462 1.462 0 011.29-.01c.48.21.95.44 1.42.66a.818.818 0 01.2.12.206.206 0 010 .35 1.35 1.35 0 01-.26.15c-2.65 1.27-5.32 2.49-7.99 3.72a1.723 1.723 0 01-.66.2m0-4.98a3.243 3.243 0 01-.64-.17C8.68 14.74 6 13.5 3.34 12.24c-.14-.06-.34-.11-.34-.31s.2-.25.35-.32c.45-.22.9-.43 1.35-.64A1.453 1.453 0 016 11c1.78.82 3.58 1.66 5.38 2.5a1.442 1.442 0 001.25 0q2.7-1.275 5.41-2.53a1.442 1.442 0 011.25 0c.47.22.95.44 1.42.66a.93.93 0 01.19.11.221.221 0 01-.01.38 1.042 1.042 0 01-.18.1c-2.71 1.28-5.4 2.53-8.1 3.78a2.294 2.294 0 01-.61.17z"
            fill={color}
          />
          <Path
            data-name="Rectangle 3100"
            fill="rgba(0,0,0,0)"
            d="M0 0H24V24H0z"
          />
        </G>
      </Svg>
    </Pressable>
  );
}

export default CategoriesIcon;
