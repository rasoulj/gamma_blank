import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function EndCallIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={37.609}
      height={37.609}
      viewBox="0 0 37.609 37.609"
      {...props}>
      <G data-name="Dark Theme/ Send">
        <G data-name="Group 21015">
          <G data-name="Group 21014">
            <G data-name="Group 21013">
              <Path
                data-name="Path 32775"
                d="M26.408 19.538l-3.715-3.715a2.471 2.471 0 00-4.113.929 2.528 2.528 0 01-2.919 1.592c-2.654-.663-6.236-4.113-6.9-6.9a2.4 2.4 0 011.592-2.919 2.471 2.471 0 00.929-4.113L7.567.7a2.65 2.65 0 00-3.582 0L1.464 3.218c-2.521 2.654.265 9.686 6.5 15.922s13.268 9.155 15.922 6.5l2.521-2.521a2.65 2.65 0 00.001-3.581z"
                transform="translate(5.749 4.383) rotate(135 14.385 14.196) translate(.539) translate(1.122 1.665)"
                fill="#fff"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default EndCallIcon;
