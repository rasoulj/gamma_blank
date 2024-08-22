import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AwardIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="award"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="award-2" data-name="award" transform="translate(-428 -188)">
        <Path
          id="Vector"
          d="M0,6.018v4.97c0,1.82,0,1.82,1.72,2.98L6.45,16.7a2.86,2.86,0,0,0,2.58,0l4.73-2.73c1.72-1.16,1.72-1.16,1.72-2.98V6.018c0-1.82,0-1.82-1.72-2.98L9.03.308a2.86,2.86,0,0,0-2.58,0L1.72,3.037C0,4.2,0,4.2,0,6.018Z"
          transform="translate(432.26 193.003)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M11,5.63V3A2.652,2.652,0,0,0,8,0H3A2.652,2.652,0,0,0,0,3V5.56"
          transform="translate(434.5 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.913.405l.57.89a.871.871,0,0,0,.44.32l1.02.26a.69.69,0,0,1,.39,1.2l-.67.81a.9.9,0,0,0-.17.52l.06,1.05a.688.688,0,0,1-1.02.74l-.98-.39A.863.863,0,0,0,3,5.8l-.98.39A.69.69,0,0,1,1,5.455l.06-1.05a.875.875,0,0,0-.17-.52l-.67-.81a.69.69,0,0,1,.39-1.2l1.02-.26a.846.846,0,0,0,.44-.32l.57-.89A.7.7,0,0,1,3.913.405Z"
          transform="translate(436.717 198.585)"
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
          transform="translate(452 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
