import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function HeartSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="heart-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="heart-slash-2"
        data-name="heart-slash"
        transform="translate(-108 -252)"
      >
        <G id="Group">
          <Path
            id="Vector"
            d="M4.11,14.41A12.032,12.032,0,0,1,0,5.59,5.574,5.574,0,0,1,5.56,0,5.515,5.515,0,0,1,10,2.24,5.519,5.519,0,0,1,17.55.96"
            transform="translate(110 255.09)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M12.72,0a5.534,5.534,0,0,1,.26,1.69c0,7-6.48,11.13-9.38,12.13a2.181,2.181,0,0,1-1.24,0A12.873,12.873,0,0,1,0,12.69"
            transform="translate(117.02 259)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M20,0,0,20"
          transform="translate(110 254)"
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
          transform="translate(132 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
