import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {withMeasure} from '~/components/Wrapper';

function FacebookIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}>
      <Path
        d="M9.412 2.04A7.429 7.429 0 008.255 16.8v-5.184H6.373V9.467h1.882V7.829a2.613 2.613 0 012.8-2.883 11.619 11.619 0 011.653.141v1.83h-.934a1.072 1.072 0 00-1.208 1.156v1.394h2.06l-.334 2.149h-1.724V16.8A7.429 7.429 0 009.412 2.04z"
        transform="translate(-.412 -.422)"
        fill={props.color ? props.color : '#898c8d'}
      />
      <Path fill="none" d="M0 0H18V18H0z" />
    </Svg>
  );
}

export default withMeasure<any>(FacebookIcon);
