import * as React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";
import { getColor } from "~/components/elemental";

export default function CloseIcon(props) {
  const color = props?.color || getColor({ color: "gray.800" }) || "#626262";

  if (props?.type === "faild") {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props?.width ? props?.width : 43.255}
        height={props?.height ? props?.height : 42.548}
        {...props}
      >
        <G
          fill="red"
          data-name="Group 26575"
          transform="rotate(45 80.546 -.33)"
        >
          <Rect
            width={9}
            height={51}
            data-name="Rectangle 20841"
            rx={4.5}
            transform="translate(49.911 30.771)"
          />
          <Rect
            width={8.442}
            height={50.902}
            data-name="Rectangle 20842"
            rx={4.221}
            transform="rotate(90 13.155 66.207)"
          />
        </G>
      </Svg>
    );
  } else {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props?.width ?? 14}
        height={props?.height ?? 14}
        viewBox="0 0 14 14"
        {...props}
      >
        <Path
          data-name="Path 29950"
          d="M13.46 12L19 17.54V19h-1.46L12 13.46 6.46 19H5v-1.46L10.54 12 5 6.46V5h1.46L12 10.54 17.54 5H19v1.46z"
          transform="translate(-5 -5)"
          fill={color}
        />
      </Svg>
    );
  }
}
