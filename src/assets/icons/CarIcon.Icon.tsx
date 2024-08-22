import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function CarIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="car"
        fill="none"
        stroke="#1de9b6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M194.51 190.83h-7.02c-2.49 0-3.04 1.24-3.36 2.76L183 199h16l-1.13-5.41c-.32-1.52-.87-2.76-3.36-2.76z"
          transform="translate(-179 -188)"
        />
        <Path
          data-name="Vector"
          d="M200.99 207.82a2.014 2.014 0 01-2.03 2.18h-1.88c-1.08 0-1.23-.46-1.42-1.03l-.2-.6c-.28-.82-.459-1.37-1.9-1.37h-5.12c-1.44 0-1.65.62-1.9 1.37l-.2.6c-.19.57-.339 1.03-1.42 1.03h-1.88a2.014 2.014 0 01-2.03-2.18l.56-6.09c.14-1.5.431-2.73 3.05-2.73h12.76c2.62 0 2.91 1.23 3.05 2.73zM183 196h-1M200 196h-1M191 191v2M189.5 193h3M185 203h3M194 203h3"
          transform="translate(-179 -188)"
        />
      </G>
    </Svg>
  );
}

export default CarIcon;
