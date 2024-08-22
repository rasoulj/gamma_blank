import {HStack, VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CloseIconSet,
  Image,
  TreeDotIcon,
  Typography,
  deviceWidth,
  getColor,
  isDark,
  scale,
  useIsFocused,
  useNavigate,
} from '~/components/elemental';
import StoryItemMenu from './StoryItemMenu';
import LinearGradient from 'react-native-linear-gradient';
import HighlightMenu from './HighlightMenu';
import StoryItemMyMenu from './StoryItemMyMenu';
import useAuthStore from '~/stores/authStore';

const StoryItemTopOptions = ({
  timelineCounter,
  animXList,
  item,
  onPressOut,
  onPauseTimeline,
  isHighlight = false,
  highlightId,
  storyOwner,
  onClose,
}: {
  timelineCounter?: number;
  animXList?: any[];
  item?: any;
  onPressOut: any;
  onPauseTimeline: any;
  isHighlight?: boolean;
  highlightId?: number;
  storyOwner?: any;
  onClose?: () => void;
}) => {
  const user = useAuthStore(state => state?.user);
  const {navigateWithName} = useNavigate();
  const isPressOut = useRef<boolean>(false);

  const isMine = item?.user?.id === user?.id;
  const [visibleMenu, setVisibleMenu] = useState(false);
  const onMenuPress = () => {
    onPauseTimeline();
    setVisibleMenu(true);
  };

  const onCloseMenu = () => setVisibleMenu(false);
  const onAddToHighlight = () => {
    onCloseMenu();
  };

  const {navigation} = useNavigate();
  const goBackOnPress = () => {
    if (onClose) onClose();
    else navigation.goBack();
  };

  const onProfilePress = () => {
    onPauseTimeline();
    isPressOut.current = true;
    navigateWithName('profile', {userId: item?.user?.id});
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && isPressOut.current) {
      onPressOut();
      isPressOut.current = false;
    }
  }, [isFocused]);

  return (
    <>
      <VStack
        position="absolute"
        zIndex={100}
        px={scale(16)}
        left={0}
        right={0}>
        {animXList && (
          <HStack mt={scale(16)}>
            {animXList.map((_, storyIndex) => (
              <View
                key={storyIndex}
                style={{
                  ...styles.timeoutBarItem,
                  width:
                    (deviceWidth - scale(16) * 2 - timelineCounter) /
                    timelineCounter,
                  marginEnd: storyIndex === timelineCounter - 1 ? 0 : 1,
                }}>
                <Animated.View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    width: deviceWidth
                      ? animXList[storyIndex].interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            0,
                            (deviceWidth - scale(16) * 2 - timelineCounter) /
                              timelineCounter,
                          ],
                          extrapolate: 'clamp',
                        })
                      : 0,
                    backgroundColor: getColor({color: 'background.200'}),
                  }}
                />
              </View>
            ))}
          </HStack>
        )}
        <HStack space="2" alignItems="center" mt="4">
          <TouchableOpacity onPress={onProfilePress}>
            <HStack space="2" alignItems="center">
              <Image
                src={
                  isHighlight
                    ? storyOwner?.user?.photoUrl
                    : item?.user?.photoUrl
                }
                style={styles.avatar}
                resizeMode="cover"
              />
              <Typography
                fontSize="sm"
                fontWeight="500"
                color={isDark() ? 'gray.800' : 'gray.50'}>
                {isHighlight
                  ? storyOwner?.user?.fullName
                  : item?.user?.fullName}
              </Typography>
            </HStack>
          </TouchableOpacity>
          <View style={styles.flex1} />
          {animXList?.length > 0 && (
            <TouchableOpacity onPress={onMenuPress}>
              <TreeDotIcon color={'#fafafa'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={goBackOnPress}>
            <View style={styles.avatar}>
              <CloseIconSet
                color={'gray.800'}
                width={scale(24)}
                height={scale(24)}
              />
            </View>
          </TouchableOpacity>
        </HStack>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}
          style={styles.gradient}
        />
      </VStack>
      {isHighlight ? (
        <HighlightMenu
          isVisible={visibleMenu}
          onClose={onCloseMenu}
          item={item}
          onPauseTimeline={onPauseTimeline}
          onPressOut={onPressOut}
          highlightId={highlightId}
        />
      ) : isMine ? (
        <StoryItemMyMenu
          isVisible={visibleMenu}
          onClose={onCloseMenu}
          item={item}
          onPauseTimeline={onPauseTimeline}
          onPressOut={onPressOut}
          onAddToHighlight={onAddToHighlight}
          counter={timelineCounter}
        />
      ) : (
        <StoryItemMenu
          isVisible={visibleMenu}
          onClose={onCloseMenu}
          item={item}
          onPauseTimeline={onPauseTimeline}
          onPressOut={onPressOut}
        />
      )}
    </>
  );
};
export default StoryItemTopOptions;

const styles = StyleSheet.create({
  avatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  timeoutBarWrapper: {
    top: 20,
    height: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },

  timeoutBarItem: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 3,
    overflow: 'hidden',
    marginEnd: 2,
  },

  gradient: {
    height: '140%',
    width: deviceWidth,
    position: 'absolute',
    opacity: 0.3,
    top: 0,
    bottom: 0,
    zIndex: -1,
  },

  flex1: {flex: 1},
});
