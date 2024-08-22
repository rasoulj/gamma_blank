import {VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Image,
  Setting2IconSet,
  Typography,
  deviceHeight,
  deviceWidth,
  getColor,
  scale,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import ProfileInfo from './ProfileInfo';
import useAuthStore from '~/stores/authStore';
import {useGetUserByIdQuery} from './hooks';
import ShareModal from '~/components/molecules/ShareModal';
import profileStore from '~/stores/profileStore';

const ProfileHeader = () => {
  const profileConfigs = profileStore(state => state.profileConfigs);
  const route = useRoute();
  const {user} = useAuthStore(state => state);
  const [visibleShare, setVisibleShare] = useState(false);
  const userId = route?.params?.userId ?? user?.id;
  const {navigateWithName} = useNavigate();

  const {data} = useGetUserByIdQuery({entityId: userId});
  const currentUser =
    userId === user?.id && !data
      ? user
      : data?.user_getUsers?.result?.items?.[0];

  const onSettingPress = () => navigateWithName('Settings');
  const onSharePress = () => setVisibleShare(true);
  const onHandleClose = () => setVisibleShare(false);

  const shareObject = {id: user?.id, mediaUrl: user?.photoUrl};

  return (
    <>
      <View pointerEvents="box-none">
        <VStack space="4" top="3">
          <VStack style={styles.image} bgColor="blue.100">
            <Image
              style={styles.image}
              src={currentUser?.photoUrl}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={onSettingPress}>
              <Setting2IconSet color={getColor({color: 'gray.800'})} />
            </TouchableOpacity>
          </VStack>
          <View style={styles.bottomContainer}>
            <BlurButton
              text="Edit Profile"
              onPress={() => {
                navigateWithName('ProfileUpdate');
              }}
            />
            {profileConfigs?.shareProfile && (
              <BlurButton
                text="Share Profile"
                onPress={onSharePress}
                type={1}
              />
            )}
          </View>
          <ProfileInfo user={currentUser} showHighlight />
        </VStack>
      </View>
      {visibleShare && (
        <ShareModal
          isVisible={visibleShare}
          onClose={onHandleClose}
          mediaType="CONTACT"
          item={shareObject}
          deepLink={`profile?userId=${user?.id}`}
        />
      )}
    </>
  );
};
export default ProfileHeader;

const BlurButton = ({onPress, text, type = 0}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={type === 0 ? styles.btnContainer : styles.outlineBtnContainer}>
      <Typography
        fontWeight="700"
        color={type == 0 ? 'gray.50' : 'primary.500'}
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
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    top: 8,
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

  labelStyle: {
    fontSize: 14,
    fontWeight: '500',
    width: (deviceWidth - 100) / 2,
    textAlign: 'center',
  },

  contentContainerStyle: {
    marginHorizontal: 20,
    marginBottom: 8,
    width: deviceWidth - 40,
  },

  indicatorStyle: {
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 1,
  },

  headerContainerStyle: {shadowOpacity: 0, elevation: 0, top: 10},
});
