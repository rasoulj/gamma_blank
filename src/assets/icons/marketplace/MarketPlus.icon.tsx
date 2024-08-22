import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';

const MarketPlusIcon = ({color, ...props}: any) => {
  // @ts-ignore
  const colorFinal = color || props?.style?.color || '#292d32';
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        data-name="add"
        fill="none"
        stroke={getColor({color: colorFinal, theme})}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path d="M6 12h12" />
        <Path data-name="Vector" d="M12 18V6" />
      </G>
    </Svg>
  );
};

export default MarketPlusIcon;
