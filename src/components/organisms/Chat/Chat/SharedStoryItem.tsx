import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {relativeTimeFromNow, Typography, Image, scale} from '~/components';
import UserAvatar from '~/components/molecules/UserAvatar';
import {useGetStories} from '../../SocialHome/hook';
import {getColor} from '~/utils/helper/theme.methods';
import dayjs from 'dayjs';
import {model} from '~/data/model';
import ChatItem from './ChatItem';
import {HStack, VStack} from 'native-base';
import StoryModal from './StoryModal';

const storyHour = model?.metaData?.configs?.socialStory?.time ?? 24;

const SharedStoryItem = ({item, isMine}: any) => {
  const [visibleStory, setVisibleStory] = useState(false);

  const currentDate = useMemo(() => {
    return dayjs(new Date()).subtract(storyHour, 'h').toISOString();
  }, [item]);

  const {data, isLoading}: any = useGetStories({
    where: {
      and: [
        {story: {id: {eq: item?.mediaEntityId}}},
        {
          or: [
            {story: {lastModifiedDate: {gte: currentDate}}},
            {story: {createdDate: {gte: currentDate}}},
          ],
        },
      ],
    },
  });
  const story = data?.pages?.[0]?.story;

  const onCloseStory = () => setVisibleStory(false);
  const onOpenStory = () => setVisibleStory(true);

  return (
    <>
      <HStack
        style={[styles.container]}
        space={'1'}
        alignSelf={isMine ? 'flex-end' : 'flex-start'}>
        {item?.mediaType === 'REPLY_STORY' && !isMine && (
          <VStack w="1" height="100%" backgroundColor={'gray.300'} />
        )}
        <VStack space={'1'} flex="1">
          {item?.mediaType === 'REPLY_STORY' && (
            <Typography color={'gray.500'} fontWeight="400" fontSize="xs">
              {isMine ? 'You' : item?.sender?.fullName} reacted to their story
            </Typography>
          )}
          <TouchableOpacity
            disabled={!story}
            onPress={onOpenStory}
            style={styles.touchable}>
            {!isLoading ? (
              !story ? (
                <View style={styles.noStory}>
                  <Typography flexShrink={1} alignSelf="center">
                    Story is not available!
                  </Typography>
                </View>
              ) : (
                <>
                  <View style={styles.absoluteView}>
                    <UserAvatar
                      user={story?.user}
                      color="gray.50"
                      hasShadow={false}
                      avatarSize={scale(16)}
                      fullNameFontSize="xs"
                    />
                  </View>
                  {item?.mediaUrl && (
                    <Image
                      src={item?.mediaUrl}
                      style={styles.media}
                      resizeMode="cover"
                    />
                  )}
                </>
              )
            ) : (
              <ActivityIndicator />
            )}
          </TouchableOpacity>
        </VStack>
        {item?.mediaType === 'REPLY_STORY' && isMine && (
          <VStack w="1" height="100%" backgroundColor={'gray.300'} />
        )}
      </HStack>
      {item?.mediaType === 'REPLY_STORY' ? (
        <VStack mt="2">
          <ChatItem {...{item, isMine}} />
        </VStack>
      ) : (
        <Typography
          fontSize="xs"
          alignSelf={isMine ? 'flex-end' : 'flex-start'}
          color="gray.500">
          {relativeTimeFromNow(item?.createdAt)}
        </Typography>
      )}
      {visibleStory && (
        <StoryModal {...{visibleStory, onCloseStory, data: data?.pages}} />
      )}
    </>
  );
};

export default SharedStoryItem;

const styles = StyleSheet.create({
  dateText: {
    color: 'gray.500',
    fontSize: 12,
    marginTop: 5,
    backgroundColor: 'red',
  },

  media: {
    width: '100%',
    height: 200,
  },

  touchable: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: getColor({color: 'gray.300'}),
    overflow: 'hidden',
    width: '100%',
  },

  container: {
    flex: 1,
    marginTop: 10,
    overflow: 'hidden',
    width: '50%',
  },

  noStory: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  absoluteView: {position: 'absolute', zIndex: 1, margin: 10},
});
