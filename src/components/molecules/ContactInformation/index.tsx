import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Button,
  CustomFormInput,
  Layer,
  RoundedEditIcon,
  Typography,
  getColor,
  isDark,
  useGetCurrentUser,
  useNavigate,
} from '~/components';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TouchableOpacity} from 'react-native';
import BookingPaymentSuccess from './Modals/BookingPaymentSuccess';
import {useCreateBooking} from './hook';
const schema = yup.object().shape({
  fullName: yup.string().required('Required'),
  phoneNumber: yup.string().required('Required'),
});

const ContactInformation = () => {
  const route: any = useRoute();
  const item: any = route?.params?.item;

  console.log(item);

  const {navigateWithName} = useNavigate();

  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, control} = methods;
  const {data: userAddress}: any = useGetCurrentUser(null);

  const Address = userAddress?.user_getCurrentUser?.result;
  const navigateToPaymentScreen = data => {
    navigateWithName('payment', {
      ...item,
      ...data,
      type: 'BOOKING',
      address: Address?.location,
    });
  };
  const {mutate: mutateCreateBooking, isLoading} = useCreateBooking();
  const [isSuccessBookingVisible, setIsSuccessBookingVisible] = useState(false);

  const sendRequest = data => {
    console.log('sdfsd');

    mutateCreateBooking(
      {
        input: {
          contractorId: item?.contractorId,
          startTime: item?.startTime,
          endTime: item?.endTime,
          price: item?.price,
          serviceId: item?.serviceId,
          fullName: item?.fullName,
          phoneNumber: item?.phoneNumber,
          status: 'PENDING',
          paid: false,
          address: '',
          ...data,
        },
      },
      {
        onSuccess(data, variables, context) {
          console.log(data);
          if (data?.booking_createBooking?.status?.code === 1) {
            setIsSuccessBookingVisible(true);
            // toast({
            //   message: 'You have successfully booked a time slot.',
            // });
          }
        },
      },
    );
  };

  return (
    <Layer style={{flex: 1}}>
      <CustomFormInput
        {...register('fullName')}
        placeholder="Full Name"
        label="Full Name"
        control={control}
      />
      <CustomFormInput
        {...register('phoneNumber')}
        placeholder="Phone number (+1...)"
        keyboardType="phone-pad"
        label="Phone number"
        control={control}
      />
      <Button
        isLoading={isLoading}
        style={{width: '100%', position: 'absolute', bottom: 10}}
        onPress={handleSubmit(sendRequest)}>
        Save
      </Button>
      <BookingPaymentSuccess
        isVisible={isSuccessBookingVisible}
        onClose={() => setIsSuccessBookingVisible(false)}
      />
    </Layer>
  );
};

export default ContactInformation;

const styles = StyleSheet.create({});
