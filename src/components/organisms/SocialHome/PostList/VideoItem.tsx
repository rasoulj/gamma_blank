import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {FadeOut} from 'react-native-reanimated';
import {WithLocalSvg} from 'react-native-svg';
import {VideoPlay3} from '~/assets';
import {CustomVideo} from '~/components';
import {
  Image,
  VStack,
  VolumeHighIconSet,
  VolumeSlashIconSet,
  scale,
} from '~/components/elemental';
import postStore from '~/stores/postStore';

const VideoItem = forwardRef(
  (
    {
      source,
      style,
      poster,
      onPress,
      longVideo = false,
      paused = true,
    }: {
      source?: any;
      style?: any;
      poster?: any;
      onPress?: any;
      fullVideoUrl?: any;
      longVideo?: boolean;
      paused?: boolean;
    },
    ref,
  ) => {
    const [isPaused, setIsPaused] = useState(paused);
    const [showThumbNail, setShowThumbnail] = useState(true);

    useEffect(() => {
      setIsPaused(paused);
    }, [paused]);

    useImperativeHandle(ref, () => ({
      play() {
        setIsPaused(false);
        setShowThumbnail(false);
        setIsLoading(true);
      },
      pause() {
        setIsPaused(true);
        setShowThumbnail(true);
        setIsLoading(false);
      },
    }));
    const [isLoading, setIsLoading] = useState(true);
    const onLoadEnd = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1);
    };
    const {mutePosts, setMutePosts} = postStore(state => state);
    const onPressVolume = () => {
      setMutePosts(!mutePosts);
    };

    return (
      <VStack style={style}>
        {!showThumbNail || !paused ? (
          <CustomVideo
            style={style}
            source={source}
            paused={isPaused}
            onLoadEnd={onLoadEnd}
            onPress={onPress}
            longVideo={longVideo}
            disableController
            isMute={mutePosts}
          />
        ) : (
          <View style={style}>
            <VStack style={styles.icon}>
              <WithLocalSvg
                asset={VideoPlay3}
                width={scale(28)}
                height={scale(26)}
              />
            </VStack>
            <Image style={style} resizeMode="cover" source={{uri: poster}} />
          </View>
        )}
        <View style={{position: 'absolute', padding: 10}}>
          <TouchableOpacity onPress={onPressVolume}>
            {mutePosts ? (
              <VolumeSlashIconSet color={'gray.50'} />
            ) : (
              <VolumeHighIconSet color={'gray.50'} />
            )}
          </TouchableOpacity>
        </View>
        {isLoading && (
          <Animated.View exiting={FadeOut.duration(100)} style={styles.poster}>
            <VStack style={styles.icon}>
              <WithLocalSvg
                asset={VideoPlay3}
                width={scale(28)}
                height={scale(26)}
              />
            </VStack>
            <Image style={style} resizeMode="cover" source={{uri: poster}} />
          </Animated.View>
        )}
      </VStack>
    );
  },
);

export default VideoItem;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    margin: 20,
    zIndex: 1000,
    right: 0,
  },
  poster: {
    position: 'absolute',
    zIndex: 100000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
});
