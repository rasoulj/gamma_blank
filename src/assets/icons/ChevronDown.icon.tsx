import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChevronDown(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill={props.color || '#000'}
      className="bi bi-chevron-down"
      viewBox="0 0 16 16"
      {...props}>
      <Path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
      />
    </Svg>
  );
}

export default ChevronDown;
