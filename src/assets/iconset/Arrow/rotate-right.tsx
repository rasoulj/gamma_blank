import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RotateRightIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="rotate-right"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="rotate-right-2"
        data-name="rotate-right"
        transform="translate(-300 -316)"
      >
        <Path
          id="Vector"
          d="M11.56.43A10.019,10.019,0,0,0,8.67,0a8.677,8.677,0,1,0,7.21,3.86"
          transform="translate(303.33 320.65)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2.89,3.32,0,0"
          transform="translate(313.24 318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.37,0,0,2.46"
          transform="translate(312.76 321.32)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(324 340) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
