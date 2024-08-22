import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  CalendarIconSet,
  ConfirmationActionSheet,
  Divider,
  EditIconSet,
  HeartSlashIconSet,
  TrashIconSet,
  Typography,
  getColor,
  useNavigate,
  useToast,
} from '~/components/elemental';
import {useDeleteAppointmentMutation} from '../hooks';
import {useQueryClient} from 'react-query';
import {AppointmentStatus} from './CalendarItem';

const CalendarItemMenu = ({
  isVisible,
  onClose,
  item,
  navigateWithName,
  appointmentUser,
}: {
  isVisible: boolean;
  onClose: () => void;
  item: any;
  navigateWithName?: any;
  appointmentUser: any;
}) => {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const {toast} = useToast();
  const {navigateWithName: nWithName} = useNavigate();

  const onHandleClose = () => {
    setVisibleDelete(false);
    onClose();
  };

  const onNewPress = (type = 'add') => {
    onClose();
    navigateWithName
      ? navigateWithName?.('DatingScheduling', {
          user: appointmentUser,
          appointmentId: item?.id,
        })
      : nWithName('DatingScheduling', {user: appointmentUser});
  };

  const onDeletePress = () => setVisibleDelete(true);
  const {mutate, isLoading} = useDeleteAppointmentMutation();
  const queryClient = useQueryClient();
  const onConfirmDelete = () => {
    mutate(
      {appointmentId: item?.id},
      {
        onSuccess: (data: any) => {
          if (data?.match_deleteAppointment?.code === 1) {
            toast({message: 'Removed successfully', type: 'success'});
            queryClient.invalidateQueries(['match_getAppointments'], {
              exact: false,
            });
          } else {
            toast({
              message: data?.match_deleteAppointment?.value,
              type: 'error',
            });
          }
        },
        onError: () => toast({message: 'Something went wrong', type: 'error'}),
      },
    );
  };

  if (visibleDelete)
    return (
      <ConfirmationActionSheet
        isOpen={visibleDelete}
        onConfirmPress={onConfirmDelete}
        onClose={onHandleClose}
        description="Are you sure you want to delete this Scheduling?"
        isLoading={isLoading}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        {item?.appointmentStatus === AppointmentStatus?.PENDING ? (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => onNewPress('edit')}>
            <EditIconSet color={getColor({color: 'gray.800'})} />
            <Typography color={'gray.800'} style={styles.textStyle}>
              Suggest new Time
            </Typography>
          </TouchableOpacity>
        ) : item?.appointmentStatus != AppointmentStatus?.CONFIRMED ? (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => onNewPress('add')}>
            <CalendarIconSet color={getColor({color: 'gray.800'})} />
            <Typography color={'gray.800'} style={styles.textStyle}>
              New Scheduling
            </Typography>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Divider />
        <TouchableOpacity style={styles.touchable} onPress={onDeletePress}>
          {item?.appointmentStatus === AppointmentStatus.CONFIRMED ? (
            <>
              <HeartSlashIconSet color={'error.600'} />
              <Typography color={'error.600'} style={styles.textStyle}>
                Cancel
              </Typography>
            </>
          ) : (
            <>
              <TrashIconSet color={'error.600'} />
              <Typography color={'error.600'} style={styles.textStyle}>
                Delete
              </Typography>
            </>
          )}
        </TouchableOpacity>
      </View>
    </CustomActionSheet>
  );
};

export default CalendarItemMenu;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  textStyle: {marginLeft: 8, fontWeight: 'bold'},
});
