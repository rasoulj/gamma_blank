import React from 'react';
import {Center as NativeCenter, ICenterProps} from 'native-base';
import {withMeasure} from '~/components/Wrapper';
const Center = (props: ICenterProps) => {
  return <NativeCenter {...props} />;
};

export default withMeasure<ICenterProps>(Center);
