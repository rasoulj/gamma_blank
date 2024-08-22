import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';

const RoundedOutlineUserIcon = (props: SvgProps) => {
  // @ts-ignore
  const color = props?.color || props?.style?.color || '#ccc';
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        data-name="profile"
        fill="none"
        stroke={getColor({color, theme})}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path d="M12.16 10.87a1.818 1.818 0 0 0-.33 0 4.445 4.445 0 1 1 .33 0Z" />
        <Path
          data-name="Vector"
          d="M7.16 14.561c-2.42 1.62-2.42 4.26 0 5.87a9.766 9.766 0 0 0 10.01 0c2.42-1.62 2.42-4.26 0-5.87a9.812 9.812 0 0 0-10.01 0Z"
        />
      </G>
    </Svg>
  );
};
export default RoundedOutlineUserIcon;
