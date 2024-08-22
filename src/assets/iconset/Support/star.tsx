import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function StarIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="star"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="star-2" data-name="star" transform="translate(-108 -188)">
        <Path
          id="Vector"
          d="M11.729,1.433l1.76,3.52A2.173,2.173,0,0,0,14.909,6l3.19.53c2.04.34,2.52,1.82,1.05,3.28l-2.48,2.48a2.171,2.171,0,0,0-.52,1.81l.71,3.07c.56,2.43-.73,3.37-2.88,2.1l-2.99-1.77a2.162,2.162,0,0,0-1.98,0l-2.99,1.77c-2.14,1.27-3.44.32-2.88-2.1l.71-3.07a2.171,2.171,0,0,0-.52-1.81L.849,9.813c-1.46-1.46-.99-2.94,1.05-3.28L5.089,6A2.178,2.178,0,0,0,6.5,4.953l1.76-3.52C9.219-.477,10.779-.477,11.729,1.433Z"
          transform="translate(110.001 190.077)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(108 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
