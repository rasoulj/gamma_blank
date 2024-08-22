import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function LayerIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="layer"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="layer-2" data-name="layer" transform="translate(-618 -382)">
        <Path
          id="Vector"
          d="M9.615.225l5.9,2.62c1.7.75,1.7,1.99,0,2.74L9.615,8.2a3.42,3.42,0,0,1-2.44,0l-5.9-2.62c-1.7-.75-1.7-1.99,0-2.74l5.9-2.62A3.42,3.42,0,0,1,9.615.225Z"
          transform="translate(621.395 384.695)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0A2.562,2.562,0,0,0,1.4,2.15L8.19,5.17a1.988,1.988,0,0,0,1.62,0L16.6,2.15A2.562,2.562,0,0,0,18,0"
          transform="translate(621 393)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0A2.357,2.357,0,0,0,1.4,2.15L8.19,5.17a1.988,1.988,0,0,0,1.62,0L16.6,2.15A2.357,2.357,0,0,0,18,0"
          transform="translate(621 398)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(618 382)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
