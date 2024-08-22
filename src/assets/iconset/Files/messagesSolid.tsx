import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function MessagesSolidIconSet(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#FAFAFA">
        <Path d="M13.188 6h-6.4a6.063 6.063 0 00-.75.04c-2.69.23-4.04 1.82-4.04 4.75v4c0 4 1.6 4.79 4.79 4.79h.4a.923.923 0 01.64.32l1.2 1.6a1.132 1.132 0 001.92 0l1.2-1.6a.806.806 0 01.64-.32h.4c2.93 0 4.52-1.34 4.75-4.04.029-.249.042-.5.04-.75v-4c0-3.193-1.597-4.79-4.79-4.79zm-6.69 8a1 1 0 110-2 1 1 0 010 2zm3.49 0a1 1 0 110-2 1 1 0 010 2zm3.5 0a1 1 0 110-2 1 1 0 010 2z" />
        <Path d="M21.978 6.79v4c0 2-.62 3.36-1.86 4.11a.438.438 0 01-.65-.41l.01-3.7c0-4-2.29-6.29-6.29-6.29l-6.09.01a.438.438 0 01-.41-.65c.75-1.24 2.11-1.86 4.1-1.86h6.4c3.19 0 4.787 1.597 4.79 4.79z" />
      </G>
    </Svg>
  );
}

export default MessagesSolidIconSet;
