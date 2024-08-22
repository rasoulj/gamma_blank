import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

const ChatIcon = (props: SvgProps) => {
  const color = props.color || getColor({color: 'primary.400'}) || '#32e8b7';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.18}
      height={15.159}
      {...props}>
      <Path
        data-name="Path 32783"
        d="M7.6 0A7.579 7.579 0 0 0 .021 7.579a7.5 7.5 0 0 0 1.713 4.8L.218 13.895a.742.742 0 0 0 .561 1.266H7.6A7.579 7.579 0 0 0 7.6.003Zm0 13.643H2.606l.7-.7a.758.758 0 0 0 0-1.069 6.063 6.063 0 1 1 4.29 1.774Z"
        fill={color}
      />
    </Svg>
  );
};

export default ChatIcon;
