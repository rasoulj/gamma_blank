import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const Unity = () => {
  return (
    <WebView
      source={{
        uri: 'https://zappar-xr.github.io/unity-example-face-tracking-face-mesh/',
      }}
      style={styles.contianer}
    />
  );
};

export default Unity;

const styles = StyleSheet.create({
  contianer:{flex: 1}
});
