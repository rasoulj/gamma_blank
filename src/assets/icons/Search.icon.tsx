import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SearchIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.5}
      height={17.5}
      viewBox="0 0 17.5 17.5"
      {...props}>
      <Path
        data-name="Path 29941"
        d="M9.5 3a6.5 6.5 0 014.94 10.73l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.5 6.5 0 119.5 3m0 2A4.5 4.5 0 1014 9.5 4.481 4.481 0 009.5 5z"
        transform="translate(-3 -3)"
        fill={props.color || '#000'}
      />
    </Svg>
  );
}

export default SearchIcon;
