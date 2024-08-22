import React from 'react';
import {Heading, IHeadingProps} from 'native-base';
import {withMeasure} from '~/components/Wrapper';
const Typography = (props: IHeadingProps) => {
  return <Heading {...props} />;
};

export default withMeasure<IHeadingProps>(Typography);
