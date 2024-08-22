import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function TrashIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.729}
      height={22.794}
      viewBox="0 0 17.729 22.794"
      {...props}>
      <Path
        data-name="Icon material-delete"
        d="M8.766 24.761a2.54 2.54 0 002.534 2.533h10.13a2.54 2.54 0 002.533-2.533V9.565H8.766zm16.462-19H20.8L19.53 4.5H13.2l-1.268 1.266H7.5V8.3h17.729z"
        transform="translate(-7.5 -4.5)"
        fill="#e0e0e0"
      />
    </Svg>
  );
}

export default TrashIcon;
