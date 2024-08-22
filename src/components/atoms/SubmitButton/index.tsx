import React from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormReset,
  useFormContext,
} from 'react-hook-form';
import Button from '../Button';
import {IButtonProps} from 'native-base';
import {print} from '~/utils/methods';

interface Props extends Omit<IButtonProps, 'onPress'> {
  children?: any;
  onPress: (e: SubmitHandler<FieldValues>) => void;
  preAction?: Function;
  postAction?: Function;
}

export default function SubmitButton({
  children,
  onPress,
  preAction,
  postAction,
  ...props
}: Props) {
  const {handleSubmit, reset} = useFormContext();

  return (
    <Button
      colorScheme={'primary'}
      onPress={handleSubmit(submitForm)}
      {...props}>
      {children}
    </Button>
  );

  async function submitForm(values) {
    if (
      typeof preAction === 'function' &&
      (await preAction(values)) === false
    ) {
      return;
    }

    onPress?.(values);
    if (props?.reset) {
      print('reset', props.reset, values);
      reset();
    }
    if (typeof postAction === 'function') postAction(values);
  }
}
