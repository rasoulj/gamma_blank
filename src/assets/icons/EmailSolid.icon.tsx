import * as React from "react";
import Svg, { Path } from "react-native-svg";

function EmailSolidIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17 3.5H7c-3 0-5 1.5-5 5v7c0 3.5 2 5 5 5h10c3 0 5-1.5 5-5v-7c0-3.5-2-5-5-5zm.47 6.09l-3.13 2.5a3.861 3.861 0 01-4.68 0l-3.13-2.5a.769.769 0 01-.12-1.06.748.748 0 011.05-.12l3.13 2.5a2.386 2.386 0 002.81 0l3.13-2.5a.738.738 0 011.05.12.759.759 0 01-.11 1.06z"
        fill="#0A8080"
      />
    </Svg>
  );
}

export default EmailSolidIcon;
