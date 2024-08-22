import {HStack, VStack} from 'native-base';
import React, {memo} from 'react';
import {Typography, useNavigate} from '~/components/elemental';
import SectionHighlight from './SectionHighlight';
import {Linking, TouchableOpacity} from 'react-native';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import {model} from '~/data/model';
import profileStore from '~/stores/profileStore';

const ProfileInfo = ({user, showHighlight = false}) => {
  const {profileConfigs} = profileStore(state => state);
  const {handleCheckElementExist, socialType} = useSocialTypesConfig();

  const onEmailCliced = () => {
    Linking.openURL(`mailto:${user?.email}`);
  };
  const onPhoneCliced = () => {
    Linking.openURL(`tel:${user?.phoneNumber}`);
  };

  const {navigateWithName} = useNavigate();
  const onPressFollowers = () => {
    navigateWithName('UserNetwork', {userId: user?.id, type: 'Followers'});
  };
  const onPressFollowing = () => {
    navigateWithName('UserNetwork', {userId: user?.id, type: 'Followings'});
  };

  return (
    <VStack space="6" mb="5">
      <VStack space="1" px="5">
        <HStack space="2">
          <Typography
            fontSize="2xl"
            fontWeight="500"
            color="gray.800"
            alignItems="flex-start">
            {user?.fullName?.replace(
              user?.fullName?.charAt(0),
              user?.fullName?.charAt(0).toUpperCase(),
            )}
          </Typography>
          {profileConfigs?.gender && (
            <Typography fontSize="xs" fontWeight="500" color="gray.500">
              {user?.displayGender
                ? user?.gender === 'FEMALE'
                  ? 'She'
                  : 'He'
                : ''}
            </Typography>
          )}
        </HStack>
        {user?.username && (
          <Typography fontSize="sm" fontWeight="500" color="gray.500">
            {`@${user?.username}`}
          </Typography>
        )}
        {user?.email &&
          user?.displayContactInfo &&
          profileConfigs?.contactOption && (
            <Typography
              fontSize="sm"
              fontWeight="500"
              color="info.500"
              onPress={onEmailCliced}>
              {user?.email}
            </Typography>
          )}
        {user?.phoneNumber &&
          user?.displayContactInfo &&
          profileConfigs?.contactOption && (
            <Typography
              fontSize="sm"
              fontWeight="500"
              color="info.500"
              onPress={onPhoneCliced}>
              {user?.phoneNumber}
            </Typography>
          )}
        {user?.about && profileConfigs?.about && (
          <Typography fontSize="sm" fontWeight="400" color="gray.500" mt="1">
            {user?.about}
          </Typography>
        )}
      </VStack>
      <HStack space="12" alignSelf="center">
        {(model?.metaData?.configs?.social?.post ||
          model?.metaData?.configs?.social?.reels ||
          socialType === 'text') && (
          <VStack alignItems="center">
            <Typography fontSize="sm" fontWeight="500" color="gray.800">
              {user?.postCount}
            </Typography>
            <Typography fontSize="xs" fontWeight="400" color="gray.500">
              Posts
            </Typography>
          </VStack>
        )}
        <TouchableOpacity
          onPress={onPressFollowers}
          activeOpacity={0.8}
          disabled={!showHighlight}>
          <VStack alignItems="center">
            <Typography fontSize="sm" fontWeight="500" color="gray.800">
              {user?.followerCount}
            </Typography>
            <Typography fontSize="xs" fontWeight="400" color="gray.500">
              Followers
            </Typography>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressFollowing}
          activeOpacity={0.8}
          disabled={!showHighlight}>
          <VStack alignItems="center">
            <Typography fontSize="sm" fontWeight="500" color="gray.800">
              {user?.followeeCount}
            </Typography>
            <Typography fontSize="xs" fontWeight="400" color="gray.500">
              Followings
            </Typography>
          </VStack>
        </TouchableOpacity>
      </HStack>
      {user?.id &&
        showHighlight &&
        profileConfigs?.highlight &&
        handleCheckElementExist('highlight') && (
          <SectionHighlight userId={user?.id} />
        )}
    </VStack>
  );
};
export default memo(ProfileInfo);
