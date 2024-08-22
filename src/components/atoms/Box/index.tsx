import React from 'react';
import {Box as NativeBox, IBoxProps} from 'native-base';
import {withMeasure} from '~/components/Wrapper';
const Box = (props: IBoxProps) => {
  return <NativeBox {...props} />;
};

export default withMeasure<IBoxProps>(Box);
