import React, {memo, useMemo} from 'react';
import {ApsyInAppLogo} from '~/assets';
import {
  Image,
  MessageIconSet,
  NotificationBoldIconSet,
  NotificationIconSet,
  scale,
  useNavigate,
  CircleIcon,
  HStack,
  View,
} from '~/components';
import {useGetUnreadMessageQuery, useGetUnreadNotifQuery} from './hooks';
import {model} from '~/data/model';
import {WithLocalSvg} from 'react-native-svg';
import {StyleSheet} from 'react-native';

const HomeHeader = () => {
  const {navigateWithName} = useNavigate();

  const {data: messageData} = useGetUnreadMessageQuery();
  const hasMesssage =
    messageData?.message_getUserMessages?.result?.totalCount > 0;

  const onMesssagePress = () => {
    navigateWithName('Chat');
  };

  return (
    <HStack alignItems="center" px={5} space={6} py={2} mb="4">
      {model?.metaData?.logo ? (
        <View style={styles.logo}>
          <Image
            resizeMode="cover"
            style={styles.img}
            src={model?.metaData?.logo}
          />
        </View>
      ) : (
        <WithLocalSvg
          width={scale(70)}
          height={scale(70) * 0.26}
          asset={ApsyInAppLogo}
        />
      )}
      <HStack flex="1" />
      <NotificationItem />
      <HStack>
        <MessageIconSet
          width={24}
          height={24}
          onPress={onMesssagePress}
          color="gray.800"
        />
        {hasMesssage && (
          <CircleIcon size={2} color="error.500" marginLeft={-2} />
        )}
      </HStack>
    </HStack>
  );
};

export default memo(HomeHeader);

export const NotificationItem = ({
  variant = 'outline',
}: {
  variant?: 'outline' | 'bold';
}) => {
  const {navigateWithName} = useNavigate();

  const whereConfigs = useMemo(() => {
    let conds = [];
    if (!model?.metaData?.configs?.notif?.like) {
      conds.push({notificationType: {neq: 'LikePost'}});
      conds.push({notificationType: {neq: 'LikeComment'}});
    }
    if (!model?.metaData?.configs?.notif?.follow) {
      conds.push({notificationType: {neq: 'NewFollower'}});
    }
    if (!model?.metaData?.configs?.notif?.startLive) {
      conds.push({notificationType: {neq: 'LiveStarted'}});
    }
    if (!model?.metaData?.configs?.notif?.followRequest) {
      conds.push({notificationType: {neq: 'FollowRequest'}});
    }
    return conds;
  }, []);

  const {data} = useGetUnreadNotifQuery({
    where: {
      and: [
        {isRead: {eq: false}},
        ...whereConfigs,
        {notificationType: {neq: 'END_LIVE'}},
      ],
    },
  });
  const hasNotif = data?.notification_getNotifications?.result?.totalCount > 0;

  const onNotificationPress = () => {
    navigateWithName('notification');
  };

  return (
    <HStack>
      {variant === 'bold' ? (
        <NotificationBoldIconSet
          width={24}
          height={24}
          onPress={onNotificationPress}
          color="gray.50"
        />
      ) : (
        <NotificationIconSet
          width={24}
          height={24}
          onPress={onNotificationPress}
          color="gray.800"
        />
      )}
      {hasNotif && <CircleIcon size={2} color="error.500" marginLeft={-3} />}
    </HStack>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: scale(70),
    height: scale(70) * 0.26,
  },

  img: {
    width: undefined,
    aspectRatio: 1,
    height: scale(70) * 0.26,
  },
});
