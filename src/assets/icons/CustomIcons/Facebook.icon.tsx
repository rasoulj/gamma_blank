import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function FaceBookIcon(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={14} cy={14} r={13.5} stroke="#0A8080" />
      <Path
        d="M14.787 19.973v-5.105h1.712l.257-1.991h-1.97v-1.27c0-.576.16-.969.987-.969h1.053v-1.78c-.51-.054-1.022-.08-1.535-.078a2.398 2.398 0 00-2.56 2.63v1.468h-1.718v1.99h1.719v5.105h2.055z"
        fill="#0A8080"
      />
    </Svg>
  );
}

export default FaceBookIcon;
