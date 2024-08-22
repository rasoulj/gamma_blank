import {VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import User3Icon from '~/assets/icons/user3icon';
import {Image, Typography, scale, useNavigate} from '~/components/elemental';
import StoryItemModal from './StoryItemModal';
import {getColor} from '~/utils/helper/theme.methods';

const itemSize = scale(60);
const radius = '15';

const StoryHeaderItem = ({
  item,
  followersId,
  liveStoriesData,
  index,
  isStoryOnly = false,
}: {
  item: any;
  followersId: number[];
  liveStoriesData?: any;
  index: number;
  isStoryOnly?: boolean;
}) => {
  const [visibleStoryOption, setVisibleStoryOption] = useState(false);
  const onCloseStoryOption = () => setVisibleStoryOption(false);

  const user = item?.user ?? item?.creator;
  const hasLive = item?.creator ? true : false;
  const hasStory = item?.user
    ? true
    : liveStoriesData?.pages?.findIndex(
        storyItem => storyItem?.user?.id === user?.id,
      ) > 0;
  const hasNotSeen = item?.user ? item?.hasNotSeen : false;

  const {navigateWithName} = useNavigate();
  const onItemPress = () => {
    if (hasStory)
      navigateWithName('Stories', {
        index: isStoryOnly ? index - 1 : index,
        followersId,
      });
    else
      navigateWithName('Live', {
        user: item?.creator,
        entityId: item?.id,
        item,
        type: 'viewer',
      });
  };

  const onBadgePress = () => {
    navigateWithName('Live', {
      user: item?.creator,
      entityId: item?.id,
      item,
      type: 'viewer',
    });
  };

  const onLongPress = () => {
    setVisibleStoryOption(true);
  };

  return (
    <>
      <VStack
        w={itemSize}
        space="2"
        marginLeft={isStoryOnly && index === 1 ? '8%' : undefined}
        marginRight={isStoryOnly && (index + 1) % 4 != 0 ? '8%' : undefined}>
        <VStack
          borderWidth="2"
          h={itemSize}
          w={itemSize}
          borderColor={hasNotSeen ? '#006194' : 'gray.400'}
          overflow="hidden"
          borderRadius={radius}
          justifyContent="center"
          py={user?.photoUrl ? '0' : '1'}
          alignItems="center">
          <TouchableOpacity onPress={onItemPress} onLongPress={onLongPress}>
            <>
              {user?.photoUrl ? (
                <Image
                  src={user?.photoUrl}
                  style={{width: itemSize, height: itemSize}}
                  resizeMode="contain"
                />
              ) : (
                <User3Icon width={itemSize} height={itemSize - 10} />
              )}
              {hasLive && (
                <TouchableOpacity
                  style={styles.liveBadge}
                  onPress={onBadgePress}>
                  <View style={styles.liveCircle} />
                  <Typography color="gray.50" fontSize="xs" fontWeight="500">
                    Live
                  </Typography>
                </TouchableOpacity>
              )}
            </>
          </TouchableOpacity>
        </VStack>
        <Typography numberOfLines={1} fontSize="xs" alignSelf="center">
          {user?.fullName}
        </Typography>
      </VStack>
      <StoryItemModal
        isVisible={visibleStoryOption}
        onClose={onCloseStoryOption}
        item={item}
      />
    </>
  );
};
export default StoryHeaderItem;

const styles = StyleSheet.create({
  liveBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: getColor({color: 'error.500'}),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  liveCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: getColor({color: 'gray.50'}),
    marginEnd: 4,
  },
});
