import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Message2Icon = (props: SvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill={props.color || "#fff"}
        d="M17 2H7a4.991 4.991 0 0 0-5 4.98v6.98a4.991 4.991 0 0 0 5 4.98h1.5a1.149 1.149 0 0 1 .8.4l1.5 1.99a1.421 1.421 0 0 0 2.4 0l1.5-1.99a1.014 1.014 0 0 1 .8-.4H17a4.991 4.991 0 0 0 5-4.98V6.98A4.991 4.991 0 0 0 17 2ZM8 12a1 1 0 1 1 1-1 1 1 0 0 1-1 1Zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1Zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z"
        data-name="message"
      />
    </Svg>
  );
};
export default Message2Icon;
