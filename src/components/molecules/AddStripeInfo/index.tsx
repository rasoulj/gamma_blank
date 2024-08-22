import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, CustomFormInput} from '~/components';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  quantity: yup.string(),
  reason: yup.string(),
  explanation: yup.string(),
  photos: yup.string(),
});

const AddStripeInfo = () => {
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, control, getValues} = methods;
  return (
    <FormProvider {...methods}>
      <CustomFormInput
        name={''}
        placeholder="pk_test_51N0Dn4..."
        label="Publishable Key"
      />
      <CustomFormInput
        name={''}
        placeholder="sk_test_51N0Dn4..."
        label="Secret Key"
      />
      <View style={{flex: 1}} />
      <Button style={{marginBottom: 10}}>Save</Button>
    </FormProvider>
  );
};

export default AddStripeInfo;

const styles = StyleSheet.create({});
