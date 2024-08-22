import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function LinkedInIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={16} cy={16} r={15.5} stroke="#0A8080" />
      <Path
        d="M18.015 13.695a3.732 3.732 0 00-3.744 3.724v3.764a.576.576 0 00.576.576h1.345a.576.576 0 00.575-.576v-3.764a1.242 1.242 0 011.377-1.235 1.28 1.28 0 011.12 1.28v3.719a.576.576 0 00.576.576h1.343a.576.576 0 00.576-.576v-3.764a3.73 3.73 0 00-3.744-3.724zM12.543 14.272h-1.728a.576.576 0 00-.576.576v6.336c0 .318.258.576.576.576h1.728a.576.576 0 00.576-.576v-6.336a.576.576 0 00-.576-.576zM11.68 13.12a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"
        fill="#0A8080"
      />
    </Svg>
  );
}

export default LinkedInIcon;
