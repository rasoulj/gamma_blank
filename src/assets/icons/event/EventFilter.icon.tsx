import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental/helper";
import theme from "~/theme";

export default function EventFilterIcon(props: SvgProps) {
  // @ts-ignore
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.components?.Icon?.color?.default ||
    "primary.500";

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="filter" fill="none" stroke={getColor({ color, theme })}>
        <Path
          d="M2 0h13.2a2.006 2.006 0 012 2v2.2a3.733 3.733 0 01-1 2.3l-4.3 3.8a3.255 3.255 0 00-1 2.3v4.3a2.227 2.227 0 01-.9 1.7l-1.4.9a2.038 2.038 0 01-3.1-1.7v-5.3a3.865 3.865 0 00-.8-2.1l-3.8-4a3.315 3.315 0 01-.9-2V2.1A2.03 2.03 0 012 0z"
          transform="translate(-556 -508) translate(559.4 510.1)"
        />
        <Path
          data-name="Vector"
          d="M4.93 0L0 7.9"
          transform="translate(-556 -508) translate(562 510.1)"
        />
      </G>
    </Svg>
  );
}
