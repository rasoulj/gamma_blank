import * as React from "react";
import Svg, { Path } from "react-native-svg";

function TelegramSolidIcon(props) {
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
        d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.58.192l-8.534 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.21.921-.46l2.211-2.15 4.6 3.397c.847.467 1.456.227 1.667-.785l3.02-14.228c.308-1.239-.474-1.8-1.283-1.434z"
        fill="#0A8080"
      />
    </Svg>
  );
}

export default TelegramSolidIcon;
