import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ImagePickerIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        data-name="Path 29952"
        d="M3 4V1h2v3h3v2H5v3H3V6H0V4m6 6V7h3V4h7l1.8 2H21a2.006 2.006 0 012 2v12a2.006 2.006 0 01-2 2H5a2.006 2.006 0 01-2-2V10m10 9a5 5 0 10-5-5 5 5 0 005 5m-3.2-5a3.2 3.2 0 103.2-3.2A3.2 3.2 0 009.8 14z"
        fill="#626262"
      />
      <Path data-name="Rectangle 3079" fill="rgba(0,0,0,0)" d="M0 0H24V24H0z" />
    </Svg>
  );
}

export default ImagePickerIcon;
