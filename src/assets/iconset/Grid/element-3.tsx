import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Element3IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="element-3"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="element-3-2"
        data-name="element-3"
        transform="translate(-620 -252)"
      >
        <Path
          id="Vector"
          d="M8.5,6.52V1.98C8.5.57,7.86,0,6.27,0H2.23C.64,0,0,.57,0,1.98V6.51C0,7.93.64,8.49,2.23,8.49H6.27C7.86,8.5,8.5,7.93,8.5,6.52Z"
          transform="translate(633.5 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.5,6.27V2.23C8.5.64,7.86,0,6.27,0H2.23C.64,0,0,.64,0,2.23V6.27C0,7.86.64,8.5,2.23,8.5H6.27C7.86,8.5,8.5,7.86,8.5,6.27Z"
          transform="translate(633.5 265.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M8.5,6.52V1.98C8.5.57,7.86,0,6.27,0H2.23C.64,0,0,.57,0,1.98V6.51C0,7.93.64,8.49,2.23,8.49H6.27C7.86,8.5,8.5,7.93,8.5,6.52Z"
          transform="translate(622 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M8.5,6.27V2.23C8.5.64,7.86,0,6.27,0H2.23C.64,0,0,.64,0,2.23V6.27C0,7.86.64,8.5,2.23,8.5H6.27C7.86,8.5,8.5,7.86,8.5,6.27Z"
          transform="translate(622 265.5)"
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
          transform="translate(620 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
