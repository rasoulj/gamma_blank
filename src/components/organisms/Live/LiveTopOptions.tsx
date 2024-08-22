import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CloseIconSet,
  EyeIconSet,
  Image,
  Typography,
  VStack,
  getColor,
  scale,
  useNavigate,
} from '~/components/elemental';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';

const LiveTopOptions = ({
  user,
  numOfSubscribers,
  hasClose = true,
  footer,
}: {
  user: any;
  numOfSubscribers: number;
  hasClose?: boolean;
  footer?: any;
}) => {
  const currentUser = useAuthStore(state => state.user);

  const {navigation} = useNavigate();
  const onClosePress = () => {
    navigation?.goBack();
  };

  return (
    <VStack
      flex="1"
      position={'absolute'}
      zIndex={10000}
      right={0}
      left={0}
      top={0}>
      <LinearGradient
        style={styles.container}
        colors={['rgba(70, 70, 70, 0.47)', 'rgba(0, 0, 0, 0)']}>
        <View style={styles.centerRow}>
          <Image
            src={user?.photoUrl}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Typography color="gray.50" fontSize="sm" fontWeight="500">
            {user?.fullName}
          </Typography>
          <View style={styles.flex1} />
          <View style={styles.viewContainer}>
            {model?.metaData?.configs?.socialLive?.viewers && (
              <>
                <EyeIconSet
                  width={scale(21)}
                  height={scale(21)}
                  color="gray.800"
                />
                <Typography color="gray.800" fontSize="sm" fontWeight="500">
                  {numOfSubscribers}
                </Typography>
              </>
            )}
            <View style={styles.liveText}>
              <Typography color="gray.50" fontSize="xs" fontWeight="500">
                live
              </Typography>
            </View>
          </View>
          {currentUser?.id != user?.id && hasClose && (
            <TouchableOpacity
              style={styles.closeContainer}
              activeOpacity={0.8}
              onPress={onClosePress}>
              <CloseIconSet color="gray.800" width={32} height={32} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
      {footer}
    </VStack>
  );
};

export default LiveTopOptions;

const styles = StyleSheet.create({
  container: {padding: 26},

  avatar: {width: 30, height: 30, borderRadius: 15, marginRight: 8},

  liveText: {
    backgroundColor: getColor({color: 'error.500'}),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },

  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
  },

  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10000,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  flex1: {flex: 1},

  closeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
});
