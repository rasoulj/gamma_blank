import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  VolumeHighIconSet,
  VolumeSlashIconSet,
  scale,
} from '~/components/elemental';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {getColor} from '~/utils/helper/theme.methods';

const VolumeView = ({mutePosts}: {mutePosts: boolean}) => {
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(400)}
      style={styles.container}>
      <View style={styles.innerView}>
        {mutePosts ? (
          <VolumeSlashIconSet
            color="gray.50"
            width={scale(26)}
            height={scale(26)}
          />
        ) : (
          <VolumeHighIconSet
            color="gray.50"
            width={scale(26)}
            height={scale(26)}
          />
        )}
      </View>
    </Animated.View>
  );
};
export default memo(VolumeView);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  innerView: {
    borderRadius: 100,
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getColor({color: 'gray.500'}),
  },
});
