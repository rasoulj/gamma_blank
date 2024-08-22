import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { withMeasure } from "~/components/Wrapper";

function AppleIcon() {
  return (
    <Svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.0453 25.2301V15.2019H18.41L18.9148 11.2908H15.0453V8.7963C15.0453 7.66453 15.3582 6.89332 16.9825 6.89332H19.0505V3.39537C18.0493 3.29039 17.0432 3.23939 16.0365 3.24259C15.3515 3.19285 14.6638 3.29353 14.0218 3.53756C13.3798 3.7816 12.7989 4.16308 12.3198 4.65529C11.8408 5.14749 11.4752 5.73851 11.2486 6.38691C11.0221 7.03531 10.94 7.72542 11.0083 8.40886V11.292H7.63379V15.2031H11.0095V25.2301H15.0453Z"
        fill="#FAFAFA"
      />
    </Svg>
  );
}

export default withMeasure<any>(AppleIcon);
