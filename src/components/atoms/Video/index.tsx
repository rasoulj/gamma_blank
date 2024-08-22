import React, {memo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Video from 'react-native-video';
import {deviceWidth, deviceHeight, Screen} from '../../elemental';

function VideoScreen({
  videoSrc,
  videoStyle,
}: {
  videoSrc: string;
  videoStyle?: object;
}) {
  const [loading, setLoading] = useState(false);

  const onLoad = () => {
    setLoading(false);
  };
  const onLoadStart = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    showMessage({message: 'Something went wrong', type: 'danger'});
  };

  return (
    <Screen style={{flex: 1}}>
      {/* <Header title="Video Player" hasBack="false" /> */}
      <View style={styles.viewVideo}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : null}
        <Video
          source={{
            uri: videoSrc || '',
          }}
          style={[styles.video, {...videoStyle}]}
          muted={false}
          repeat={false}
          {...{onLoad, onLoadStart, onError}}
          autoPlay
          controls
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  viewVideo: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    // zIndex: 1000,
  },
});

export default memo(Video);
