import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function NotificationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={16}
      viewBox="0 0 13 16"
      {...props}>
      <Path
        data-name="Icon Notification"
        d="M4.3 14.451h4.16A1.957 1.957 0 016.376 16 1.957 1.957 0 014.3 14.451zm2.079-1.032H.886a1.33 1.33 0 01-.5-.1.66.66 0 01-.128-1.129l.684-.5a3.7 3.7 0 001.626-3.1V5.341A4.249 4.249 0 015.855 1.11V0H6.9v1.068a4.228 4.228 0 013.533 4.273v3.252a3.7 3.7 0 001.626 3.1l.684.5a.66.66 0 01-.129 1.129 1.326 1.326 0 01-.5.1z"
        fill={props.color || '#fff'}
      />
    </Svg>
  );
}
