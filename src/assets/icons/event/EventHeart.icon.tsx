import * as React from 'react';
import Svg, {Path, G, SvgProps} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';

function EventHeartIcon({color, ...props}: any) {
  const finalColor = getColor({color, theme});

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 16 16"
      {...props}>
      <Path
        d="M8.372 12.85a1.421 1.421 0 01-.744 0C5.888 12.305 2 10.032 2 6.178A3.214 3.214 0 015.336 3.1 3.413 3.413 0 018 4.333 3.423 3.423 0 0110.664 3.1 3.214 3.214 0 0114 6.178c0 3.854-3.888 6.127-5.628 6.672z"
        fill={props?.isFavorite ? finalColor : 'none'}
        stroke={finalColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        data-name="heart"
      />
    </Svg>
  );
}

export default EventHeartIcon;
