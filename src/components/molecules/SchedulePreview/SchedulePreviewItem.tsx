import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Typography,
  Trash2Icon,
  DrawerKit,
  Layer,
  Button,
  useDrawer,
  useNavigate,
  isDark,
  EditIconSet,
} from '~/components/elemental';
import {useDeleteWorkingSchedule} from './hook';
import {DayOfWeekLowercase, WorkingScheduleRepeatTypeLowerCase} from './enums';
import {useQueryClient} from 'react-query';
const convertTimeSpanToTime = (time: string): string => {
  if (
    time?.indexOf('PT') > -1 &&
    (time?.indexOf('H') > -1 || time?.indexOf('M') > -1)
  ) {
    const times = time?.replace('PT', '')?.replace('M', '').split('H');
    let hour = parseInt(times?.[0] ?? '0');
    let min = parseInt(times?.[1] ? times[1] : '0');
    let amPm = hour > 11 ? 'pm' : 'am';
    return (
      (hour < 10 ? `0${times[0] ?? 0}` : hour > 12 ? hour - 12 : times[0]) +
      ':' +
      (min < 10 ? `0${times?.[1] ? times[1] : 0}` : times[1]) +
      ` ${amPm}`
    );
  } else return time;
};
const SchedulePreviewItem = ({item, index}: {item: any; index: number}) => {
  const {isOpen: isDeleteDrawerKitOpen, setIsOpen: setIsDeleteDrawerKitOpen} =
    useDrawer('DeleteDrawerKit');
  const {navigateWithName} = useNavigate();
  const {mutate, isLoading} = useDeleteWorkingSchedule();
  const onToggleDeleteModal = () =>
    setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
  const queryClient = useQueryClient();
  const onDeletePress = () => {
    mutate(
      {entityId: item?.id},
      {
        onSuccess: data => {
          console.log(JSON.stringify(data));
          if (data?.workingSchedule_deleteWorkingSchedule?.code === 1) {
            queryClient.invalidateQueries(['getWorkingSchedules'], {
              exact: false,
            });
            onToggleDeleteModal();
          }
        },
        onError: errorData => {
          console.log(JSON.stringify(errorData));
        },
      },
    );
  };
  const onEditPress = () => {
    navigateWithName('WorkingSchedule', {item});
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Typography>{DayOfWeekLowercase?.[item?.dayOfWeek] ?? ''}</Typography>
          <View style={{flexDirection: 'row'}}>
            <Trash2Icon
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={{marginRight: 5, marginLeft: 15}}
              onPress={onToggleDeleteModal}
            />
            <EditIconSet
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={{marginLeft: 24}}
              onPress={onEditPress}
            />
          </View>
        </View>
        {item?.periods?.map(
          (period: {startTime: string; endTime: string}, index: number) => (
            <Typography style={styles.time}>{`${convertTimeSpanToTime(
              period?.startTime,
            )} - ${convertTimeSpanToTime(period?.endTime)}`}</Typography>
          ),
        )}
        <Typography>{`Repeat : ${
          WorkingScheduleRepeatTypeLowerCase?.[item?.repeatType] ?? ''
        }`}</Typography>
      </View>
      <DrawerKit
        data-id="delete-drawer-kit"
        data-name="DrawerKit"
        style={{position: 'relative', zIndex: 5}}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-delete-layer"
          data-name="RelativeLayout"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}
          data-parent="delete-drawer-kit">
          <Layer
            data-id="content-delete-layer"
            data-name="Layer"
            style={{position: 'relative', marginLeft: 20, marginRight: 20}}
            data-parent="123-456-789-delete-layer">
            <Typography
              data-id="01a2347f-c1fd-41d4-9f49-263cdc16f9d9"
              data-name="Typography"
              fontSize="18px"
              fontWeight={700}
              color={'gray.800'}
              style={{
                display: 'flex',
                textAlign: 'center',
                marginTop: 8,
              }}
              data-parent="content-delete-layer">
              Confirmation
            </Typography>
            <Typography
              data-id="532f9254-679b-458d-afae-6fb62c9f191e"
              data-name="Typography"
              fontSize="14px"
              fontWeight={500}
              color={'gray.800'}
              style={{
                position: 'relative',
                marginTop: 23,
                marginBottom: 32,
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'left',
              }}
              data-parent="content-delete-layer">
              Are you sure you want to delete this item ?
            </Typography>
            <Layer
              data-id="button_box"
              data-name="Layer"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                width: '100%',
              }}
              data-parent="content-delete-layer">
              <Button
                data-id="cancel_btn"
                data-name="Button"
                style={{position: 'relative', borderRadius: 10, width: '45%'}}
                variant="outline"
                data-parent="button_box"
                onPress={() => {
                  setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                }}>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color={'primary.500'}
                  m={0}
                  p="0">
                  Cancel
                </Typography>
              </Button>
              <Button
                data-id="delete_btn"
                data-name="Button"
                style={{position: 'relative', borderRadius: 10, width: '45%'}}
                colorScheme="error.500"
                bgColor="error.500"
                variant="solid"
                isLoading={isLoading}
                data-parent="button_box"
                onPress={onDeletePress}>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color={'gray.50'}
                  m={0}
                  p="0">
                  Delete
                </Typography>
              </Button>
            </Layer>
          </Layer>
        </View>
      </DrawerKit>
    </>
  );
};
export default SchedulePreviewItem;
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 10,
    marginBottom: 15,
    alignSelf: 'center',
    top: '100%',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: '#D4D4D8',
    borderBottomWidth: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#D4D4D8',
    width: '100%',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  time: {
    marginBottom: 8,
  },
  contentContainerStyle: {
    paddingHorizontal: 5,
    paddingBottom: 20,
    paddingTop: 10,
  },
});
