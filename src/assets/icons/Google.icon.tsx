import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {withMeasure} from '~/components/Wrapper';

function GoogleIcon(props: any) {
  const {color} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}>
      <Path
        d="M15.871 8.519H9.3v1.956h4.664c-.236 2.73-2.507 3.9-4.657 3.9a5.137 5.137 0 01-5.149-5.211 5.134 5.134 0 015.158-5.208 5.035 5.035 0 013.51 1.411l1.361-1.418A6.927 6.927 0 009.244 2 7.284 7.284 0 002.03 9.164a7.253 7.253 0 007.322 7.164 6.3 6.3 0 006.627-6.512 6.456 6.456 0 00-.108-1.297z"
        transform="translate(-.173 -.164)"
        fill={color ? color : '#898c8d'}
      />
      <Path fill="none" d="M0 0H18V18H0z" />
    </Svg>
  );
}

export default withMeasure<any>(GoogleIcon);
