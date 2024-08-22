import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PathIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="path"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="path-2" data-name="path">
        <Path
          id="Vector"
          d="M8.21,3.854,5.18.824C4.03-.326,2.46-.266,1.69.964L0,3.634l5.4,5.4,2.67-1.69A2.231,2.231,0,0,0,8.21,3.854Z"
          transform="translate(11.58 3.416)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.133.256,4.2.016c-2.19-.13-2.96.54-3.2,2.63l-.98,8.32a2.409,2.409,0,0,0,2.8,2.8l8.32-.98c2.09-.25,2.85-1.01,2.63-3.2l-.23-3.93"
          transform="translate(3.447 6.794)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,3.04,3.03,0"
          transform="translate(4.61 16.38)"
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
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
