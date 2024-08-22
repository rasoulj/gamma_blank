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
  useToast,
} from '~/components/elemental';
import {model} from '~/data/model';
import CustomPriceInput from '../../../atoms/CustomPriceInput';
import {useCreateService} from '../hook';
// import { useCreateProduct } from '../hook';

const schema = yup.object().shape({
  imageUrl: yup.string().required('Required'),
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.string().required('Required'),
  colors: yup.array(),
});

const CreateService = ({
  preAction,
  postAction,
  type = 'IN_PERSON',
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
  type?: 'IN_PERSON' | 'ONLINE';
}) => {
  const {navigateWithName, navigation} = useNavigate();
  const [duration, setDuration] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const serviceDuration = [
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
      colors: [],
      price: 1,
    },
  });

  const {handleSubmit, register, watch, setValue, reset} = methods;

  const categories = model?.constants?.contentCategories || ['cat1', 'cat2'];

  console.log(categories);

  const categoryCreator = useMemo(() => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }
    return Data;
  }, []);

  const {mutate, isLoading} = useCreateService();
  const submitForm = async formData => {
    console.log(formData);

    const result = await preAction?.(formData);
    if (result === false) {
      return;
    }
    let input: any = {
      title: formData?.title,
      photoUrl: formData?.imageUrl,
      description: formData?.description,
      price: parseFloat(formData?.price),
      serviceType: type,
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

          if (data?.service_createService?.status?.value === 'Success') {
            //   toast({message: 'Create success!'});

            postAction?.(formData);

            setValue('imageUrl', '');
            setValue('title', '');
            setValue('description', '');
            setValue('price', '');
            setValue('category', '');
            setValue('duration', '');
            setValue('files', '');
            navigation?.goBack();
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
              // onSelect={value => setCategory(value)}
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
              data={serviceDuration}
              style={{zIndex: 3}}
              defaultValue={{
                label: serviceDuration[duration],
                value: serviceDuration[duration],
              }}
              name="duration"
              onChangeValue={value => setDuration(value)}
            />
            <Layer style={{height: 10}} />
            {type === 'ONLINE' && (
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
          </Layer>
          {type === 'ONLINE' && (
            <>
              <Layer style={{height: 60}} />
              <Layer style={{height: 80}} />
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

export default CreateService;
