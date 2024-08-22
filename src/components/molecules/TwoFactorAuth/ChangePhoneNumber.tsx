import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, CustomFormInput, Form, Layer} from '~/components/elemental';
import Dropdown from '~/components/atoms/DropDown';
import {useGetCountries} from './hook';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  addressName: yup.string(),
  // country: yup.object(),
  // state: yup.object(),
  street: yup.string(),
  number: yup.string(),
  floor: yup.string(),
  zipcode: yup.string(),
});

const ChangePhoneNumber = () => {
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const {handleSubmit, register, setValue, getValues, formState, watch} =
    methods;
  const {data: countriesData}: any = useGetCountries();

  const getStates = data => {
    let states = [];
    for (let i = 0; i < data?.length; i++) {
      states = [...states, {value: data[i]?.data, label: data[i]?.data}];
    }
    return states;
  };
  

  return (
    <Layer style={{flexGrow: 1}}>
      <Form>
        <Dropdown
          data={getStates(countriesData?.pages) || []}
          style={styles.dropDown}
          name="country"
          label={'Country'}
        />
        <CustomFormInput
          {...register('phoneNumber')}
          style={styles.inputPhoneNumber}
          placeholder="+0000000000"
          label="Phone Number"
        />
      </Form>
      <Button
        style={{position: 'absolute', bottom: 10, width: '100%', height: 49}}>
        Verify
      </Button>
    </Layer>
  );
};

export default ChangePhoneNumber;

const styles = StyleSheet.create({
  inputPhoneNumber:{marginTop: 8},
  dropDown:{zIndex: 3, height: 50}
});
