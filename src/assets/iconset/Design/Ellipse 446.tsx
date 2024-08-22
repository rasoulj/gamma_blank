import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, Ellipse } from "react-native-svg";

export default function Ellipse446IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="9.143"
      height="9.217"
      viewBox="0 0 9.143 9.217"
    >
      <Ellipse
        id="Ellipse_446"
        data-name="Ellipse 446"
        cx="3.5"
        cy="3"
        rx="3.5"
        ry="3"
        transform="translate(4.459) rotate(48)"
        fill="none"
      />
    </Svg>
  );
}
