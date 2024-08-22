import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const AddUserIcon = (props: SvgProps) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        fill="none"
        stroke={props?.color || '#292d32'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path d="M18.5 19.5h-4" />
        <Path
          d="M16.5 21.5v-4M12.16 10.87a1.818 1.818 0 0 0-.33 0 4.435 4.435 0 1 1 .33 0ZM11.99 21.81a9.15 9.15 0 0 1-5.01-1.38c-2.42-1.62-2.42-4.26 0-5.87a9.766 9.766 0 0 1 10.01 0"
          data-name="Vector"
        />
      </G>
    </Svg>
  );
};
export default AddUserIcon;
