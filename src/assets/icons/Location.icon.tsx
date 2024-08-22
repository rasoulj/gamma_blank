import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function EventLocationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={17}
      viewBox="0 0 17 17"
      {...props}>
      <G
        data-name="location"
        fill="none"
        stroke={props.color || '#006194'}
        strokeWidth={1}>
        <Path d="M10.71 7.303a2.21 2.21 0 11-2.21-2.21 2.21 2.21 0 012.21 2.21z" />
        <Path
          data-name="Vector"
          d="M2.564 6.017c1.4-6.134 10.483-6.127 11.872.007.815 3.6-1.424 6.644-3.386 8.528a3.679 3.679 0 01-5.107 0c-1.951-1.887-4.194-4.935-3.379-8.535z"
        />
      </G>
    </Svg>
  );
}

export default EventLocationIcon;
