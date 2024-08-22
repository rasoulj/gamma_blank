import React, {memo, useEffect, useState} from 'react';
import {useController} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {
  scale,
  deviceHeight,
  Input,
  Center,
  HStack,
  Text,
  VStack,
  View,
  Button,
  PlayIcon,
  getColor,
  NCameraIcon,
  Typography,
  deviceWidth,
} from '~/components/elemental';
import theme from '~/theme';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import {FormControl} from '../../elemental';
import {useUploadFile} from '../../elemental/hooks/useUploadFile';
import ImagePickerIcon from './ImagePickerIcon';
import VideoPickerIcon from './VideoPickerIcon';
import Video from 'react-native-video';

  React.forwardRef(
  (
    {
      name,
      type,
      title,
    }: {
      name: any;
      type: 'image' | 'video';
      title: string;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoading1, setIsLoading1] = React.useState(false);

    const [preview, setPreview] = React.useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [text, setText] = useState('');
    const [play, setPlay] = useState(false);
    useEffect(() => {
      if (type === 'video' && field?.value) {
        createImage();
      }
    }, [field?.value]);
    const createImage = async () => {
      const url = await createThumbnailVideo(field?.value);

      setPreview(url);
    };

    const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

    const cameraOptions: Options = {
      mediaType: 'photo',
      width: 600,
      height: 600,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    };
    const videoOptions: Options = {
      mediaType: 'video',
    };

    const MemoVideo = memo(CustomVideo);

    const onDeletePress = () => {
      setPlay(false);
      setTimeout(() => {
        field.onChange(null);
      }, 0);
    };

    const onChangeImage = async (image: any) => {
      uploadFileMutate(image, {
        onSuccess: (successData: any) => {
          setIsLoading(false);
          field.onChange(successData?.uploadedUrl);
        },
      });
    };

    const selectImage = async () => {
      setIsLoading(true);
      ImagePicker.openPicker(
        type === 'image' ? cameraOptions : videoOptions,
      ).then((image: any) => {
        onChangeImage?.(image);
      });
    };

    const onPressOpenCamera = () => {
      ImagePicker.openCamera(cameraOptions).then((image: any) => {
        onChangeImage?.(image);
      });
    };

    const onPress = () => {
      if (type === 'image') {
        Alert.alert('Upload', 'Select a source', [
          {text: 'Camera', onPress: () => onPressOpenCamera()},
          {text: 'Gallery', onPress: () => selectImage()},
          {text: 'Cancel', style: 'cancel'},
        ]);
      } else {
        Alert.alert('Upload', 'Select a source', [
          {text: 'Gallery', onPress: () => selectImage()},
          {text: 'Cancel', style: 'cancel'},
        ]);
      }
    };
    const imageHeight = deviceWidth * 0.5;
    return (
      <FormControl w={{base: '100%'}}>
        <TouchableOpacity
          ref={ref}
          activeOpacity={play ? 1 : 0.7}
          onPress={play ? () => null : onPress}>
          <HStack
            justifyContent="center"
            alignItems="center"
            // py={field.value ? 0 : '4'}
            borderRadius="full"
            borderColor="primary.400"
            style={{height: 49}}
            borderWidth={field.value ? 0 : '2'}
            space="3">
            {isUploading ? (
              <ActivityIndicator color="black" />
            ) : (
              <>
                {type === 'image' ? (
                  !field.value ? (
                    <>
                      {/* <ImagePickerIcon /> */}
                      <NCameraIcon />
                      <Typography
                        style={{
                          color: getColor({
                            color: 'primary.400',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }),
                        }}>
                        {title}
                      </Typography>
                    </>
                  ) : (
                    <VStack
                      width="100%"
                      space="4"
                      style={{
                        marginTop: 142,
                      }}>
                      <Center height={imageHeight} width={'100%'}>
                        {isLoading1 ? (
                          <Center
                            zIndex={1000}
                            position="absolute"
                            width="100%"
                            height="100%">
                            <ActivityIndicator
                              color={theme.colors.green[400]}
                              size="small"
                            />
                          </Center>
                        ) : (
                          false
                        )}
                        <Image
                          source={{uri: field?.value}}
                          onLoadStart={() => setIsLoading1(true)}
                          onLoadEnd={() => setIsLoading1(false)}
                          style={{
                            width: '100%',
                            height: imageHeight,
                            borderRadius: 15,
                            resizeMode: 'cover',
                            marginTop: 15,
                          }}
                        />
                      </Center>

                      <TouchableOpacity onPress={onDeletePress}>
                        <HStack
                          justifyContent="center"
                          alignItems="center"
                          // py="4"
                          style={{height: 49}}
                          borderRadius="full"
                          borderWidth={'1.5'}
                          borderColor="red.600"
                          space="3">
                          <Text color="red.600" style={{fontSize: 17}}>
                            Delete
                          </Text>
                        </HStack>
                      </TouchableOpacity>
                    </VStack>
                  )
                ) : !field.value ? (
                  <>
                    <VideoPickerIcon />
                    <Text>{title}</Text>
                  </>
                ) : (
                  <VStack width="100%" space="4">
                    {play ? null : (
                      <Center width={'100%'} height={deviceHeight * 0.4}>
                        {isLoading1 ? (
                          <Center
                            zIndex={1000}
                            position="absolute"
                            width="100%"
                            height="100%">
                            <ActivityIndicator
                              color={theme.colors.green[400]}
                              size="small"
                            />
                          </Center>
                        ) : (
                          false
                        )}
                        <TouchableOpacity
                          onPress={() => setPlay(true)}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            zIndex: 2000,
                          }}>
                          <PlayIcon />
                        </TouchableOpacity>
                        <Image
                          source={{uri: preview}}
                          onLoadStart={() => setIsLoading1(true)}
                          onLoadEnd={() => setIsLoading1(false)}
                          style={{
                            width: '100%',
                            height: deviceHeight * 0.4,
                            borderRadius: 5,
                            resizeMode: 'cover',
                          }}
                        />
                      </Center>
                    )}

                    <TouchableOpacity onPress={onDeletePress}>
                      <HStack
                        justifyContent="center"
                        alignItems="center"
                        // py="5"
                        style={{marginBottom: 20}}
                        borderRadius="full"
                        borderWidth={'1.5'}
                        borderColor="red.600"
                        space="3">
                        <Text color="red.600" style={{fontSize: 17}}>
                          Delete
                        </Text>
                      </HStack>
                    </TouchableOpacity>
                  </VStack>
                )}
              </>
            )}
          </HStack>
        </TouchableOpacity>

        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
          <View pt="5" borderRadius="xl">
            <Text textAlign="center" mb="4">
              Create Link
            </Text>
            <View px="4">
              <Input
                placeholder={'Link'}
                value={text}
                onChangeText={setText}
                style={[
                  {
                    fontSize: scale(12),

                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    backgroundColor: 'white',
                    marginHorizontal: 10,
                    marginTop: 10,
                    width: '90%',
                    marginVertical: 10,
                  },
                  Platform.OS === 'ios' && {height: scale(40)},
                ]}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopWidth: 1,
                borderColor: 'gray',
                marginTop: 15,
                borderRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  borderRightWidth: 1,
                  borderColor: 'gray',
                  paddingVertical: 12,
                  //   borderRadius: 20,
                }}>
                <Text style={{color: '#006194'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  field.onChange(text);
                  setIsVisible(false);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={{color: '#006194'}}>Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={play}
          onBackdropPress={() => {
            setPlay(false);
          }}>
          <MemoVideo uri={field?.value || ''} />
        </Modal>

        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: deviceHeight * 0.4,
  },
});

const CustomVideo = ({uri}) => {
  return (
    <Video
      source={{
        uri: uri,
      }}
      style={styles.video}
      resizeMode="cover"
      muted={false}
      repeat={false}
      onLoadError={er => console.log('errrrrr', er)}
      controls
    />
  );
};
