import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import {
  Button,
  CustomColorPicker,
  CustomFormDatePicker,
  CustomFormInput,
  CustomSwitch,
  DropDown,
  Layer,
  LoadIndicator,
  Scrollable,
  SelectImage,
  Typography,
  convertTimeSpanToTime,
  toTimeSpan,
  useNavigate,
  useRoute,
  useToast,
} from '~/components/elemental';
import {model} from '~/data/model';
import CustomPriceInput from '../../../atoms/CustomPriceInput';
import {useCreateService, useGetServices, useUpdateService} from '../hook';
// import { useCreateProduct } from '../hook';

const schema = yup.object().shape({
  imageUrl: yup.string().required('Required'),
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.string().required('Required'),
  colors: yup.array(),
});

const EditService = ({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) => {
  const route: any = useRoute();
  const item = route?.params?.item;
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const {navigateWithName, navigation} = useNavigate();
  const [duration, setDuration] = useState('');
  const serviceDuration = {
    PT1H: '1 hour',
    PT2H: '2 hour',
    PT3H: '3 hour',
    PT4H: '4 hour',
  };
  const serviceListDuration = [
    {label: '1 hour', value: 'PT01H'},
    {label: '2 hours', value: 'PT02H'},
    {label: '3 hours', value: 'PT03H'},
    {label: '4 hours', value: 'PT04H'},
  ];
  const queryClient = useQueryClient();
  const [category, setCategory] = useState(null);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      price: item?.price,
      title: item?.title,
      description: item?.description,
      imageUrl: item?.photoUrl,
      date: item?.date,
      startTime: new Date(
        new Date().setHours(
          Number(convertTimeSpanToTime(item?.startTime).slice(0, 2)),
          Number(convertTimeSpanToTime(item?.startTime).slice(3, 5)),
        ),
      ),
      endTime: new Date(
        new Date().setHours(
          Number(convertTimeSpanToTime(item?.endTime).slice(0, 2)),
          Number(convertTimeSpanToTime(item?.endTime).slice(3, 5)),
        ),
      ),
    },
  });
  console.log('item?.startTime');

  const {handleSubmit, register, watch, setValue, reset} = methods;

  const categories = model?.constants?.productCategories || [];

  const categoryCreator = useMemo(() => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }
    return Data;
  }, []);
  console.log(category);

  useEffect(() => {
    setCategory(item?.category);
    setDuration(item?.duration);
  }, []);

  const {mutate, isLoading} = useUpdateService();
  const submitForm = async formData => {
    const result = await preAction?.(formData);
    if (result === false) {
      return;
    }
    let input: any = {
      id: item?.id,
      title: formData?.title,
      photoUrl: formData?.imageUrl,
      description: formData?.description,
      price: parseFloat(formData?.price),
      serviceType: 'IN_PERSON',
      duration: duration,
      category: category,
      startTime: toTimeSpan(formData?.startTime),
      endTime: toTimeSpan(formData?.endTime),
      date: new Date(formData?.date),
    };

    mutate(
      {input},
      {
        onSuccess: (data: any) => {
          console.log(data);

          if (data?.service_updateService?.status?.value === 'Success') {
            //   toast({message: 'Create success!'});
            navigateWithName('home');
            postAction?.(formData);

            setValue('imageUrl', '');
            setValue('title', '');
            setValue('description', '');
            setValue('price', '');
            setValue('category', '');
            setValue('duration', '');
            setValue('files', '');
          }
          queryClient.invalidateQueries(['getServices']);
        },
        onError: error => {
          console.log('error', error);

          // toast({message: error.toString()});
        },
      },
    );
  };

  return (
    <Layer style={{paddingHorizontal: 5, flex: 1}}>
      {isLoading && <LoadIndicator height="100%" />}
      <Scrollable
        data-id="from-scroll"
        data-name="Scrollable"
        contentContainerStyle={{paddingBottom: 10}}
        style={{position: 'relative', margin: 0, flex: 1}}>
        <FormProvider {...methods}>
          <SelectImage
            {...register('imageUrl')}
            style={{width: '100%', height: 180, borderRadius: 11}}
          />
          <Layer style={{height: 10}} />
          <CustomFormInput
            {...register('title')}
            placeholder="A short description"
            label="Title"
          />
          <Layer style={{height: 10}} />
          <CustomFormInput
            {...register('description')}
            placeholder="Text More About You"
            label="Description"
            textArea
          />
          <Layer style={{height: 10}} />
          <Typography style={{fontWeight: '500', marginVertical: 15}}>
            Category
          </Typography>
          <Layer
            style={{
              width: '100%',
              height: 45,
              alignSelf: 'center',
              zIndex: 3,
            }}>
            <DropDown
              data={categoryCreator}
              style={{zIndex: 3}}
              defaultValue={{label: category, value: category}}
              name="category"
              // fontSize={15}
              // data={categorys}
              onChangeValue={value => setCategory(value)}
            />
          </Layer>
          <Layer style={{height: 10}} />
          <CustomPriceInput
            {...register('price')}
            placeholder=""
            label="Price ($)"
          />

          <Layer style={{height: 10}} />
          <Typography
            style={{fontWeight: '500', marginTop: 15, marginBottom: 8}}>
            Service duration
          </Typography>
          <Layer
            style={{
              width: '100%',
              height: 45,
              alignSelf: 'center',
              zIndex: 3,
            }}>
            <DropDown
              data={serviceListDuration}
              style={{zIndex: 3}}
              defaultValue={{label: duration, value: duration}}
              name="duration"
              onChangeValue={value => setDuration(value)}
            />
          </Layer>
          <Layer style={{height: 10}} />
          {item?.serviceType === 'ONLINE' && (
            <>
              <CustomFormDatePicker
                name={`date`}
                type="date"
                label="Date"
                defaultValue={''}
                style={{borderRadius: 10, marginRight: 10}}
                hasArrow={false}
                my={0}
                // onChange={setStartTime}
                displayDjsFormat="MMMM DD, YYYY"
              />
              <Layer style={{height: 10}} />
              <Layer
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Layer style={{flex: 1}}>
                  <CustomFormDatePicker
                    name={`startTime`}
                    type="time"
                    label="Start Time"
                    defaultValue={''}
                    style={{borderRadius: 10, marginRight: 10}}
                    hasArrow={false}
                    my={0}
                    onChange={setStartTime}
                    maxValue={endTime}
                    displayDjsFormat="hh:mm a"
                  />
                </Layer>
                <Layer style={{flex: 1}}>
                  <CustomFormDatePicker
                    name={`endTime`}
                    type="time"
                    label="End Time"
                    defaultValue={''}
                    style={{borderRadius: 10}}
                    hasArrow={false}
                    my={0}
                    onChange={setEndTime}
                    minValue={startTime}
                    displayDjsFormat="hh:mm a"
                  />
                </Layer>
              </Layer>
            </>
          )}
        </FormProvider>
        <Button
          style={{marginTop: 40, height: 45}}
          onPress={handleSubmit(submitForm)}>
          Save
        </Button>
      </Scrollable>
    </Layer>
  );
};

export default EditService;
