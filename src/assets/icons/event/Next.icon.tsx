import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function NextIcon(props: SvgProps) {
  return (
    <Svg
      data-name="Dark Theme/ Send"
      xmlns="http://www.w3.org/2000/svg"
      width={13.251}
      height={14.704}
      viewBox="0 0 13.251 14.704"
      {...props}>
      <Path
        data-name="Path 344"
        d="M51.67 32.259l-12.1-6.779a.573.573 0 00-.82.693l2.283 6.393a.573.573 0 010 .386l-2.283 6.393a.573.573 0 00.82.693l12.1-6.779a.573.573 0 000-1z"
        transform="translate(-38.712 -25.408)"
        fill={props.color ? props.color : '#1de9b6'}
      />
    </Svg>
  );
}

export default NextIcon;
