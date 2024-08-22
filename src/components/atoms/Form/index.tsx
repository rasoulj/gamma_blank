import React from 'react';
import Layer from '../Layer';
import {FormProvider, useForm} from 'react-hook-form';

export default function Form({children, ...props}: any) {
  const methods = useForm();

  return (
    <Layer {...props}>
      <FormProvider {...methods}>{children}</FormProvider>
    </Layer>
  );
}
