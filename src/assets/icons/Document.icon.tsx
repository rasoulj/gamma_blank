import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor, theme} from '~/components/elemental';

const DocIcon = (props: SvgProps) => {
  const finalColor =
    getColor({
      color: props.color || theme?.components?.Icon?.color?.default,
    }) || '#1de9b6';

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G data-name="Group 26388">
        <G
          data-name="document"
          fill="none"
          stroke={finalColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}>
          <Path d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" />
          <Path data-name="Vector" d="M22 10h-4c-3 0-4-1-4-4V2Z" />
        </G>
      </G>
    </Svg>
  );
};

export default DocIcon;
