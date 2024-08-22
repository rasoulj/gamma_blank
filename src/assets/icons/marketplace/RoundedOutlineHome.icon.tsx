import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';

const RoundedOutlineHomeIcon = (props: SvgProps) => {
  // @ts-ignore
  const color = props?.color || props?.style?.color || '#ccc';
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G fill="none" stroke={getColor({color, theme})}>
        <Path d="m9.02 2.84-5.39 4.2A4.759 4.759 0 0 0 2 10.36v7.41a4.225 4.225 0 0 0 4.21 4.22h11.58A4.223 4.223 0 0 0 22 17.78V10.5a4.723 4.723 0 0 0-1.8-3.45l-6.18-4.333a4.487 4.487 0 0 0-5 .123Z" />
        <Path data-name="Vector" d="M12 17.99v-3" />
      </G>
    </Svg>
  );
};
export default RoundedOutlineHomeIcon;
