import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ColorfulHeart(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      marginTop={7}
      height={40}
      viewBox="0 0 15.975 13.282"
      {...props}>
      <Path
        d="M7.988 13.282l-1.158-.956C2.716 8.946 0 6.717 0 3.981A4.161 4.161 0 014.393 0a5 5 0 013.595 1.513A5 5 0 0111.582 0a4.161 4.161 0 014.393 3.981c0 2.736-2.716 4.965-6.83 8.353z"
        fill="#1de9b6"
      />
    </Svg>
  );
}

export default ColorfulHeart;
