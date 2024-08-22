import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CameraIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23.031}
      height={15.354}
      viewBox="0 0 23.031 15.354"
      {...props}>
      <Path
        data-name="Path 29957"
        d="M20.913 11.758V7.28A1.28 1.28 0 0019.634 6H4.28A1.28 1.28 0 003 7.28v12.8a1.28 1.28 0 001.28 1.279h15.354a1.28 1.28 0 001.28-1.279V15.6l5.118 5.118V6.64l-5.118 5.118m-3.839 3.2h-3.839V18.8h-2.559v-3.843H6.839V12.4h3.839V8.559h2.559V12.4h3.839z"
        transform="translate(-3 -6)"
        fill={props.color ? props.color : '#626262'}
      />
    </Svg>
  );
}

export default CameraIcon;
