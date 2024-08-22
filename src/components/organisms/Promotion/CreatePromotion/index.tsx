import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';
import {
  Button,
  CustomFormInput,
  DatePicker,
  Layer,
  ScrollView,
  SelectImage,
  useNavigate,
  useRoute,
  useToast,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import { useCreatePromotion, useUpdatePromotion } from '../hook';

const schema = yup.object().shape({
  title: yup.string().required(),
  photoUrl: yup.string().required(),
  discount: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
});

const CreatePromotion = () => {
  const route: any = useRoute();
  let endDate = useMemo(() => {
    return new Date(route?.params?.item?.endDate || new Date());
  }, []);
  let startDate = useMemo(() => {
    return new Date(route?.params?.item?.startDate || new Date());
  }, []);

  const {navigateWithName} = useNavigate();

  const queryClient = useQueryClient();
  const {toast} = useToast();
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    defaultValues: {
      title: route?.params?.item?.title,
      photoUrl: route?.params?.item?.photoUrl,
      discount: route?.params?.item?.discount,
    },
  });

  const {} = useHeader({
    title: {
      children: route?.params?.item?.title
        ? 'Edit Promotions'
        : 'Add Promotions',
      fontSize: 'md',
      fontWeight: 'bold',
    },
  });
  const {handleSubmit, register, watch} = methods;
  const startDateWatch = watch("startDate")

  const {mutate: mutateCreatePromotion, isLoading} = useCreatePromotion();
  const {mutate: mutateUpdatePromotion, isLoading: isLoadingUpdate} =
    useUpdatePromotion();

  const selectProducts = formData => {
    const input = {
      id: route?.params?.item?.id,
      title: formData?.title,
      photoUrl: formData?.photoUrl,
      discount: Number(formData?.discount),
      startDate: new Date(formData?.startDate),
      endDate: new Date(formData?.endDate),
      userId: route?.params?.item?.userId,
    };
    if (route?.params?.item?.id) {
      mutateUpdatePromotion(
        {input},
        {
          onSuccess(data) {
            console.log(data);
            if (data?.ecommerce_updatePromotion?.status?.code === 1) {
              navigateWithName('Select product', {
                item: data?.ecommerce_updatePromotion?.result,
              });
              queryClient.invalidateQueries(['getPromotion']);
              queryClient.invalidateQueries(['getProducts']);
            }else if (
              data?.ecommerce_updatePromotion?.status?.value ===
              'NotFound'
            ) {
              toast({
                message: 'This promotion already removed',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            } else {
              toast({
                message: data?.ecommerce_updatePromotion?.status?.description,
              });
            }
          },
        },
      );
    } else {
      mutateCreatePromotion(
        {input},
        {
          onSuccess(data) {
            if (data?.ecommerce_createPromotion?.status?.code === 1) {
              navigateWithName('Select product', {
                item: data?.ecommerce_createPromotion?.result,
              });
            } else {
              toast({
                message: data?.ecommerce_createPromotion?.status?.description,
              });
            }
          },
        },
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <FormProvider {...methods}>
        <SelectImage
          {...register('photoUrl')}
          style={styles.image}
        />
        <CustomFormInput
          {...register('title')}
          name={'title'}
          required
          placeholder="Text More About You"
          label="Title"
        />
        <CustomFormInput
          {...register('discount')}
          name={'discount'}
          required
          keyboardType="number-pad"
          placeholder="0%"
          label="Discount"
        />
        <Layer style={styles.dateContainer}>
          <DatePicker
            {...register('startDate')}
            name={'startDate'}
            type="date"
            required
            label="Start Date"
            minimumDate={new Date()}
            style={styles.startDate}
            defaultValue={startDate}
          />
          <DatePicker
            {...register('endDate')}
            name={'endDate'}
            type="date"
            required
            label="End Date"
            minimumDate={new Date(startDateWatch ? startDateWatch : null)}
            style={styles.endDate}
            defaultValue={endDate}
          />
        </Layer>
        <Layer style={styles.flex} />
        <Button
          isLoading={isLoading || isLoadingUpdate}
          style={styles.button}
          onPress={handleSubmit(selectProducts)}>
          {route?.params?.item?.id ? 'Edit products' : 'Select products'}
        </Button>
      </FormProvider>
    </ScrollView>
  );
};

export default CreatePromotion;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  container: {flexGrow: 1},
  button: {height: 49, marginVertical: 20},
  startDate: {flex: 1, marginRight: 16},
  endDate: {flex: 1},
  image:{width: '100%', height: 180, borderRadius: 11},
  dateContainer:{flexDirection: 'row'},
  flex:{flex: 1}
});
