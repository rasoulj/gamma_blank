import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function LockSolidIconSet(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G fill="#D4D4D8">
        <Path d="M13.63 15.72a1.63 1.63 0 11-3.26 0 1.63 1.63 0 013.26 0z" />
        <Path d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2S5.72 5.58 5.72 8.28v1.25C2.92 9.88 2 11.3 2 14.79v1.86C2 20.75 3.25 22 7.35 22h9.3c4.1 0 5.35-1.25 5.35-5.35v-1.86c0-3.49-.92-4.91-3.72-5.26zM12 18.74a3.02 3.02 0 110-6.039 3.02 3.02 0 010 6.039zm-4.65-9.3h-.23V8.28c0-2.93.83-4.88 4.88-4.88s4.88 1.95 4.88 4.88v1.17H7.35v-.01z" />
      </G>
    </Svg>
  );
}

export default LockSolidIconSet;
