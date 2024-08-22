import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MessageReportIconSet(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.5 19H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5a1.015 1.015 0 00-.8.4l-1.5 2a1.421 1.421 0 01-2.4 0l-1.5-2a1.13 1.13 0 00-.8-.4zM12.004 7v5"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15h.009"
        stroke="#292D32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MessageReportIconSet;
