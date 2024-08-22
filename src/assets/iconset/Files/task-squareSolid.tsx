import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function TaskSquareSolidIconSet(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.188 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.38c0 3.64 2.17 5.81 5.81 5.81h8.38c3.64 0 5.81-2.17 5.81-5.81V7.81c0-3.64-2.17-5.81-5.81-5.81zm-6.22 12.9l-2.25 2.25a.743.743 0 01-.53.22.726.726 0 01-.53-.22l-.75-.75a.737.737 0 010-1.06.754.754 0 011.06 0l.22.22 1.72-1.72a.75.75 0 111.06 1.06zm0-7l-2.25 2.25a.743.743 0 01-.53.22.726.726 0 01-.53-.22l-.75-.75a.737.737 0 010-1.06.754.754 0 011.06 0l.22.22 1.72-1.72a.75.75 0 111.06 1.06zm7.59 8.72h-5.25a.75.75 0 010-1.5h5.25a.75.75 0 110 1.5zm0-7h-5.25a.75.75 0 010-1.5h5.25a.75.75 0 110 1.5z"
        fill="#FAFAFA"
      />
    </Svg>
  );
}

export default TaskSquareSolidIconSet;
