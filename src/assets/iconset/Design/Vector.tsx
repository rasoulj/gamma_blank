import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, Path } from "react-native-svg";

export default function VectorIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="21.31"
      height="20.234"
      viewBox="0 0 21.31 20.234"
    >
      <Path
        id="Vector"
        d="M2.96,0A2.727,2.727,0,0,0,0,2.382L-.029,17.2a2.447,2.447,0,0,0,.42,1.227l.82,1.1a2.022,2.022,0,0,0,3.43,0l.82-1.1a2.447,2.447,0,0,0,.42-1.227L5.91,2.382A2.723,2.723,0,0,0,2.96,0Z"
        transform="translate(16.296 1.081) rotate(48)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
}
