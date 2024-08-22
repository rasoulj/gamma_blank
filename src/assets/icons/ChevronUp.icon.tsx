import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChevronUpIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill={props.color || '#000'}
      className="bi bi-chevron-up"
      viewBox="0 0 16 16"
      {...props}>
      <Path
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
      />
    </Svg>
  );
}

export default ChevronUpIcon;
