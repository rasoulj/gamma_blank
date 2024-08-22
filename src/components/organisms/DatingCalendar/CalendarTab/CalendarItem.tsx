import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Typography,
  Image,
  deviceHeight,
  ThreeDotsIcon,
} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';
import CalendarItemMenu from './CalendarItemMenu';
import {getDateDiffTitle, getDateMonth, getTime} from '../helper';

const gradientColors = [
  'rgba(22, 18, 15, 0.3)',
  'rgba(22, 18, 15, 0)',
  'rgba(22, 18, 15, 0.7)',
];
export const AppointmentStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
};

const CalendarItem = ({item, index, navigateWithName, currentUserId}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const onMenuPress = () => setVisibleMenu(true);
  const onCloseMenu = () => setVisibleMenu(false);
  const [isPendingMine, setIsPendingMine] = useState(false);

  const appointmentUser = useMemo(() => {
    if (item?.otherUserId === currentUserId) {
      setIsPendingMine(true);
      return item?.user;
    } else {
      setIsPendingMine(false);
      return item?.otherUser;
    }
  }, [item]);

  const appointmentStatus = item?.appointmentStatus;
  const statusText = useMemo(() => {
    if (appointmentStatus === AppointmentStatus.PENDING) {
      if (isPendingMine) return 'Awaiting Your Confirmation';
      return 'Pending Confirmation';
    }
    return item?.appointmentStatus?.camelize();
  }, [appointmentStatus]);

  const statusColor = useMemo(() => {
    switch (appointmentStatus) {
      case AppointmentStatus.PENDING:
        return isPendingMine
          ? getColor({color: 'secondary.500'})
          : getColor({color: 'primary.500'});
      case AppointmentStatus.CONFIRMED:
        return getColor({color: 'success.500'});
      case AppointmentStatus.EXPIRED:
      default:
        return getColor({color: 'error.500'});
    }
  }, [appointmentStatus]);

  return (
    <>
      <View>
        <Typography fontSize="2xl" fontWeight="600" color="gray.800">
          {getDateDiffTitle(item?.dateAndTime)}
          <Typography fontSize="sm" fontWeight="500">
            {`  ${getDateMonth(item?.dateAndTime)}`}
          </Typography>
        </Typography>
        <View style={styles.time}>
          <Typography color="gray.500" fontWeight="500">
            {getTime(item?.dateAndTime)}
          </Typography>
          <View style={[styles.itemStatus, {backgroundColor: statusColor}]}>
            <Typography color="gray.50" fontSize="xs">
              {statusText}
            </Typography>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.itemImage}
            src={{
              uri: appointmentUser?.photoUrl,
            }}
            resizeMode="cover"
          />
          <LinearGradient style={styles.itemGradient} colors={gradientColors}>
            <TouchableOpacity onPress={onMenuPress} style={styles.itemMenu}>
              <ThreeDotsIcon color="gray.50" width={12} height={12} />
            </TouchableOpacity>
            <View style={styles.itemBottomText}>
              <Typography color="gray.50">{`${appointmentUser?.fullName}${
                appointmentUser?.fullName && appointmentUser?.age > 0 ? ',' : ''
              } ${
                appointmentUser?.age > 0 ? appointmentUser?.age : ''
              } `}</Typography>
            </View>
          </LinearGradient>
        </View>
      </View>
      {visibleMenu && (
        <CalendarItemMenu
          isVisible={visibleMenu}
          onClose={onCloseMenu}
          item={item}
          navigateWithName={navigateWithName}
          appointmentUser={appointmentUser}
        />
      )}
    </>
  );
};

export default CalendarItem;

const styles = StyleSheet.create({
  itemBottomText: {
    bottom: 8,
    left: 8,
    justifyContent: 'center',
    width: '100%',
  },
  itemMenu: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    top: 8,
    left: 8,
    alignItems: 'center',
    backgroundColor: getColor({color: 'primary.500'}),
    justifyContent: 'center',
  },
  itemGradient: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'space-between',
  },
  itemImage: {width: '100%', height: '100%'},
  imageContainer: {
    height: deviceHeight * 0.28,
    overflow: 'hidden',
    borderRadius: 15,
    width: '50%',
    marginTop: 8,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  itemStatus: {
    backgroundColor: getColor({color: 'success.500'}),
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});
