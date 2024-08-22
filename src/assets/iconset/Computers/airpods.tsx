import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AirpodsIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="airpods"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="airpods-2" data-name="airpods" transform="translate(-684 -252)">
        <Path
          id="Vector"
          d="M4.72,7.56H3.78A3.78,3.78,0,1,1,3.78,0H5.67A2.84,2.84,0,0,1,8.5,2.83V15.1a1.89,1.89,0,1,1-3.78,0Z"
          transform="translate(686 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.94,1.88A.94.94,0,1,1,.94,0"
          transform="translate(688.84 256.84)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.78,7.56h.94A3.78,3.78,0,1,0,4.72,0H2.83A2.84,2.84,0,0,0,0,2.83V15.1a1.89,1.89,0,1,0,3.78,0Z"
          transform="translate(697.5 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,1.88A.939.939,0,0,0,.94.94.939.939,0,0,0,0,0"
          transform="translate(702.22 256.84)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,3V0"
          transform="translate(692.5 271)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,3V0"
          transform="translate(699.5 271)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(684 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
