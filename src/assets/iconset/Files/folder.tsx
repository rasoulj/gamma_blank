import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function FolderIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="folder"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="folder-2" data-name="folder" transform="translate(-108 -188)">
        <Path
          id="Vector"
          d="M20,9v6c0,4-1,5-5,5H5c-4,0-5-1-5-5V5C0,1,1,0,5,0H6.5A2.362,2.362,0,0,1,8.9,1.2l1.5,2A1.585,1.585,0,0,0,12,4h3C19,4,20,5,20,9Z"
          transform="translate(110 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(132 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
