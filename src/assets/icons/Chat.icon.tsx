import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChatIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}>
      <Path
        data-name="Path 29967"
        d="M10 19a.818.818 0 01-.818-.818v-2.455H5.909a1.636 1.636 0 01-1.636-1.636V5.909a1.636 1.636 0 011.636-1.636h11.455A1.636 1.636 0 0119 5.909v8.182a1.636 1.636 0 01-1.636 1.636h-3.355l-3.027 3.035a.856.856 0 01-.573.237H10m-7.364-6.544H1V2.636A1.636 1.636 0 012.636 1h13.091v1.636H2.636z"
        transform="translate(-1 -1)"
        fill={props.color || '#52525b'}
      />
    </Svg>
  );
}

export default ChatIcon;
