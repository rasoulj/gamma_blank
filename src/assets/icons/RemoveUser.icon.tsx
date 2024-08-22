import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const RemoveUser = (props: SvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.357}
      height={22.031}
      {...props}>
      <G
        fill="none"
        stroke="#292d32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        data-name="Group 27991">
        <Path d="M15.608 18.369h-4.146" />
        <Path
          d="M7.99 9.943a1.884 1.884 0 0 0-.342 0 4.607 4.607 0 1 1 .342 0ZM7.824 21.282a9.483 9.483 0 0 1-5.193-1.43c-2.508-1.68-2.508-4.415 0-6.085a10.122 10.122 0 0 1 10.375 0"
          data-name="Vector"
        />
      </G>
    </Svg>
  );
};

export default RemoveUser;
