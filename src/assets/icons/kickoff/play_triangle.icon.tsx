import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PlayTriangleIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24.72}
      height={32.96}
      viewBox="0 0 24.72 32.96"
      {...props}>
      <Path
        data-name="Path 67"
        d="M15 12l24.72 16.48L15 44.96z"
        transform="translate(-15 -12)"
        fill={props.color || '#fff'}
      />
    </Svg>
  );
}

export default PlayTriangleIcon;
