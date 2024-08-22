import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function VideoPickerIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G transform="translate(-3.708 -3.708)">
        <Path
          data-name="Path 29957"
          d="M20.913 11.758V7.28A1.28 1.28 0 0019.634 6H4.28A1.28 1.28 0 003 7.28v12.8a1.28 1.28 0 001.28 1.279h15.354a1.28 1.28 0 001.28-1.279V15.6l5.118 5.118V6.64l-5.118 5.118m-3.839 3.2h-3.839V18.8h-2.559v-3.843H6.839V12.4h3.839V8.559h2.559V12.4h3.839z"
          transform="translate(.839 1.677)"
          fill="#626262"
        />
        <Path
          data-name="Rectangle 3086"
          transform="translate(3.708 3.708)"
          fill="rgba(0,0,0,0)"
          d="M0 0H24V24H0z"
        />
      </G>
    </Svg>
  );
}

export default VideoPickerIcon;
