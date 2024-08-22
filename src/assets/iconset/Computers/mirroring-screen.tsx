import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MirroringScreenIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="mirroring-screen"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="mirroring-screen-2"
        data-name="mirroring-screen"
        transform="translate(-236 -380)"
      >
        <Path
          id="Vector"
          d="M0,6V5A4.724,4.724,0,0,1,5,0H15a4.724,4.724,0,0,1,5,5v8a4.724,4.724,0,0,1-5,5H14"
          transform="translate(238 383)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <G id="Group">
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M0,0A9.75,9.75,0,0,1,8.61,8.61"
            transform="translate(239.69 391.71)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M0,0A7.155,7.155,0,0,1,6.32,6.32"
            transform="translate(238.62 395.07)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M0,0A3.582,3.582,0,0,1,3.16,3.16"
            transform="translate(237.98 398.86)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(236 380)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
