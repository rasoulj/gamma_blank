import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CategoryIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="category"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="category-2" transform="translate(-172 -188)">
        <Path
          id="Vector"
          d="M3,8H5A2.652,2.652,0,0,0,8,5V3A2.652,2.652,0,0,0,5,0H3A2.652,2.652,0,0,0,0,3V5A2.652,2.652,0,0,0,3,8Z"
          transform="translate(186 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M3,8H5A2.652,2.652,0,0,0,8,5V3A2.652,2.652,0,0,0,5,0H3A2.652,2.652,0,0,0,0,3V5A2.652,2.652,0,0,0,3,8Z"
          transform="translate(174 202)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M8,4A4,4,0,1,1,4,0,4,4,0,0,1,8,4Z"
          transform="translate(174 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M8,4A4,4,0,1,1,4,0,4,4,0,0,1,8,4Z"
          transform="translate(186 202)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(172 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
