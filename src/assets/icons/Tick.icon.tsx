import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { getColor } from "~/utils/helper/theme.methods";

function TickIcon(props) {
  const color = props?.color
    ? getColor({ color: props?.color })
    : props?.style?.color || "#4bb543";

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={59.812}
      height={42.933}
      {...props}
    >
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth ?? "8"}
        d="m5.657 21.184 17.637 17.749 30.863-33.28"
        data-name="COCO/Line/Check"
      />
    </Svg>
  );
}

export default TickIcon;
