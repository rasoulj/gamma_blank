import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AirplaneIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="airplane"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="airplane-2" data-name="airplane" transform="translate(-115 -188)">
        <Path
          id="Vector"
          d="M6.04,19.493l2.33-1.96a1.023,1.023,0,0,1,1.28,0l2.33,1.96a1.008,1.008,0,0,0,1.4-.58l.44-1.33a1.106,1.106,0,0,0-.24-1.03l-2.27-2.28a1.112,1.112,0,0,1-.3-.71v-2.85a.466.466,0,0,1,.7-.46l4.91,2.12a.931.931,0,0,0,1.4-.92v-1.29a2,2,0,0,0-1.12-1.7l-5.59-2.41a.554.554,0,0,1-.3-.46v-3A3.065,3.065,0,0,0,9.48.113a1.059,1.059,0,0,0-.95,0A3.081,3.081,0,0,0,7,2.6v3a.554.554,0,0,1-.3.46L1.12,8.472A1.97,1.97,0,0,0,0,10.162v1.29a.931.931,0,0,0,1.4.92l4.91-2.12a.465.465,0,0,1,.7.46v2.85a1.156,1.156,0,0,1-.29.71l-2.27,2.28a1.1,1.1,0,0,0-.24,1.03l.44,1.33A.983.983,0,0,0,6.04,19.493Z"
          transform="translate(117.99 190.197)"
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
          transform="translate(139 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
