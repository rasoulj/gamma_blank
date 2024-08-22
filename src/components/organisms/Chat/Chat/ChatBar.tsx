import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Layer from '../../../atoms/Layer';
import {getColor} from '../../../elemental/helper';
import {
  isDark,
  BackIcon,
  relativeTimeFromNow,
  useNavigate,
  scale,
} from '../../../elemental';
import {UserAvatar, useRoute} from '~/components';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
const avatarSize = scale(42);

const ChatBar = ({item}: {item: any}) => {
  const {navigateWithName, navigation} = useNavigate();
  const goBack = useRoute().params?.goBack ?? false;

  const onPress = () => {
    goBack
      ? navigation?.goBack()
      : navigateWithName('chat', {item: item, isProfile: false});
  };

  const onProfilePress = () => {
    if (isElementInModel('DatingUserProfile')) {
      navigateWithName('DatingUserProfile', {userId: item?.id});
    } else navigateWithName('profile', {item: item});
  };

  return (
    <Layer style={styles.container}>
      <BackIcon
        color="gray.800"
        onPress={onPress}
        width={scale(24)}
        height={scale(24)}
      />
      <TouchableOpacity style={styles.touchable} onPress={onProfilePress}>
        <Layer>
          <UserAvatar
            avatarSize={avatarSize}
            user={item}
            hasShadow={false}
            extraData={`last seen at ${relativeTimeFromNow(item?.lastSeen)}`}
            fullNameFontSize="md"
            fullNameTextStyle={styles.fullNameTextStyle}
            extraDataFontSize="sm"
          />
        </Layer>
      </TouchableOpacity>
    </Layer>
  );
};

export default ChatBar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    zIndex: 10,
    marginVertical: 0,
    marginHorizontal: 0,
    backgroundColor: getColor({
      color: isDark() ? 'background.400' : 'background.500',
    }),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  fullNameTextStyle: {
    fontWeight: 'bold',
  },

  touchable: {width: '100%', flexDirection: 'row', marginLeft: 8},
});
