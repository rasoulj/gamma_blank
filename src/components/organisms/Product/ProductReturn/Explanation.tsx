import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useHeader from '~/components/elemental/hooks/use_header';
import {
  Button,
  CustomFormInput,
  DropDown,
  Form,
  Layer,
  ScrollView,
  UploadFile,
} from '~/components/elemental';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import OrderItem from './OrderItem';

const schema = yup.object().shape({
  quantity: yup.string(),
  explanation: yup.string(),
  photos: yup.string(),
});
const reasonsOfReturning = [
  {label: 'Change of Mind', value: 'Change of Mind'},
  {label: 'Wrong Item Ordered', value: 'Wrong Item Ordered'},
  {label: 'Shipping Delay', value: 'Shipping Delay'},
  {label: 'Price Discrepancy', value: 'Price Discrepancy'},
  {label: 'Product Unavailability', value: 'Product Unavailability'},
  {
    label: 'Dissatisfaction with Product Description',
    value: 'Dissatisfaction with Product Description',
  },
  {label: 'Better Product Reviews', value: 'Better Product Reviews'},
  {label: 'Shipping Cost', value: 'Shipping Cost'},
];
const Explanation = ({onChange, isLoading, products}) => {
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, control, getValues} = methods;
  const {} = useHeader({
    title: {children: 'Return Details', fontSize: 'md', fontWeight: 'bold'},
  });
  return (
    <>
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        {products?.map(i => {
          return (
            <View style={{marginTop: 10}}>
              <OrderItem item={i} selectedItem={null} haveCheckBox={false} />
            </View>
          );
        })}
        <FormProvider {...methods}>
          <DropDown
            {...register('reason')}
            data={reasonsOfReturning}
            name={'reason'}
            placeholder="Input Text Here"
            label="Reason of Returning"
            required
          />
          <CustomFormInput
            {...register('explanation')}
            name={'explanation'}
            textArea
            placeholder="Input Text Here"
            label="Explanation"
            required
          />
          <UploadFile name={'files'} control={control} multiple type="image" />
        </FormProvider>
      </ScrollView>
      <Button
        isLoading={isLoading}
        onPress={handleSubmit(onChange)}
        style={{marginBottom: 10}}>
        Send Request
      </Button>
    </>
  );
};

export default Explanation;

const styles = StyleSheet.create({});
