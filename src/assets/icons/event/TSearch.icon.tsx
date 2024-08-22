import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental/helper";
import theme from "~/theme";

function TSearchIcon(props: SvgProps) {
  // @ts-ignore
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.components?.Icon?.color?.default ||
    "#a1a1aa";

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G fill="none" stroke={getColor({ color, theme })}>
        <Path d="M21 11.5A9.5 9.5 0 1 1 11.5 2a9.5 9.5 0 0 1 9.5 9.5Z" />
        <Path data-name="Vector" d="m22 22-2-2" />
      </G>
    </Svg>
  );
}

export default TSearchIcon;
