import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function StatusUpIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="status-up"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="status-up-2"
        data-name="status-up"
        transform="translate(-236 -252)"
      >
        <Path
          id="Vector"
          d="M0,2.07V0"
          transform="translate(242.88 268.08)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,4.14V0"
          transform="translate(248 266.01)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,6.22V0"
          transform="translate(253.12 263.93)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M10.24,0,9.78.54A18.882,18.882,0,0,1,0,6.58"
          transform="translate(242.88 257.85)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H2.93V2.92"
          transform="translate(250.19 257.85)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M7,20h6c5,0,7-2,7-7V7c0-5-2-7-7-7H7C2,0,0,2,0,7v6C0,18,2,20,7,20Z"
          transform="translate(238 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(236 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
