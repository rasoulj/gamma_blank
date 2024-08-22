import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function DotIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={4}
      height={4}
      viewBox="0 0 4 4"
      {...props}>
      <Path
        d="M2 0a2 2 0 102 2 2 2 0 00-2-2z"
        fill={props.color || '#006194'}
      />
    </Svg>
  );
}
