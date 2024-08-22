import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental";

const PhotoIcon = (props: SvgProps) => {
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
        d="m2.705 19.01-.02.02a6.187 6.187 0 0 1-.51-2 6.14 6.14 0 0 0 .53 1.98ZM11.505 8a2.38 2.38 0 1 1-4.76 0 2.38 2.38 0 0 1 4.76 0Z"
      />
      <Path
        fill={color}
        d="M16.315 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.38c-.022.976.17 1.945.56 2.84.86 1.9 2.7 2.97 5.25 2.97h8.38c3.64 0 5.81-2.17 5.81-5.81V7.81c0-3.64-2.17-5.81-5.81-5.81Zm4.18 10.5a2.229 2.229 0 0 0-2.82 0l-4.16 3.57a2.229 2.229 0 0 1-2.82 0l-.34-.28a2.221 2.221 0 0 0-2.64-.14l-3.74 2.51a5.333 5.333 0 0 1-.35-1.97V7.81c0-2.82 1.49-4.31 4.31-4.31h8.38c2.82 0 4.31 1.49 4.31 4.31v4.8l-.13-.11Z"
      />
    </Svg>
  );
};

export default PhotoIcon;
