import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function AlertIcon(props) {
  return (
    <Svg
      id="Alert"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}>
      <Path
        id="Alert-2"
        data-name="Alert"
        d="M6.468,2.22A.75.75,0,0,1,7,2h6a.75.75,0,0,1,.53.22L17.78,6.468A.75.75,0,0,1,18,7v6a.75.75,0,0,1-.22.53L13.532,17.78A.75.75,0,0,1,13,18H7a.75.75,0,0,1-.53-.22L2.22,13.532A.75.75,0,0,1,2,13V7a.75.75,0,0,1,.22-.53ZM7.309,3.5,3.5,7.309v5.382L7.309,16.5h5.382L16.5,12.691V7.309L12.691,3.5ZM10,6.35a.75.75,0,0,1,.75.75V10a.75.75,0,0,1-1.5,0V7.1A.75.75,0,0,1,10,6.35Zm0,5.8a.75.75,0,0,0,0,1.5h.007a.75.75,0,0,0,0-1.5Z"
        transform="translate(-2 -2)"
        fill="#1de9b6"
        fillRule="evenodd"
      />
    </Svg>
  );
}
