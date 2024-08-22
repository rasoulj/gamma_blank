import React from 'react';
import TextArea from '../TextArea';
import Typography from '../Typography';
import {useController, useFormContext} from 'react-hook-form';

export default function FormTextArea({name, ...props}: any) {
  const {fieldState} = useController({name});
  const {register} = useFormContext();

  return (
    <>
      <TextArea {...props} {...register(name)} />
      {fieldState.error && <Typography>{fieldState.error.message}</Typography>}
    </>
  );
}
