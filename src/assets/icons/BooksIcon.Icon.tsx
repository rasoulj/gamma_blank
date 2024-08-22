import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function BooksIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G
        data-name="book"
        fill="none"
        stroke="#1de9b6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          d="M578 204.74v-12.07a1.97 1.97 0 00-2.17-1.99h-.06a18.851 18.851 0 00-7.07 2.37l-.17.11a1.108 1.108 0 01-1.06 0l-.25-.15a18.757 18.757 0 00-7.06-2.34 1.967 1.967 0 00-2.16 1.992v12.08a2.055 2.055 0 001.74 1.98l.29.04a25.693 25.693 0 017.44 2.44l.04.02a1.08 1.08 0 00.96 0 25.461 25.461 0 017.46-2.46l.33-.04a2.055 2.055 0 001.74-1.982z"
          transform="translate(-556 -188)"
        />
        <Path
          data-name="Vector"
          d="M568 193.49v15M563.75 196.49h-2.25M564.5 199.49h-3"
          transform="translate(-556 -188)"
        />
      </G>
    </Svg>
  );
}

export default BooksIcon;
