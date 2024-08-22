import React, {useState} from 'react';
import {
  Header,
  VStack,
  WorkingScheduleItems,
  Button,
  useToast,
  LoadIndicator,
  useNavigate,
  getColor,
} from '~/components/elemental';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateWorkingSchedules, useUpdateWorkingSchedule} from './hook';
import {useQueryClient} from 'react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {TouchableOpacity} from 'react-native';
import SelectedItemHeader from './SelectedItemHeader';
dayjs.extend(duration);
const schema = yup.object().shape({
  items: yup.array(
    yup.object({
      dayOfWeek: yup.object({
        label: yup.string(),
        value: yup.string(),
      }),
      periods: yup.array(
        yup.object({startTime: yup.string(), endTime: yup.string()}),
      ),
      repeatType: yup.object({
        label: yup.string(),
        value: yup.string().required('Required'),
      }),
      repeatEveryValue: yup
        .number()
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .nullable(),
      repeatEveryType: yup.object({label: yup.string(), value: yup.string()}),
      endsOn: yup.string().nullable(),
      endsAfter: yup
        .number()
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .nullable(),
    }),
  ),
});
function convertDateToTimeSpan(date: string) {
  try {
    let d = new Date(date);
    let time = d.toLocaleTimeString('en-US').split(':');
    return `PT${time[0]}H${time[1]}M`;
  } catch (error) {}
}
const convertTimeSpanToDate = (timeSpan: string) => {
  /// required for set date in calendar
  if (!timeSpan) return new Date();
  const times = timeSpan.replace('PT', '').replace('M', '').split('H');
  if (times?.length === 2) {
    const localDateString = new Date();
    localDateString.setHours(
      times[0] === '' ? 0 : parseInt(times[0]),
      times[1] === '' ? 0 : parseInt(times[1]),
      0,
    );
    return localDateString;
  } else return new Date();
};
const WorkingSchedule = ({item}: {item: any}) => {
  const {navigation} = useNavigate();
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      items: [
        item
          ? {
              dayOfWeek: {
                value: item?.dayOfWeek,
              },
              periods: item?.periods?.map((period, index) => {
                return {
                  startTime: new Date(convertTimeSpanToDate(period?.startTime)),
                  endTime: new Date(convertTimeSpanToDate(period?.endTime)),
                  id: Math.random().toString(16).slice(2),
                };
              }),
              repeatType: {
                value: item?.repeatType,
              },
              repeatEveryValue: item?.repeatEveryValue,
              repeatEveryType: {
                value: item?.repeatEveryType,
              },
              endsOn: item?.endsOn,
              endsAfter: item?.endsAfter,
            }
          : {periods: [{}]},
      ],
    },
  });
  const {
    control,
    trigger,
    handleSubmit,
    formState: {errors},
  } = methods;
  console.log(JSON.stringify({errors}), {item});
  const {mutate, isLoading} = useCreateWorkingSchedules();
  const {mutate: updateMutate, isLoading: updateLoading} =
    useUpdateWorkingSchedule();
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const onSubmit = formData => {
    if (formData?.items?.length < 1) {
      toast({
        message: 'At least one item is required',
        style: {
          backgroundColor: getColor({color: 'error.500'}),
          textColor: 'white',
        },
      });
      return;
    }
    let input = formData?.items?.map((item: any) => {
      return {
        dayOfWeek: item?.dayOfWeek?.value,
        endsAfter: item?.endsAfter,
        endsOn: item?.endsOn ? new Date(item?.endsOn) : undefined,
        periodList: item?.periods?.map(
          (item: {endTime: string; startTime: string}) => {
            return {
              endTime: convertDateToTimeSpan(item?.endTime),
              startTime: convertDateToTimeSpan(item?.startTime),
            };
          },
        ),
        repeatEveryType: item?.repeatEveryType?.value,
        repeatEveryValue: item?.repeatEveryValue,
        repeatType: item?.repeatType?.value,
        startsOn: item?.startsOn,
      };
    });
    console.log(JSON.stringify({input}));
    if (!item)
      mutate(
        {input},
        {
          onSuccess: (data: any) => {
            console.log(JSON.stringify({data}));
            if (
              data?.workingSchedule_createWorkingSchedules?.status?.code === 1
            ) {
              toast({message: 'Success'});
              queryClient.invalidateQueries(['getWorkingSchedules'], {
                exact: false,
              });
              onGoBack();
            } else {
              toast({
                message:
                  data?.workingSchedule_createWorkingSchedules?.status?.value,
              });
            }
          },
          onError: errorData => {
            toast({message: 'Something went wrong'});
          },
        },
      );
    else {
      updateMutate(
        {input: {...input[0], id: item?.id}},
        {
          onSuccess: data => {
            console.log(JSON.stringify({data}));
            if (
              data?.workingSchedule_updateWorkingSchedule?.status?.code === 1
            ) {
              toast({message: 'Success'});
              queryClient.invalidateQueries(['getWorkingSchedules'], {
                exact: false,
              });
              onGoBack();
            } else {
              toast({
                message:
                  data?.workingSchedule_updateWorkingSchedule?.status?.value,
              });
            }
          },
          onError: errorData => {
            toast({message: 'Something went wrong'});
          },
        },
      );
    }
  };
  const onGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        {(isLoading || updateLoading) && <LoadIndicator />}
        <VStack space="12px" my="24px" flex="1">
          <WorkingScheduleItems
            name="items"
            control={control}
            trigger={trigger}
            type={item?.id ? 'edit' : 'add'}
          />
        </VStack>
        <Button
          style={{height: 49, marginTop: -12}}
          onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
      </FormProvider>
    </>
  );
};
export default WorkingSchedule;
