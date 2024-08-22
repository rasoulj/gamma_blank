import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const route: any = useRoute();
  return (
    <View>
      <Video
        source={{
          uri: route?.params?.url,
        }}
        style={styles.video}
        muted={false}
        repeat={false}
        paused={true}
        onLoadError={er => console.log('video err', er)}
        controls
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: '#222',
  },
});
