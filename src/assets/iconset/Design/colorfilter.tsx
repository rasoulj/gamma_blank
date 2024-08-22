import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ColorfilterIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="colorfilter"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="colorfilter-2"
        data-name="colorfilter"
        transform="translate(-362 -382)"
      >
        <Path
          id="Vector"
          d="M12,5.79a6,6,0,0,1-12,0A6.014,6.014,0,0,1,4.42,0a6.019,6.019,0,0,0,4,3.58A5.851,5.851,0,0,0,10,3.79a5.851,5.851,0,0,0,1.58-.21A5.993,5.993,0,0,1,12,5.79Z"
          transform="translate(364 392.21)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M12,6a6,6,0,0,1-4.42,5.79,6.049,6.049,0,0,1-3.16,0A6,6,0,1,1,12,6Z"
          transform="translate(368 384)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M10,5.79a6,6,0,0,1-6,6,5.931,5.931,0,0,1-4-1.54A5.947,5.947,0,0,0,2,5.79a5.993,5.993,0,0,0-.42-2.21A6.019,6.019,0,0,0,5.58,0,6.014,6.014,0,0,1,10,5.79Z"
          transform="translate(374 392.21)"
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
          transform="translate(362 382)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
