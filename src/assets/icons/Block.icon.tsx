import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental";
import theme from "~/theme";
function BlockIcon(props) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#212121";
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="slash"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <Path
          d="M632 338a10 10 0 10-10-10 10 10 0 0010 10z"
          transform="translate(-620 -316)"
        />
        <Path
          data-name="Vector"
          d="M638.9 321l-14 14"
          transform="translate(-620 -316)"
        />
      </G>
    </Svg>
  );
}

export default BlockIcon;
