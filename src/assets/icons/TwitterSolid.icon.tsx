import * as React from "react";
import Svg, { Path } from "react-native-svg";

function TwitterSolidIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.993 20.4c-2.502 0-4.831-.702-6.793-1.91a9.27 9.27 0 003.462-.25 9.04 9.04 0 003.097-1.503 4.56 4.56 0 01-2.563-.838 4.25 4.25 0 01-1.575-2.11c.271.05.549.077.833.077.404 0 .797-.052 1.17-.146a4.475 4.475 0 01-2.552-1.472A4.135 4.135 0 012.07 9.562v-.055c.614.327 1.302.509 2.005.53a4.307 4.307 0 01-1.45-1.529 4.09 4.09 0 01.08-4.133 12.491 12.491 0 004.073 3.144 13.023 13.023 0 005.06 1.286 4.077 4.077 0 01.28-2.713 4.326 4.326 0 011.947-1.99 4.608 4.608 0 012.81-.446 4.5 4.5 0 012.514 1.282 9.188 9.188 0 002.814-1.028 4.305 4.305 0 01-1.947 2.348A9.228 9.228 0 0022.8 5.59a8.906 8.906 0 01-2.211 2.196c.008.182.014.365.014.548-.001 5.602-4.46 12.067-12.61 12.066z"
        fill="#0A8080"
      />
    </Svg>
  );
}

export default TwitterSolidIcon;
