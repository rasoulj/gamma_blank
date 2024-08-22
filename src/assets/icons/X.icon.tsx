import * as React from "react";
import Svg, { Path } from "react-native-svg";

function XIcon(props) {
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
        d="M18.901 0h3.68l-8.04 10.166L24 24h-7.406l-5.8-8.39L4.155 24H.474l8.6-10.874L0 0h7.594l5.243 7.669L18.901 0zM17.61 21.563h2.039L6.486 2.31H4.298L17.61 21.563z"
        fill="#0A8080"
      />
    </Svg>
  );
}

export default XIcon;
