import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MenuIcon(props) {
  return (
    <Svg
      height="32px"
      viewBox="0 0 32 32"
      width="32px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 32 32"
      {...props}>
      <Path
        fill={props.color || '#000'}
        d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zm24 4H4a2 2 0 000 4h24a2 2 0 000-4zm0 8H4a2 2 0 000 4h24a2 2 0 000-4z"
      />
    </Svg>
  );
}

export default MenuIcon;
