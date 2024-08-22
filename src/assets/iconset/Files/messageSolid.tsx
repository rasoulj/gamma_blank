import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MessageSolidIconSet(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.998 2h-10a4.991 4.991 0 00-5 4.98v6.98a4.991 4.991 0 005 4.98h1.5a1.15 1.15 0 01.8.4l1.5 1.99a1.422 1.422 0 002.4 0l1.5-1.99a1.015 1.015 0 01.8-.4h1.5a4.991 4.991 0 005-4.98V6.98a4.991 4.991 0 00-5-4.98zm-9 10a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z"
        fill="#FAFAFA"
      />
    </Svg>
  );
}

export default MessageSolidIconSet;
