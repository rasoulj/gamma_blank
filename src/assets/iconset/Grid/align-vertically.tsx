import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AlignVerticallyIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="align-vertically"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="align-vertically-2"
        data-name="align-vertically"
        transform="translate(-236 -316)"
      >
        <Path
          id="Vector"
          d="M12.9,5.5H2.1C.6,5.5,0,4.86,0,3.27V2.23C0,.64.6,0,2.1,0H12.9C14.4,0,15,.64,15,2.23V3.27C15,4.86,14.4,5.5,12.9,5.5Z"
          transform="translate(240.5 329.75)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.9,5.5H2.1C.6,5.5,0,4.86,0,3.27V2.23C0,.64.6,0,2.1,0H8.9C10.4,0,11,.64,11,2.23V3.27C11,4.86,10.4,5.5,8.9,5.5Z"
          transform="translate(242.5 321.25)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,2.4V0"
          transform="translate(248 335.6)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,2V0"
          transform="translate(248 327)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0V2.69"
          transform="translate(248 318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(236 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
