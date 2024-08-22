import React from 'react';
import {Switch as NativeSwitch, ISwitchProps} from 'native-base';

const Switch = (props: ISwitchProps) => {
  return <NativeSwitch {...props} />;
};

export default Switch;
