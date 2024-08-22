import React, {useCallback, useRef, useState} from 'react';

import {Button, useNavigate, useRoute, useToast} from '~/components/elemental';
import {VStack} from 'native-base';
import ScheduleList from '../DatingCalendar/ScheduleTab/ScheduleList';
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} from './hooks';
import {useQueryClient} from 'react-query';
import {AppointmentStatus} from '../DatingCalendar/CalendarTab/CalendarItem';
import SuccessModal from './SuccessModal';
import NoScheduling from './NoScheduling';
import Header from './Header';

const DatingScheduling = () => {
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [hasNoData, setHasNoData] = useState(false);
  const params = useRoute()?.params;
  const user = params?.user;
  const mainUser = params?.mainUser ?? user;
  const appointmentId = useRoute()?.params?.appointmentId;
  const type = appointmentId ? 'edit' : 'add';
  const {toast} = useToast();
  const {navigation} = useNavigate();

  const ListHeaderComponent = useCallback(() => <Header user={user} />, [user]);

  const selectedItem = useRef<any>({});
  const selectedTimeIndex = useRef(-1);
  const onItemSelect = (item, timeIndex) => {
    selectedItem.current = item;
    selectedTimeIndex.current = timeIndex;
  };

  const {mutate, isLoading} =
    type === 'edit'
      ? useUpdateAppointmentMutation()
      : useCreateAppointmentMutation();
  const queryClient = useQueryClient();

  const onRequestPress = () => {
    const item = selectedItem?.current;
    if (!item || selectedTimeIndex.current === -1) {
      toast({message: 'Select one item at least', type: 'error'});
      return;
    }

    const time = item?.times?.split(',')[selectedTimeIndex?.current];

    let dateString = item?.date?.split('T')?.[0];
    let dateAndTime = dateString + 'T' + time?.split('.')?.[0] + '.000Z';

    const input = {
      otherUserId: user?.id,
      dateAndTime: dateAndTime,
      appointmentStatus: AppointmentStatus.PENDING,
      id: type === 'edit' ? appointmentId : undefined,
    };

    mutate(
      {
        input,
      },
      {
        onSuccess: data => {
          let resultStatus =
            data?.match_createAppointment?.status ??
            data?.match_updateAppointment?.status;

          if (resultStatus?.code === 1) {
            queryClient.invalidateQueries(['match_getAvailableTimes'], {
              exact: false,
            });
            queryClient.invalidateQueries(['match_getAppointments'], {
              exact: false,
            });
            setVisibleSuccess(true);
          } else
            toast({
              message: resultStatus?.value,
              type: 'error',
            });
        },
        onError: data => {
          toast({message: 'Something went wrong', type: 'error'});
        },
      },
    );
  };

  const onCloseSuccess = () => {
    setVisibleSuccess(false);
    navigation.goBack();
  };

  return (
    <>
      <VStack flex="1">
        {hasNoData ? (
          <NoScheduling onItemSelect={onItemSelect} />
        ) : (
          <ScheduleList
            Header={ListHeaderComponent}
            userId={mainUser?.id}
            selectable
            onItemSelect={onItemSelect}
            allowEmpty={false}
            setHasNoData={setHasNoData}
          />
        )}
        <Button onPress={onRequestPress} isLoading={isLoading}>
          Request
        </Button>
      </VStack>
      {visibleSuccess && (
        <SuccessModal
          isVisible={true}
          fullName={user?.fullName}
          onClose={onCloseSuccess}
        />
      )}
    </>
  );
};

export default DatingScheduling;
