import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ShareIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="share"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="share-2" data-name="share" transform="translate(-364 -316)">
        <Path
          id="Vector"
          d="M0,0A8.63,8.63,0,0,1,3.66,6.15"
          transform="translate(380.96 322.17)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,6.15A8.6,8.6,0,0,1,3.6,0"
          transform="translate(367.49 322.22)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0A8.525,8.525,0,0,0,3.87.92,8.476,8.476,0,0,0,7.6.07"
          transform="translate(372.19 336.94)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M5.56,2.78A2.78,2.78,0,1,1,2.78,0,2.78,2.78,0,0,1,5.56,2.78Z"
          transform="translate(373.28 318.14)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M5.56,2.78A2.78,2.78,0,1,1,2.78,0,2.78,2.78,0,0,1,5.56,2.78Z"
          transform="translate(366.05 330.36)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M5.56,2.78A2.78,2.78,0,1,1,2.78,0,2.78,2.78,0,0,1,5.56,2.78Z"
          transform="translate(380.39 330.36)"
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
          transform="translate(364 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
