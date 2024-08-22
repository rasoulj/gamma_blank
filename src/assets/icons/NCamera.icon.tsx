import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental";

const CameraIcon = (props: SvgProps) => {
  const color = getColor({ color: props.color || "#0A8080" });
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        fill={color}
        d="M18.875 6a1.643 1.643 0 0 1-1.45-.89l-.72-1.45A3.3 3.3 0 0 0 14.025 2h-2.29a3.3 3.3 0 0 0-2.69 1.66l-.72 1.45a1.643 1.643 0 0 1-1.45.89 3.753 3.753 0 0 0-3.75 3.99l.52 8.26A3.63 3.63 0 0 0 7.635 22h10.482a3.635 3.635 0 0 0 3.99-3.75l.52-8.26A3.753 3.753 0 0 0 18.875 6Zm-7.5 1.25h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 1 1 0-1.5Zm1.5 10.87a3.38 3.38 0 1 1 0-6.76 3.38 3.38 0 0 1 0 6.76Z"
      />
    </Svg>
  );
};

export default CameraIcon;
