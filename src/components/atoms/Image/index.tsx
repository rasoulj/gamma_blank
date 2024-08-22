import {Pressable, VStack} from 'native-base';
import React, {Fragment, memo, useState} from 'react';
import FastImage, {FastImageProps, ResizeMode} from 'react-native-fast-image';
import Typography from '../Typography';
import {Modal, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StyleSheet} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import {ArrowLeftIconSet} from '~/assets/iconset';

interface IMProps extends FastImageProps {
  src: any;
  resizeMode?: ResizeMode;
  errorImage?: any;
  errorText?: string;
  zoomable?: boolean;
}
const Image = ({
  src,
  resizeMode = 'stretch',
  errorImage,
  errorText,
  zoomable = false,
  ...props
}: Partial<IMProps>) => {
  const [hasError, setHasError] = useState(false);
  const [imageZoom, setImageZoom] = useState<boolean>(false);

  const onError = () => {
    setHasError(true);
  };
  errorText && console.log({src});

  const onPressHandler = () => {
    setImageZoom(true);
  };

  const oncloseZoomModal = () => {
    setImageZoom(false);
  };

  return (
    <>
      {(hasError && errorText) || (errorText && !src) ? (
        <VStack
          alignItems="center"
          justifyContent="center"
          style={
            props?.style ?? {
              width: '100%',
              height: 200,
            }
          }>
          <Typography>{errorText}</Typography>
        </VStack>
      ) : (
        <Fragment>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!zoomable}
            onPress={onPressHandler}>
            <FastImage
              source={{
                priority: FastImage.priority.normal,
                uri:
                  src && src?.includes?.('https')
                    ? src
                    : src?.uri ??
                      errorImage ??
                      'https://via.placeholder.com/350x150',
              }}
              style={{
                width: '100%',
                height: 200,
              }}
              resizeMode={resizeMode}
              onError={onError}
              {...props}
            />
          </TouchableOpacity>
          <Modal
            visible={imageZoom}
            onClose={oncloseZoomModal}
            transparent={true}>
            <ImageViewer
              style={styles.viewer}
              enableSwipeDown
              renderHeader={() => (
                <Pressable left="1" top={'20'} onPress={oncloseZoomModal} p="3">
                  <ArrowLeftIconSet color={'gray.800'} />
                </Pressable>
              )}
              imageUrls={[{url: src?.uri ?? src}]}
              onSwipeDown={oncloseZoomModal}
              onClick={oncloseZoomModal}
              backgroundColor={getColor({color: 'background.700'})}
              renderIndicator={() => null}
            />
          </Modal>
        </Fragment>
      )}
    </>
  );
};

export default memo(Image);

const styles = StyleSheet.create({
  viewer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
