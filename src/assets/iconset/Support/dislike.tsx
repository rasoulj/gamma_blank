import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DislikeIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="dislike"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="dislike-2" data-name="dislike" transform="translate(-364 -188)">
        <Path
          id="Vector"
          d="M14.139,3,11.039.6a3.077,3.077,0,0,0-1.9-.6h-3.8a3,3,0,0,0-2.8,2.1L.139,9.4a1.874,1.874,0,0,0,1.9,2.6h4a1.009,1.009,0,0,1,1,1.2l-.5,3.2a1.973,1.973,0,0,0,1.3,2.2,2,2,0,0,0,2.2-.7l4.1-6.1"
          transform="translate(366.381 190.65)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M5,1.9v9.8c0,1.4-.6,1.9-2,1.9H2c-1.4,0-2-.5-2-1.9V1.9C0,.5.6,0,2,0H3C4.4,0,5,.5,5,1.9Z"
          transform="translate(380.62 191.75)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(364 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
