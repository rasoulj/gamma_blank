import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Calendar,
  ScrollView,
  View,
  convertTimeSpanToTime,
  useNavigate,
  useRoute,
} from '~/components';
import ChooseTime from './ChooseTime';
import {useGetAppointmentByDate} from './hook';

const AppointmentScheduling = () => {
  const route: any = useRoute();
  const item: any = route?.params?.item?.service;

  const {navigateWithName} = useNavigate();
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState('');

  const {data, isLoading}: any = useGetAppointmentByDate({
    userId: item?.userId,
    date: day,
  });

  // const {data: AppointmentTimeData} = useGetAppointmentTime({
  //   userId: item?.userId,
  // });

  // const {data:datas} = useGetAvailableDays({
  //   input: {
  //     contractorId: item?.userId,
  //     startDate: new Date(),
  //     endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  //     serviceDuration: "PT01H",
  //   },
  // });

  // const availableTimes = AppointmentTimeData?.pages?.map(item => {
  //   const startOnDATE = new Date(item?.startsOn);

  //   return `${startOnDATE.getFullYear()}-${
  //     startOnDATE.getMonth() + 1
  //   }-${startOnDATE.getDate()}`;
  // });

  // console.log('availableTimecwds ===> ', datas?.pages);

  const timerHandler = data?.pages[0]?.periods?.map(i => {
    return {
      label: convertTimeSpanToTime(i?.startTime),
      value: convertTimeSpanToTime(i?.startTime),
    };
  });

  return (
    <View style={{flexGrow: 1}}>
      <Calendar shape="available" selectDay={v => [setDay(v), setTime('')]} />
      <ChooseTime
        data={timerHandler}
        isLoading={isLoading}
        time={time}
        setTime={setTime}
      />
      <Button
        style={{
          width: '100%',
          height: 49,
          alignSelf: 'center',
          marginVertical: 16,
          position:"absolute",
          bottom:10
        }}
        isLoading={false}
        onPress={() =>
          navigateWithName('ShippingAddress', {
            item: {
              contractorId: item?.userId,
              startTime: new Date(
                new Date(day).setHours(
                  Number(time?.slice(0, 2)),
                  Number(time?.slice(3, 5)),
                ),
              ),
              endTime: new Date(
                new Date(day).setHours(
                  Number(time?.slice(0, 2)),
                  Number(time?.slice(3, 5)) +
                    Number(convertTimeSpanToTime(item?.duration).slice(3.4)) ||
                    1,
                ),
              ),
              price: item?.price,
              serviceId: item?.id,
              fullName: '',
              phoneNumber: '',
              status: 'PENDING',
              paid: true,
              address: '',
            },
          })
        }>
        Next
      </Button>
    </View>
  );
};

export default AppointmentScheduling;

const styles = StyleSheet.create({});
