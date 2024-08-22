import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function UserIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}>
      <Path
        data-name="Path 29937"
        d="M12 4a4 4 0 11-4 4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"
        transform="translate(-4 -4)"
        fill={props.color ? props.color : '#ccc'}
      />
    </Svg>
  );
}

export default UserIcon;
