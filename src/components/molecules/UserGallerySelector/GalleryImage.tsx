import {Image, StyleSheet, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import CustomVideo from '~/components/atoms/CustomVideo';
import {deviceHeight, deviceWidth} from '~/utils/methods';

const GalleryImage = forwardRef(
  (
    {src, style, resizeMode}: {src: any; style?: any; resizeMode?: string},
    ref,
  ) => {
    const [source, setSource] = useState(src);
    const onChangeSource = value => {
      setSource(value);
    };
    useImperativeHandle(
      ref,
      () => ({
        onChangeSource,
      }),
      [],
    );

    return (
      <View style={styles.container}>
        {source?.type?.toLowerCase().includes('video') ? (
          <CustomVideo
            source={source?.uri}
            style={styles.media}
            resizeMode={resizeMode}
          />
        ) : (
          <Image source={source} style={styles.media} resizeMode={resizeMode} />
        )}
      </View>
    );
  },
);
export default GalleryImage;

const styles = StyleSheet.create({
  container: {
    width: 0.9 * deviceWidth,
    height: 0.23 * deviceHeight,
    marginBottom: 44,
    alignSelf: 'center',
  },
  media: {width: '100%', height: '100%'},
});
