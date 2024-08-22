import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {scale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import {
  Button,
  CustomFormInput,
  HStack,
  Layer,
  Scrollable,
  SelectImage,
  Text,
  Typography,
  useNavigate,
  useToast,
  VStack,
  useRoute,
} from '~/components/elemental';
import {model} from '~/data/model';
import DatePicker from '../../atoms/DatePicker';
import Dropdown from '../../atoms/DropDown';
import {useUpdateEvent} from './hook';
import TextInputPrice from './TextInputPrice';

const schema = yup.object().shape({
  imageUrl: yup.string().required('Required'),
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  date: yup.string().required('Required'),
  city: yup.string().required('Required'),
  state: yup.string().required('Required'),
  zipCode: yup.string().required('Required'),
  streetAddress: yup.string().required('Required'),
  price: yup.string(),
});

const EditEvent = ({
  navigateTo,
  textColor,
  eventTypeId,
  preAction,
}: {
  navigateTo?: any;
  textColor?: any;
  eventTypeId?: any;
  preAction?: (values) => boolean;
}) => {
  const route: any = useRoute();
  const event = route?.params?.item?.event;
  const {toast} = useToast();
  const {navigateWithName} = useNavigate();
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    defaultValues: {
      imageUrl: event?.imageUrl,
      title: event?.title,
      description: event?.description,
      date: event?.date,
      city: event?.city,
      state: event?.state,
      zipCode: event?.zipCode,
      streetAddress: event?.streetAddress,
      price: String(event?.price),
    },
  });

  console.log(event);

  const [category, setCategory] = useState(null);
  const [categorys, setCategorys] = useState([]);

  const categories = model?.metaData?.constants?.eventCategories || [];

  const categoryCreator = () => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }
    setCategorys(Data);
  };
  useEffect(() => {
    categoryCreator();
    setCategory(event?.category);
  }, [model]);
  const queryClient = useQueryClient();

  const {handleSubmit, register, formState, watch, setValue, control, reset} =
    methods;

  const {mutate, isLoading} = useUpdateEvent();

  const submitForm = async formData => {
    const result = await preAction?.(formData);
    if (result === false) {
      return;
    }
    let input = {
      id: event?.id,
      title: formData?.title,
      imageUrl: formData?.imageUrl ? formData?.imageUrl : '',
      description: formData?.description,
      city: formData?.city ? formData?.city : '',
      state: formData?.state ? formData?.state : '',
      eventTypeId: eventTypeId || 4,
      streetAddress: formData?.streetAddress ? formData?.streetAddress : '',
      capacity: 100,
      date: new Date(formData?.date),
      startTime: toTimeSpan(formData?.startTime),
      endTime: toTimeSpan(formData?.endTime),
      price: parseFloat(formData?.price),
      currency: 'Currency',
      category: category,
      zipCode: formData?.zipCode ? formData?.zipCode : '',
    };

    mutate(
      {input},
      {
        onSuccess: success => {
          console.log(success);
          reset();
          toast({message: 'Updated!'});
          queryClient.invalidateQueries(['getEvents']);
          navigateWithName('Event management');
        },
        onError: error => {
          console.log(error);
          toast({message: error.toString()});
        },
      },
    );
  };
  return (
    <>
      <Scrollable
        data-id="from-scroll"
        data-name="Scrollable"
        contentContainerStyle={{marginBottom: 100}}>
        <FormProvider {...methods}>
          <VStack space="2">
            <SelectImage
              {...register('imageUrl')}
              style={{width: '100%', height: 180, borderRadius: 11}}
            />
            <CustomFormInput
              {...register('title')}
              placeholder="A short description"
              label="Title"
            />
            <Layer style={{height: 5}} />
            <Typography style={{fontWeight: '500', marginVertical: 5}}>
              Category
            </Typography>
            <Layer
              style={{
                width: '100%',
                alignSelf: 'center',
                zIndex: 2,
              }}>
              <Dropdown
                data={categorys}
                style={{zIndex: 3}}
                name="category"
                defaultValue={category}
                // fontSize={15}
                onChangeValue={value => setCategory(value)}
              />
            </Layer>

            <TextInputPrice
              {...register('price')}
              placeholder="For Example $170"
              label="Price"
            />
            <CustomFormInput
              {...register('description')}
              placeholder="Text More About You"
              label="Description"
              textArea
            />
            <DatePicker
              {...register('date')}
              type="date"
              title={'Date'}
              defaultValue={event?.date}
            />
            <HStack justifyContent="space-between" alignItems="center" mt={2}>
              <DatePicker
                {...register('startTime')}
                type="time"
                title={'Start Time'}
                defaultValue={new Date(event?.date).setHours(
                  event?.startTime?.split('PT')[1].split('H')[0],
                  event?.startTime?.split('H')[1].split('M')[0],
                )}
              />
              <DatePicker
                {...register('endTime')}
                type="time"
                title={'End Time'}
                placeholder={event?.endTime}
                defaultValue={new Date(event?.date).setHours(
                  event?.endTime?.split('PT')[1].split('H')[0],
                  event?.endTime?.split('H')[1].split('M')[0],
                )}
              />
            </HStack>
            <CustomFormInput
              {...register('state')}
              placeholder="California"
              label="State"
            />
            <CustomFormInput
              {...register('city')}
              placeholder="New York"
              label="City"
            />
            <CustomFormInput
              {...register('streetAddress')}
              placeholder="Street Address"
              label="Street Address"
            />
            {/* <TextInput
              {...register('place')}
              placeholder="Place"
              label="Place"
            /> */}
            <CustomFormInput
              {...register('zipCode')}
              placeholder="Zipcode"
              label="Zipcode"
            />
          </VStack>
          <VStack
            style={{
              marginVertical: 50,
            }}>
            <Button
              isLoading={isLoading}
              style={{marginBottom: scale(0)}}
              onPress={handleSubmit(submitForm)}>
              <Text color="white">Save</Text>
            </Button>
          </VStack>
        </FormProvider>
      </Scrollable>
    </>
  );
};

export default EditEvent;

export function toTimeSpan(date: string) {
  try {
    let d = new Date(date);
    let time = d.toLocaleTimeString('en-US').split(':');
    return `PT${time[0]}H${time[1]}M`;
  } catch (error) {}
}
