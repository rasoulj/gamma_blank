import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ArrowLeftIconSet,
  Image,
  MoreIconSet,
  Typography,
  deviceHeight,
  deviceWidth,
  getColor,
  scale,
  useNavigate,
} from '~/components/elemental';
import ProfileInfo from './ProfileInfo';
import {
  useGetBlockedUserByIdQuery,
  useGetUserByIdQuery,
  useGetUserFollowQuery,
} from './hooks';
import FollowButton from './FollowButton';
import OtherUserMenu from './OtherUserMenu';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';

const ProfileViewing = ({userId}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const {navigation, navigateWithName} = useNavigate();
  const {data} = useGetUserByIdQuery({entityId: userId});
  const currentUser = data?.user_getUsers?.result?.items?.[0];
  const {data: followData, isLoading: followLoading} = useGetUserFollowQuery({
    otherId: userId,
  });
  const {data: blockData} = useGetBlockedUserByIdQuery({userId});
  const currentFollowData = followData?.social_getUser?.result;

  const isBlocked =
    blockData?.blockUser_getBlockedUsers?.result?.totalCount &&
    blockData?.blockUser_getBlockedUsers?.result?.totalCount > 0;

  const onCloseMenu = () => setVisibleMenu(false);
  const {socialType} = useSocialTypesConfig();
  const isTextual = socialType === 'text';

  const onMenuPress = () => setVisibleMenu(true);
  const onBackPress = () => navigation.goBack();
  const onMessagePress = () => {
    navigateWithName('chat', {
      item: currentUser,
      isProfile: true,
    });
  };

  return (
    <>
      <VStack space="4" bottom={6} pointerEvents="box-none" top="3">
        <VStack style={styles.image} bgColor="blue.100">
          <Image
            style={styles.image}
            src={currentUser?.photoUrl}
            resizeMode="cover"
          />
          <HStack style={styles.topIcons}>
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={onBackPress}>
              <ArrowLeftIconSet color={getColor({color: 'gray.800'})} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={onMenuPress}>
              <MoreIconSet color={getColor({color: 'gray.800'})} />
            </TouchableOpacity>
          </HStack>
        </VStack>
        <View style={styles.bottomContainer}>
          <FollowButton
            followInfo={currentFollowData}
            userId={userId}
            isBlocked={isBlocked}
          />
          <BlurButton text="Message" onPress={onMessagePress} type={1} />
        </View>
        <ProfileInfo
          user={currentUser}
          showHighlight={
            (currentFollowData?.isFollowed ||
              (!followLoading && !currentFollowData?.user?.isPrivateAccount)) &&
            !isTextual
          }
        />
      </VStack>
      {visibleMenu && (
        <OtherUserMenu
          isVisible={visibleMenu}
          onClose={onCloseMenu}
          item={currentUser}
          isBlocked={isBlocked}
        />
      )}
    </>
  );
};
export default ProfileViewing;

const BlurButton = ({onPress, text, type = 0}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={type === 0 ? styles.btnContainer : styles.outlineBtnContainer}>
      <Typography
        fontWeight="700"
        color={type == 0 ? '#fff' : 'primary.500'}
        fontSize="sm">
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: deviceWidth,
    height: deviceHeight * 0.35,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  settingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: scale(40),
    height: scale(40),
    borderRadius: scale(40) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topIcons: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    right: 20,
    top: 8,
    left: 20,
  },
  bottomContainer: {
    paddingBottom: 16,
    paddingHorizontal: 20,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 10,
    width: deviceWidth * 0.43,
    alignItems: 'center',
    height: scale(36),
    justifyContent: 'center',
  },
  outlineBtnContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    width: deviceWidth * 0.43,
    alignItems: 'center',
    height: scale(36),
    justifyContent: 'center',
  },

  indicatorStyle: {
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 1,
  },
  contentContainerStyle: {
    marginHorizontal: 20,
    marginBottom: 8,
    width: deviceWidth - 40,
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '500',
    width: (deviceWidth - 100) / 2,
    textAlign: 'center',
  },
});
