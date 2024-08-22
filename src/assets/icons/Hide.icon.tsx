import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const HideIcon = (props: SvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24.061}
      height={24}
      {...props}>
      <G
        data-name="eye-slash"
        fill="none"
        stroke="#292d32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path d="M12.161 9.617 7.678 14.1a3.17 3.17 0 1 1 4.483-4.483Z" />
        <Path
          data-name="Vector"
          d="M15.075 6.34a8.532 8.532 0 0 0-5.156-1.807c-3.127 0-6.041 1.843-8.068 5.032a4.718 4.718 0 0 0 0 4.6 12.691 12.691 0 0 0 2.4 2.806M6.748 18.529a8.163 8.163 0 0 0 3.171.656c3.127 0 6.042-1.843 8.07-5.032a4.718 4.718 0 0 0 0-4.6 14.37 14.37 0 0 0-.941-1.3"
        />
        <Path
          data-name="Vector"
          d="M13.031 12.479a3.158 3.158 0 0 1-2.5 2.5M7.678 14.1l-6.617 6.617M18.778 3l-6.617 6.617"
        />
      </G>
    </Svg>
  );
};

export default HideIcon;
