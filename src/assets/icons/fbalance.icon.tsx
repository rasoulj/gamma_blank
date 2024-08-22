import Svg, {Path} from 'react-native-svg';
import React from 'react';

export default function FBalance(props) {
  return (
    <Svg
      id="Sort"
      xmlns="http://www.w3.org/2000/svg"
      width="21.437"
      height="21"
      viewBox="0 0 21.437 21"
      width={props.size}
      height={props.size}
      {...props}>
      <Path
        id="Sort-2"
        data-name="Sort"
        d="M2.348,8.109a1.293,1.293,0,0,0-.07,1.683.986.986,0,0,0,1.5.079L6.3,7.306v15.5A1.133,1.133,0,0,0,7.359,24a1.133,1.133,0,0,0,1.064-1.191V7.306l2.515,2.564a.986.986,0,0,0,1.5-.079,1.293,1.293,0,0,0-.07-1.683L7.359,3ZM23.089,18.891a1.293,1.293,0,0,0,.07-1.683.986.986,0,0,0-1.5-.079l-2.515,2.564V4.191a1.071,1.071,0,1,0-2.128,0v15.5L14.5,17.13a.986.986,0,0,0-1.5.079,1.293,1.293,0,0,0,.07,1.683L18.077,24Z"
        transform="translate(-2 -3)"
        fill="#333"
        fillRule="evenodd"
      />
    </Svg>
  );
}
