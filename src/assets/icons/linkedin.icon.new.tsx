import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {withMeasure} from '~/components/Wrapper';

function LinkedInIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}>
      <G transform="translate(-.463 -.463)">
        <Path
          data-name="Path 29920"
          d="M15.618 3a1.577 1.577 0 011.577 1.577v11.04a1.577 1.577 0 01-1.577 1.577H4.577A1.577 1.577 0 013 15.618V4.577A1.577 1.577 0 014.577 3h11.04m-.394 12.223v-4.18a2.571 2.571 0 00-2.571-2.571A2.285 2.285 0 0010.823 9.5v-.877h-2.2v6.6h2.2v-3.888a1.1 1.1 0 112.2 0v3.888h2.2M6.06 7.385A1.329 1.329 0 104.727 6.06 1.325 1.325 0 006.06 7.385m1.1 7.839v-6.6H4.971v6.6z"
          transform="translate(-.634 -.634)"
          fill={props.color ? props.color : '#898c8d'}
        />
        <Path
          data-name="Rectangle 3008"
          transform="translate(.463 .463)"
          fill="none"
          d="M0 0H18V18H0z"
        />
      </G>
    </Svg>
  );
}

export default withMeasure<any>(LinkedInIcon);
