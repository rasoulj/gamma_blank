import React from 'react';
import {withMeasure} from '~/components/Wrapper';
import {VStack as NativeVStack} from 'native-base';
import {IVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
const VStack = (props: IVStackProps) => {
  return <NativeVStack {...props} />;
};

export default withMeasure<IVStackProps>(VStack);
