import {Circle, HStack, VStack} from 'native-base';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Camera, TakePhotoOptions} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import {scale} from '~/utils/methods';
import {
  FlashIconSet,
  FlashSlashIconSet,
  GalleryIconSet,
  RefreshIconSet,
} from '~/assets/iconset';
import {MAX_VIDEO_STORY_DURATION} from './AddStory';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getColor} from '~/components/elemental';

const cameraOptions = {
  mediaType: 'photo',
  width: 600,
  height: 600,
  cropping: true,
  includeBase64: true,
  includeExif: true,
};
const TakePhotoBottomOptions = ({
  onFlipCameraPressed,
  camera,
  flash,
  supportsCameraFlipping,
  isDenied,
  onTakePhoto,
  onFlashPressed,
  supportsFlash,
  onRecordVideo,
  currentItem,
  setRecordingStartTime,
  setRecordingEndTime,
  timeRef,
  uploadFromCamera,
  uploadFromGallery,
  uploadPhoto,
  uploadVideo,
}: {
  onFlipCameraPressed: () => void;
  camera: React.RefObject<Camera>;
  supportsCameraFlipping: boolean;
  isDenied?: any;
  onTakePhoto: (path: string, mime?: any, isCompressed?: boolean) => void;
  onFlashPressed: () => void;
  flash: 'off' | 'on';
  supportsFlash: boolean;
  onRecordVideo?: any;
  currentItem?: any;
  setRecordingStartTime: (date: Date) => void;
  setRecordingEndTime: (date: Date) => void;
  timeRef: any;
  uploadFromCamera?: boolean;
  uploadFromGallery?: boolean;
  uploadPhoto?: boolean;
  uploadVideo?: boolean;
}) => {
  const [intervalVal, setIntervalVal] = useState<any>();

  const takePhotoOptions = useMemo<TakePhotoOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash,
      skipMetadata: true,
      enableShutterSound: true,
    }),
    [flash],
  );

  const onGalleryPress = () => {
    ImagePicker.openPicker({
      ...cameraOptions,
      mediaType:
        currentItem === 'Reels'
          ? 'video'
          : uploadPhoto && uploadVideo
          ? 'any'
          : uploadPhoto
          ? 'photo'
          : 'video',
      cropping: false,
    })
      .then(image => {
        if (image?.path) {
          onTakePhoto(image?.path, image?.mime, false);
        }
      })
      .catch(err => {})
      .finally();
  };

  const onReadyTakePhoto = async () => {
    const photo = await camera?.current?.takePhoto(takePhotoOptions);
    if (photo?.path) {
      if (onTakePhoto) {
        onTakePhoto(photo?.path, 'image/jpeg', true);
        return;
      }
    }
  };

  const reocrdTimeRef = useRef(0);
  const progressRef = useRef<AnimatedCircularProgress>();
  const stopStatusRef = useRef(false);
  useEffect(() => {}, []);
  const startRecording = () => {
    onRecordVideo?.();
    setTimeout(() => {
      camera?.current?.startRecording({
        onRecordingFinished: video => {
          clearInterval(intervalVal);
          stopStatusRef.current = false;
          setRecordingEndTime?.(new Date());
          progressRef?.current?.animate(0, 0);
          onRecordVideo?.(video);
          reocrdTimeRef.current = 0;
        },
        onRecordingError: error => {},
        videoBitRate: 0.45,
        videoCodec: 'h264',
        fileType: 'mp4',
      });
      setRecordingStartTime?.(new Date());
      progressRef.current.animate(100, MAX_VIDEO_STORY_DURATION * 1000);
    }, 100);
  };

  useEffect(() => {
    return () => {
      stopStatusRef.current = false;
    };
  }, []);

  const stopRecording = async () => {
    if (stopStatusRef?.current) return;
    await camera?.current?.stopRecording();
    stopStatusRef.current = true;
  };
  const onPressOut = () => {
    if (!stopStatusRef.current) stopRecording();
  };

  return (
    <HStack
      padding="5"
      width="100%"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      left={0}
      right={0}
      space="8"
      bottom="0">
      <HStack
        flex="1"
        space="8"
        alignItems="center"
        justifyContent={uploadFromCamera ? 'flex-end' : 'center'}>
        {uploadFromGallery && (
          <TouchableOpacity onPress={onGalleryPress}>
            <GalleryIconSet color={'background.200'} size={scale(24)} />
          </TouchableOpacity>
        )}
        {supportsFlash && uploadFromCamera && (
          <TouchableOpacity onPress={onFlashPressed}>
            {flash === 'off' ? (
              <FlashIconSet
                color="background.200"
                width={`${scale(24)}`}
                height={`${scale(24)}`}
              />
            ) : (
              <FlashSlashIconSet
                color="background.200"
                width={`${scale(24)}`}
                height={`${scale(24)}`}
              />
            )}
          </TouchableOpacity>
        )}
      </HStack>
      {uploadFromCamera && (
        <VStack>
          {!isDenied && (
            <TouchableOpacity
              onPress={currentItem != 'Reels' ? onReadyTakePhoto : undefined}
              onLongPress={uploadVideo ? startRecording : undefined}
              activeOpacity={1}
              onPressOut={uploadVideo ? onPressOut : undefined}>
              <AnimatedCircularProgress
                size={80}
                ref={progressRef}
                width={12}
                fill={0}
                onAnimationComplete={stopRecording}
                tintColor={getColor({color: 'primary.500'})}
                backgroundColor="rgba(255, 255, 255, 0.3)">
                {fill => <Circle height="60" w="60" bg={'background.200'} />}
              </AnimatedCircularProgress>
            </TouchableOpacity>
          )}
        </VStack>
      )}
      {uploadFromCamera && (
        <HStack
          flex="1"
          space="8"
          alignItems="center"
          justifyContent="flex-start">
          {supportsCameraFlipping && (
            <TouchableOpacity onPress={onFlipCameraPressed}>
              <RefreshIconSet color={'background.200'} size={scale(24)} />
            </TouchableOpacity>
          )}
        </HStack>
      )}
    </HStack>
  );
};
export default TakePhotoBottomOptions;
