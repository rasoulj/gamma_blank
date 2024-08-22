import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

const EmailIcon = (props: SvgProps) => {
  const color = props.color || getColor({color: 'primary.400'}) || '#32e8b7';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.158}
      height={15.158}
      {...props}>
      <Path
        data-name="Path 32791"
        d="M7.579 0a7.579 7.579 0 0 0 0 15.158h3.79v-1.516h-3.79a6.063 6.063 0 1 1 6.063-6.063v1.084a1.138 1.138 0 1 1-2.274 0V7.579a3.791 3.791 0 1 0-1.107 2.675 2.807 2.807 0 0 0 2.243 1.114 2.663 2.663 0 0 0 2.653-2.706V7.578A7.582 7.582 0 0 0 7.579 0Zm0 9.853a2.274 2.274 0 1 1 2.274-2.274 2.271 2.271 0 0 1-2.274 2.274Z"
        fill={color}
      />
    </Svg>
  );
};

export default EmailIcon;
