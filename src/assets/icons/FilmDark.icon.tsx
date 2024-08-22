import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function FilmDarkIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26.917}
      height={15.814}
      viewBox="0 0 26.917 15.814"
      {...props}>
      <G data-name="Group 21001">
        <G data-name="Group 20998">
          <G data-name="Group 20997">
            <Path
              data-name="Path 32773"
              d="M15.225 96.512H2.945A2.954 2.954 0 000 99.457v9.924a2.954 2.954 0 002.945 2.945h12.28a2.954 2.954 0 002.945-2.945v-9.924a2.935 2.935 0 00-2.945-2.945z"
              transform="translate(0 -96.512) translate(0 96.512) translate(0 -96.512)"
              fill={props.color || '#52525b'}
            />
          </G>
        </G>
        <G data-name="Group 21000">
          <G data-name="Group 20999">
            <Path
              data-name="Path 32774"
              d="M346.6 123.895a1.5 1.5 0 00-.5.206l-4.594 2.65v6.832l4.624 2.65a1.751 1.751 0 002.415-.648 1.8 1.8 0 00.236-.883v-9.1a1.772 1.772 0 00-2.181-1.707z"
              transform="translate(0 -96.512) translate(19.643 98.084) translate(-341.504 -123.847)"
              fill={props.color || '#52525b'}
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default FilmDarkIcon;
