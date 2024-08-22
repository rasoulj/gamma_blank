import {HStack, VStack} from 'native-base';
import React, {createRef, memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  CustomVideo,
  Image,
  deviceHeight,
  deviceWidth,
  useNavigate,
} from '~/components';
import StoryItemTopOptions from './StoryItemTopOptions';
import StoryItemBottomOptions from './StoryItemBottomOptions';
import {useStorySeenMutation} from './hooks';
import {useQueryClient} from 'react-query';
import useAuthStore from '~/stores/authStore';
import MyStoryItemBottomOptions from './MyStoryItemBottomOptions';
import HighlightItemBottomOptions from './HighlightItemBottomOptions';
import {model} from '~/data/model';

const storyDuration = model.metaData.configs?.socialStory?.duration ?? 8;

const StoryItem = ({
  data,
  totalCount,
  seenIndex,
  storyIndex,
  itemIndex,
  goToNextUserStory,
  goToPreviewsUserStory,
  storyOwner,
  onEndReached,
  isHighlight = false,
  isPreview = false,
  highlightId,
  onClose,
}: {
  data: any;
  totalCount: number;
  seenIndex: number;
  itemIndex?: number;
  storyIndex: number;
  goToNextUserStory: any;
  goToPreviewsUserStory: any;
  storyOwner?: any;
  onEndReached?: any;
  isHighlight?: boolean;
  userStory?: boolean;
  isPreview?: boolean;
  highlightId?: number;
  onClose?: () => void;
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(
    isPreview
      ? seenIndex <= totalCount - 1
        ? seenIndex
        : 0
      : seenIndex >= totalCount - 1 || seenIndex < 1
      ? 0
      : seenIndex,
  );
  const pauseValue = useRef(0);
  const duration = useRef(storyDuration * 1000);
  const animXList: any[] | undefined = [];
  const elRefs = React.useRef();
  for (let i = 0; i < totalCount; i++) {
    elRefs[i] = createRef();
    animXList.push(
      useRef(
        isPreview
          ? i < seenIndex
            ? new Animated.Value(1)
            : new Animated.Value(0)
          : i <= seenIndex - 1 && seenIndex != totalCount
          ? new Animated.Value(1)
          : new Animated.Value(0),
      ).current,
    );
  }
  const stopAnimations = () => {
    animXList?.map(animX => animX?.stopAnimation());
  };
  useEffect(() => {
    return stopAnimations();
  }, []);
  const changeCurrentStatusConfig = (animValue: number) => {
    animXList[currentItemIndex]?.setValue(animValue);
    if (animValue === 0 && data[currentItemIndex - 1]?.storyType === 'VIDEO') {
      animXList[currentItemIndex - 1]?.setValue(0);
    }
  };
  const goToNextIndex = async () => {
    pauseValue.current = 0;
    if (currentItemIndex < totalCount - 1) {
      changeCurrentStatusConfig(1);
      setCurrentItemIndex(prev => prev + 1);
    } else if (data?.length < totalCount) {
      onEndReached?.();
      changeCurrentStatusConfig(1);
      setCurrentItemIndex(prev => prev + 1);
    } else {
      goToNextUserStory?.();
    }
  };
  const goToPreviewsIndex = async () => {
    pauseValue.current = 0;
    if (currentItemIndex > 0) {
      changeCurrentStatusConfig(0);
      setCurrentItemIndex(prev => prev - 1);
    } else {
      goToPreviewsUserStory?.();
    }
  };
  const startAnim = ({
    value = 0,
    durationTime = duration.current,
  }: {
    value?: number;
    durationTime?: number;
  }) => {
    if (animXList[currentItemIndex]) {
      animXList[currentItemIndex].setValue(pauseValue?.current);
      Animated.timing(animXList[currentItemIndex], {
        toValue: 1,
        duration: durationTime,
        useNativeDriver: false,
      }).start(data => {
        if (data?.finished) {
          pauseValue.current = 0;
          goToNextIndex?.();
        }
      });
    }
  };
  const onPauseTimeLine = () => {
    if (animXList[currentItemIndex]) {
      animXList[currentItemIndex]?.stopAnimation((value: number) => {
        elRefs?.[currentItemIndex]?.current?.pause();
        pauseValue.current = value;
      });
    }
  };
  const {mutate, isLoading} = useStorySeenMutation();
  const queryClient = useQueryClient();
  const seenedStories = useRef<number[]>([]);
  const currentStoryItem = data?.[currentItemIndex]?.story;
  const onSeenStory = () => {
    if (
      seenedStories?.current?.findIndex(
        item => item === currentStoryItem?.id,
      ) === -1
    )
      mutate(
        {storyId: currentStoryItem?.id},
        {
          onSuccess: (data, variables) => {
            if (data?.story_Seen?.status?.code === 1) {
              seenedStories.current.push(variables?.storyId);
              queryClient.invalidateQueries([
                'getStories',
                {userId: {eq: currentStoryItem?.user?.id}},
              ]);
              queryClient.invalidateQueries(['story_getLastStoriesOfUsers'], {
                exact: false,
              });
            }
          },
        },
      );
  };

  const onImageLoaded = () => {
    onSeenStory();
    duration.current = 8000;
    startAnim({value: 0, durationTime: 8000});
  };
  const onVideoLoaded = data => {
    const durationData = data?.duration ?? 1;
    duration.current = durationData * 1000;
    onSeenStory();
    startAnim({value: 0, durationTime: durationData * 1000});
  };

  const onLongPress = () => {
    onPauseTimeLine();
  };
  const onPressOut = () => {
    startAnim({});
    elRefs?.[currentItemIndex]?.current?.play();
  };

  const user = useAuthStore(state => state.user);
  const isMine = data?.[0]?.story?.user?.id === user.id;

  const firstTouchY = useRef(0);
  const {navigation} = useNavigate();
  const onTouchStart = (event: GestureResponderEvent) => {
    if (event.nativeEvent.pageY) {
      firstTouchY.current = event.nativeEvent.pageY;
    }
  };
  const onTouchEnd = (event: GestureResponderEvent) => {
    if (event.nativeEvent.pageY - firstTouchY.current > 100) {
      navigation.goBack();
    }
  };

  return (
    <VStack
      style={styles.container}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}>
      <StoryItemTopOptions
        animXList={animXList}
        item={currentStoryItem}
        timelineCounter={totalCount}
        onPauseTimeline={onPauseTimeLine}
        onPressOut={onPressOut}
        isHighlight={isHighlight}
        highlightId={highlightId}
        storyOwner={storyOwner}
        onClose={onClose}
      />
      {isHighlight ? (
        <HighlightItemBottomOptions
          likeCount={0}
          onPressOut={onPressOut}
          item={data?.[currentItemIndex]}
          onPauseTimeLine={onPauseTimeLine}
        />
      ) : isMine ? (
        <MyStoryItemBottomOptions
          itemIndex={currentItemIndex}
          onPressOut={onPressOut}
          item={data?.[currentItemIndex]}
          onPauseTimeLine={onPauseTimeLine}
          data={data}
        />
      ) : (
        <StoryItemBottomOptions
          likeCount={0}
          onPressOut={onPressOut}
          item={data?.[currentItemIndex]}
          onPauseTimeLine={onPauseTimeLine}
        />
      )}
      <VStack style={styles.mediaContainer}>
        {animXList.length === totalCount && (
          <>
            {currentStoryItem?.mediaType === 'VIDEO' ? (
              <>
                <Image
                  src={currentStoryItem?.thumbnail}
                  style={styles.absoluteFill}
                  resizeMode="cover"
                />
                <CustomVideo
                  source={currentStoryItem?.mediaUrl}
                  style={styles.image}
                  onLoadEnd={onVideoLoaded}
                  ref={elRefs[currentItemIndex]}
                  resizeMode="contain"
                />
              </>
            ) : (
              <Image
                src={currentStoryItem?.mediaUrl}
                style={styles.image}
                onLoadEnd={onImageLoaded}
                key={`${currentItemIndex}_${itemIndex}`}
                resizeMode="contain"
              />
            )}
          </>
        )}
      </VStack>
      <HStack>
        <TouchableOpacity
          onPress={goToPreviewsIndex}
          onLongPress={onLongPress}
          onPressOut={onPressOut}>
          <HStack width={deviceWidth / 2} height={deviceHeight} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToNextIndex}
          onLongPress={onLongPress}
          onPressOut={onPressOut}>
          <HStack width={deviceWidth / 2} height={deviceHeight} />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};
export default memo(StoryItem);
const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
  mediaContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
