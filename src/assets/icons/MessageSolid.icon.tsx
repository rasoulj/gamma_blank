import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MessageSolidIcon(props) {
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
        d="M17 2H7a4.991 4.991 0 00-5 4.98v6.98a4.991 4.991 0 005 4.98h1.5a1.149 1.149 0 01.8.4l1.5 1.99a1.421 1.421 0 002.4 0l1.5-1.99a1.015 1.015 0 01.8-.4H17a4.991 4.991 0 005-4.98V6.98A4.991 4.991 0 0017 2zM8 12a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z"
        fill="#0A8080"
      />
    </Svg>
  );
}

export default MessageSolidIcon;
