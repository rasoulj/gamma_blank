import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TagIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="tag"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="tag-2" data-name="tag" transform="translate(-556 -444)">
        <Path
          id="Vector"
          d="M1.4,12.526l4.53,4.53a4.78,4.78,0,0,0,6.75,0l4.39-4.39a4.78,4.78,0,0,0,0-6.75L12.535,1.4a4.751,4.751,0,0,0-3.6-1.39l-5,.24a3.864,3.864,0,0,0-3.69,3.67l-.24,5A4.8,4.8,0,0,0,1.4,12.526Z"
          transform="translate(558.765 446.774)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M5,2.5A2.5,2.5,0,1,1,2.5,0,2.5,2.5,0,0,1,5,2.5Z"
          transform="translate(563 451)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(556 444)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
