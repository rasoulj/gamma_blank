import * as React from "react";
import Svg, {
    Defs,
    LinearGradient,
    Rect,
    Stop,
    SvgProps
} from "react-native-svg";

export default function GradientIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Defs>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="1" stopColor={`#71717A`} />
          <Stop offset="0" stopOpacity={0} stopColor={`#fff`} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#gradient)" />
    </Svg>
  );
}
