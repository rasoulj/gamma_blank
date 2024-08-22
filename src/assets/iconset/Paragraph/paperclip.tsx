import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PaperclipIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="paperclip"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="paperclip-2"
        data-name="paperclip"
        transform="translate(-620 -188)"
      >
        <Path
          id="Vector"
          d="M7,9v3.5a3.5,3.5,0,1,0,7,0V7A7,7,0,1,0,0,7v6a6,6,0,0,0,6,6"
          transform="translate(624.97 191)"
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
          transform="translate(644 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
