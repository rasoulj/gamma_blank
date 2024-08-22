import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BluetoothIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="bluetooth"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="bluetooth-2"
        data-name="bluetooth"
        transform="translate(-748 -380)"
      >
        <Path
          id="Vector"
          d="M0,16.64,12.35,5.319a1.083,1.083,0,0,0-.04-1.67L8.46.439c-1-.83-1.82-.45-1.82.85v17.42c0,1.3.82,1.68,1.82.85l3.85-3.21a1.083,1.083,0,0,0,.04-1.67L0,3.359"
          transform="translate(753.64 382.001)"
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
          transform="translate(748 380)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
