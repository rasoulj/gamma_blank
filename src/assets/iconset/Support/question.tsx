import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function QuestionIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="question"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="message-question" transform="translate(-620 -252)">
        <Path
          id="Vector"
          d="M4.609,12.493V11.91A4.349,4.349,0,0,1,6.941,8.218,4.256,4.256,0,0,0,9.217,4.609,4.609,4.609,0,1,0,0,4.609"
          transform="translate(627.391 254.43)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(620 252)"
          fill="none"
          opacity="0"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M.5.5H.52"
          transform="translate(631.492 273.059)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </G>
    </Svg>
  );
}
