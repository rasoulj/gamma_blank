import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {
  ArrowDown1IconSet,
  ArrowUp1IconSet,
  Button,
  Divider,
  GalleryIconSet,
  HStack,
  Input,
  LoadIndicator,
  PlusIcon,
  TrashIconSet,
  Typography,
  VStack,
  getColor,
  useRoute,
  useToast,
} from '~/components';
import Video from 'react-native-video';
import useHeader from '~/components/elemental/hooks/use_header';
import {useQueryClient} from 'react-query';
import SelectContent from './SelectContent';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';
import SelectTextType from './SelectTextType';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import VideoSolidIconSet from '~/assets/iconset/Video/videoSolid';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {useGetCourses, useUpdateLesson} from '../../CourseList/hook';
import {useNavigation} from '@react-navigation/native';
import {
  countWords,
  durationToSeconds,
  formatMillisecondsToTimespan,
} from '~/utils/helper';

const totalWords = 240;
const desiredDurationInSeconds = 60;

const durationPerWordInSeconds = desiredDurationInSeconds / totalWords;

const cameraOptions: Options = {
  mediaType: 'photo',
  width: 550,
  height: 300,
  cropping: true,
  includeBase64: true,
  includeExif: true,
};

const CreateLesson = () => {
  const {params} = useRoute();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {toast} = useToast();

  const [selectContent, setSelectContent] = useState(true);
  const [selectTextTypeVisible, setSelectTextTypeVisible] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const {mutate: updateMutate, isLoading: updateLoading} = useUpdateLesson();

  const {data: courseData, isLoading}: any = useGetCourses({
    where: {
      course: {
        lessons: {some: {topics: {some: {id: {eq: params?.topicData?.id}}}}},
      },
    },
  });

  const lessonData = useMemo(() => {
    if (courseData?.pages?.length > 0) {
      return courseData?.pages[0]?.course?.lessons?.find(item =>
        item?.topics.find(i => i?.id === params?.topicData?.id),
      );
    }
  }, [courseData]);

  const topicData = useMemo(() => {
    return lessonData?.topics?.find(item => item?.id === params?.topicData?.id);
  }, [lessonData]);

  const content = useMemo(() => {
    if (
      topicData &&
      topicData.content !== null &&
      typeof topicData.content !== 'undefined'
    ) {
      try {
        return JSON.parse(topicData?.content);
      } catch (error) {
        return [];
      }
    } else {
      return [];
    }
  }, [topicData]);

  const {...methods} = useForm({
    defaultValues: {content: content},
  });

  const {handleSubmit, control, setValue, watch} = methods;

  const {fields, append, remove, swap, replace} = useFieldArray({
    name: 'content',
    control,
  });

  useEffect(() => {
    setValue('content', content);
    if (topicData) {
      setVideoDuration(durationToSeconds(topicData?.duration));
    }
  }, [content]);

  const {} = useHeader({
    hasBack: true,
    title: {children: topicData?.topic ?? 'Create Lesson', fontWeight: 'bold'},
  });

  const replaceItemAtIndex = (fromIndex, toIndex) => {
    swap(fromIndex, toIndex);
  };

  const onChangeImage = async (image: any, index: number) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        const updatedFields = [...watch('content')];
        updatedFields[index].photoUrl = successData?.uploadedUrl;
        replace(updatedFields);
      },
    });
  };

  const onChangeVideo = async (video: any, index: number) => {
    uploadFileMutate(video, {
      onSuccess: (successData: any) => {
        const updatedFields = [...watch('content')];
        updatedFields[index].videoUrl = successData?.uploadedUrl;
        replace(updatedFields);
      },
    });
  };

  const onPressOpenCamera = index => {
    ImagePicker.openCamera(cameraOptions).then((image: any) => {
      onChangeImage?.(image, index);
    });
  };
  const selectImage = async index => {
    ImagePicker.openPicker(cameraOptions).then((image: any) => {
      onChangeImage?.(image, index);
    });
  };
  const onPress = index => {
    Alert.alert('Upload', 'Select a source', [
      {text: 'Camera', onPress: () => onPressOpenCamera(index)},
      {text: 'Gallery', onPress: () => selectImage(index)},
      {text: 'Cancel', style: 'cancel', onPress: () => {}},
    ]);
  };

  const FilePiker = index => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then(video => {
        setVideoDuration(video?.duration / 1000);
        onChangeVideo?.(video, index);
      })
      .catch(() => {});
  };

  const onUpdateLesson = data => {
    const countWordsArray = data?.content?.map(
      item => countWords(item?.text) ?? 0,
    );
    const sumWords = countWordsArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    const durationForWords = sumWords * durationPerWordInSeconds;

    const duration = Number(durationForWords) + Number(videoDuration);

    const timeSpan = formatMillisecondsToTimespan(
      Math.ceil(duration > 30 ? duration : 30) * 1000,
    );

    updateMutate(
      {
        input: {
          lessonId: params?.topicData?.lessonId,
          content: JSON.stringify(data?.content),
          id: params?.topicData?.id,
          topic: params?.topicData?.topic,
          duration: `PT${timeSpan}`,
          isDraft: true,
        },
      },
      {
        onSuccess(d) {
          queryClient.invalidateQueries('getCourses');
          toast({
            message: 'Saved in Drafts',
            type: 'success',
            containerStyle: styles.toastPosition,
            style: styles.toast,
          });
        },
      },
    );
  };

  const onPublishLesson = data => {
    const countWordsArray = data?.content?.map(
      item => countWords(item?.text) ?? 0,
    );
    const sumWords = countWordsArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    const durationForWords = sumWords * durationPerWordInSeconds;

    const duration = Number(durationForWords) + Number(videoDuration);

    const timeSpan = formatMillisecondsToTimespan(
      Math.ceil(duration > 30 ? duration : 30) * 1000,
    );

    updateMutate(
      {
        input: {
          lessonId: params?.topicData?.lessonId,
          content: JSON.stringify(data?.content),
          id: params?.topicData?.id,
          topic: params?.topicData?.topic,
          duration: `PT${timeSpan}`,
          isDraft: false,
        },
      },
      {
        onSuccess(d) {
          queryClient.invalidateQueries('getCourses');
          toast({
            message: 'Published Successfully.',
            type: 'success',
            containerStyle: styles.toastPosition,
            style: styles.toast,
          });
          navigation.goBack();
        },
      },
    );
  };

  const isButtonDisabled =
    watch('content').length === 0 ||
    watch('content').some(
      item =>
        item?.photoUrl === '' ||
        item?.videoUrl === '' ||
        item?.text === '' ||
        item?.text?.length > 300 ||
        item?.title === '' ||
        item?.title > 300,
    );

  return isLoading ? (
    <LoadIndicator />
  ) : (
    <VStack style={styles.container}>
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <VStack my="5" px="5">
          {fields?.map((item, index) => (
            <Fragment key={item?.id}>
              {(item?.title ||
                item?.title === '' ||
                item?.text ||
                item?.text === '') && (
                <VStack style={styles.textContainer}>
                  <HStack
                    space={'4'}
                    bg={getColor({color: 'gray.300'})}
                    borderRadius={8}
                    p="2"
                    position={'absolute'}
                    mt="-5"
                    zIndex={10}
                    right={'2'}>
                    <ArrowDown1IconSet
                      width={'20'}
                      height={'20'}
                      onPress={() => {
                        if (index < fields.length - 1) {
                          replaceItemAtIndex(index, index + 1);
                        }
                      }}
                    />
                    <ArrowUp1IconSet
                      width={'20'}
                      height={'20'}
                      onPress={() => {
                        if (index > 0) {
                          replaceItemAtIndex(index, index - 1);
                        }
                      }}
                    />
                    <TrashIconSet
                      width={'20'}
                      height={'20'}
                      color={'error.500'}
                      onPress={() => remove(index)}
                    />
                  </HStack>
                  {(item?.title || item?.title === '') && (
                    <Controller
                      name={`content.${index}.title`}
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          p="4"
                          mt={3}
                          size="4xl"
                          fontSize={'md'}
                          fontWeight={'600'}
                          placeholderTextColor={getColor({color: 'gray.500'})}
                          placeholder="Heading"
                          variant="unstyled"
                          borderRadius="lg"
                        />
                      )}
                    />
                  )}
                  {(item?.text || item?.text === '') && (
                    <Controller
                      name={`content.${index}.text`}
                      control={control}
                      rules={{required: true}}
                      render={({field: {value, onChange}}) => (
                        <>
                          <Input
                            value={value}
                            onChangeText={onChange}
                            px="4"
                            mt={item?.title || item?.title === '' ? 0 : 3}
                            pt={item?.title || item?.title === '' ? 0 : 3}
                            size="2xl"
                            multiline
                            multi
                            placeholder="Input Text Here"
                            variant="unstyled"
                            borderRadius="lg"
                          />

                          <Typography
                            fontSize="xs"
                            color={
                              value?.length >= 300 ? 'red.400' : 'gray.400'
                            }
                            position={'absolute'}
                            bottom={2.5}
                            right={2}>
                            {value?.length || 0}/300
                          </Typography>
                          <Divider bottom={2} w="95%" alignSelf={'center'} />
                        </>
                      )}
                    />
                  )}
                </VStack>
              )}
              {(item?.photoUrl || item?.photoUrl === '') && (
                <VStack style={styles.textContainer}>
                  <HStack
                    space={'4'}
                    bg={getColor({color: 'gray.300'})}
                    borderRadius={8}
                    p="2"
                    position={'absolute'}
                    mt="-5"
                    right={'2'}>
                    <GalleryIconSet
                      width={'20'}
                      height={'20'}
                      onPress={() => {
                        onPress(index);
                      }}
                    />
                    <ArrowDown1IconSet
                      width={'20'}
                      height={'20'}
                      onPress={() => {
                        if (index < fields.length - 1) {
                          replaceItemAtIndex(index, index + 1);
                        }
                      }}
                    />
                    <ArrowUp1IconSet
                      width={'20'}
                      height={'20'}
                      onPress={() => {
                        if (index > 0) {
                          replaceItemAtIndex(index, index - 1);
                        }
                      }}
                    />
                    <TrashIconSet
                      width={'20'}
                      height={'20'}
                      color={'error.500'}
                      onPress={() => remove(index)}
                    />
                  </HStack>
                  <Controller
                    name={`content.${index}.photoUrl`}
                    control={control}
                    render={({field: {value}}) =>
                      value ? (
                        <Image
                          source={{uri: value}}
                          style={styles.image}
                          resizeMode="stretch"
                        />
                      ) : (
                        <VStack
                          alignSelf={'center'}
                          width={'full'}
                          height={167}
                          p="2"
                          my="4"
                          borderColor={getColor({color: 'background.700'})}>
                          {isUploading ? (
                            <ActivityIndicator />
                          ) : (
                            <CourseItemIcon />
                          )}
                        </VStack>
                      )
                    }
                  />
                </VStack>
              )}
              {(item?.videoUrl || item?.videoUrl === '') && (
                <VStack style={styles.textContainer}>
                  <HStack
                    space={'4'}
                    bg={getColor({color: 'gray.300'})}
                    borderRadius={8}
                    p="2"
                    position={'absolute'}
                    mt="-5"
                    right={'2'}>
                    <VideoSolidIconSet
                      width={'20'}
                      height={'20'}
                      color="gray.800"
                      onPress={() => {
                        FilePiker(index);
                      }}
                    />
                    <ArrowDown1IconSet
                      width={'20'}
                      height={'20'}
                      onPress={() => {
                        if (index < fields.length - 1) {
                          replaceItemAtIndex(index, index + 1);
                        }
                      }}
                    />
                    <ArrowUp1IconSet
                      width={'20'}
                      height={'20'}
                      onPress={() => {
                        if (index > 0) {
                          replaceItemAtIndex(index, index - 1);
                        }
                      }}
                    />
                    <TrashIconSet
                      width={'20'}
                      height={'20'}
                      color={'error.500'}
                      onPress={() => {
                        setVideoDuration(0);
                        remove(index);
                      }}
                    />
                  </HStack>
                  <Controller
                    name={`content.${index}.videoUrl`}
                    control={control}
                    render={({field: {value}}) =>
                      value ? (
                        <Video
                          source={{uri: value}}
                          paused={true}
                          controls={true}
                          style={styles.videoStyle}
                        />
                      ) : (
                        <VStack
                          alignSelf={'center'}
                          width={'full'}
                          height={167}
                          p="2"
                          my="4"
                          borderColor={getColor({color: 'background.700'})}>
                          {isUploading ? (
                            <ActivityIndicator />
                          ) : (
                            <CourseItemIcon />
                          )}
                        </VStack>
                      )
                    }
                  />
                </VStack>
              )}
            </Fragment>
          ))}
        </VStack>
        <VStack>
          <Divider mt="4" backgroundColor={getColor({color: 'gray.500'})} />
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => setSelectContent(true)}>
            <PlusIcon color={'primary.500'} />
          </TouchableOpacity>
        </VStack>
      </CustomKeyboardAwareScrollView>
      <HStack justifyContent={'space-between'} bottom={0} mx="5">
        <Button
          variant={'outline'}
          style={styles.btn}
          _text={styles.titleBtn}
          isLoading={updateLoading}
          onPress={handleSubmit(onUpdateLesson)}>
          Save as Draft
        </Button>
        <Button
          style={styles.btn}
          bgColor={isButtonDisabled ? 'primary.200' : 'primary.500'}
          _text={isButtonDisabled ? {color: 'gray.500'} : {}}
          disabled={isButtonDisabled}
          isLoading={updateLoading}
          onPress={handleSubmit(onPublishLesson)}>
          Publish
        </Button>
      </HStack>

      <SelectContent
        isVisible={selectContent}
        onClose={() => setSelectContent(false)}
        onTextPress={() => setSelectTextTypeVisible(true)}
        onImagePress={() => append({photoUrl: ''})}
        onVideoPress={() => append({videoUrl: ''})}
      />
      <SelectTextType
        isVisible={selectTextTypeVisible}
        onClose={() => setSelectTextTypeVisible(false)}
        setTextType={type => {
          if (type === 'onlyText') {
            append({text: ''});
          } else if (type === 'onlyHead') {
            append({title: ''});
          } else {
            append({text: '', title: ''});
          }
        }}
      />
    </VStack>
  );
};

export default CreateLesson;

const styles = StyleSheet.create({
  titleBtn: {
    fontWeight: '600',
  },
  container: {flex: 1},
  btn: {
    width: '48%',
  },
  createBtn: {
    height: 32,
    width: 32,
    borderRadius: 32,
    borderWidth: 2,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: getColor({color: 'primary.500'}),
    backgroundColor: getColor({color: 'background.500'}),
    zIndex: 100,
  },

  btnText: {lineHeight: 16, fontWeight: '700'},

  textContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: getColor({color: 'primary.500'}),
    marginVertical: 17,
  },

  rotation: {transform: [{rotate: '90deg'}]},

  image: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
    zIndex: -2,
  },

  scrollView: {
    paddingBottom: 100,
  },

  videoStyle: {
    width: '100%',
    height: 167,
    borderRadius: 5,
    marginVertical: 16,
  },

  toast: {
    backgroundColor: getColor({color: 'success.100'}),
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  toastPosition: {
    top: 55,
  },
});
