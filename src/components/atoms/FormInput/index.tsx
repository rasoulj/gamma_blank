import React, {ForwardedRef} from 'react';
import {useController, useFormContext} from 'react-hook-form';
import FormTextInput from '../FormTextInput';
import Typography from '../Typography';

const FormInput = React.forwardRef(
  ({name, required, ...props}: any, ref: ForwardedRef<any>) => {
    const {fieldState} = useController({name: name || ''});
    const {register} = useFormContext();

    return (
      <>
        <FormTextInput {...props} ref={ref} {...register(name, {required})} />
        {fieldState.error && (
          <Typography>{fieldState.error.message}</Typography>
        )}
      </>
    );
  },
);

export default FormInput;
