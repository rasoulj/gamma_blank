import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental/helper";
import theme from "~/theme";

function TicketIcon(props: SvgProps) {
  // @ts-ignore
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.components?.Icon?.color?.default ||
    "#ccc";

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G fill="none" stroke={getColor({ color, theme })}>
        <Path d="M19.5 12.5A2.5 2.5 0 0 1 22 10V9c0-4-1-5-5-5H7C3 4 2 5 2 9v.5A2.5 2.5 0 0 1 4.5 12 2.5 2.5 0 0 1 2 14.5v.5c0 4 1 5 5 5h10c4 0 5-1 5-5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <Path data-name="Vector" d="M10 4v16" />
      </G>
    </Svg>
  );
}

export default TicketIcon;
