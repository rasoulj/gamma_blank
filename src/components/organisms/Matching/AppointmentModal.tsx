import React, {useMemo, useRef} from 'react';
import {
  ActionSheet,
  Image,
  Typography,
  HStack,
  Button,
  VStack,
  deviceWidth,
  deviceHeight,
  useToast,
  ConfirmationActionSheet,
  useNavigate,
} from '~/components';
import useAppointmentStore from '~/stores/appointmentStore';
import {StyleSheet} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import {appFormatDate} from '~/utils/helper';
import {getTime} from '../DatingCalendar/helper';
import {useUpdateAppointmentMutation} from '../DatingScheduling/hooks';
import {AppointmentStatus} from '../DatingCalendar/CalendarTab/CalendarItem';
import useAuthStore from '~/stores/authStore';

export default function AppointmentModal() {
  const user = useAuthStore(state => state.user);
  const {isOpen, setIsOpen, relatedEntity, relatedUser, setVisibleNotNow} =
    useAppointmentStore();
  const {toast} = useToast();

  const isCurrentUser = useMemo(() => {
    return relatedUser?.id === user?.id;
  }, [relatedUser]);

  const statusRef = useRef(AppointmentStatus.CONFIRMED);

  const {mutate, isLoading: isUpdateLoading} = useUpdateAppointmentMutation();
  const updateAppointment = (status = AppointmentStatus.CONFIRMED) => {
    statusRef.current = status;
    mutate(
      {
        input: {
          appointmentStatus: status,
          id: relatedEntity?.Id,
        },
      },
      {
        onSuccess: data => {
          if (data?.match_updateAppointment?.status?.code === 1) {
            if (status === AppointmentStatus.REJECTED) {
              setIsOpen(false);
              setVisibleNotNow(true);
            } else {
              setIsOpen(false);
              toast({message: 'Success', type: 'success'});
            }
          } else {
            setIsOpen(false);
            toast({
              message: data?.match_updateAppointment?.status?.description,
              type: 'error',
            });
          }
        },
        onError: () => toast({message: 'Something went wrong', type: 'error'}),
      },
    );
  };

  const onNotNowPress = () => {
    updateAppointment(AppointmentStatus.REJECTED);
  };

  if (!relatedEntity || !isOpen || isCurrentUser) return null;

  return (
    <ActionSheet
      isOpen={isOpen && !isCurrentUser}
      onClose={() => setIsOpen(false)}>
      <ActionSheet.Content style={styles.sheet}>
        <VStack justifyContent={'center'} width="100%" p="5" space="8">
          {relatedUser?.photoUrl && (
            <Image
              source={{uri: relatedUser?.photoUrl}}
              resizeMode="cover"
              style={{
                width: 0.43 * deviceWidth,
                height: deviceHeight * 0.29,
                alignSelf: 'center',
                borderRadius: 10,
              }}
            />
          )}
          <Typography fontSize="xl" fontWeight="400" textAlign={'center'}>
            You have a scheduled appointment request from{' '}
            <Typography color="error.500" fontSize="xl" fontWeight="600">
              {relatedUser?.fullName}
            </Typography>{' '}
            on{' '}
            <Typography fontSize="xl" fontWeight="500">
              {`${appFormatDate(
                relatedEntity?.DateAndTime,
                'MMM DD',
              )} at ${getTime(relatedEntity?.DateAndTime)}`}
            </Typography>
          </Typography>
          <Typography
            textAlign={'center'}
            fontSize="sm"
            fontWeight="400"
            color="gray.500">
            By accepting this request, this date will be added to your calendar
            or you can not accept and suggest a new date
          </Typography>
          <HStack space="4" justifyContent="space-between" w="100%">
            <Button
              variant="outline"
              flex="1"
              onPress={onNotNowPress}
              isLoading={
                isUpdateLoading &&
                statusRef.current === AppointmentStatus.REJECTED
              }>
              Not now
            </Button>
            <Button
              flex="1"
              isLoading={
                isUpdateLoading &&
                statusRef.current === AppointmentStatus.CONFIRMED
              }
              onPress={() => updateAppointment(AppointmentStatus.CONFIRMED)}>
              Accept
            </Button>
          </HStack>
        </VStack>
      </ActionSheet.Content>
    </ActionSheet>
  );
}

export const NotNowModal = () => {
  const user = useAuthStore(state => state.user);
  const {navigateWithName} = useNavigate();
  const {visibleNotNow, setVisibleNotNow, setIsOpen, relatedUser} =
    useAppointmentStore();

  const onCloseNotNow = () => {
    setVisibleNotNow(false);
    setIsOpen(false);
  };
  const onConfirmNotNow = () => {
    onCloseNotNow();
    navigateWithName('DatingScheduling', {user: relatedUser, mainUser: user});
  };
  return (
    <ConfirmationActionSheet
      description={`Do you want to suggest a new schedule to the John doe?`}
      isOpen={visibleNotNow}
      onClose={onCloseNotNow}
      onConfirmPress={onConfirmNotNow}
      confirmBtnColor="primary.500"
      confirmButtonText="Scheduling"
    />
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: getColor({color: 'background.500'}),
  },
});
