import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ArchiveMinusIconSet,
  Button,
  FlatList,
  HStack,
  Image,
  LoadIndicator,
  MoreIconSet,
  Pressable,
  Typography,
  VStack,
  getColor,
  useNavigate,
  useRoute,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import LessonQuestions from './LessonQuestions';
import CourseDetailModal from '../CourseDetail/Modals/CourseDetailModal';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import {isUrlImage} from '~/components/elemental/hooks/use_is_image';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {convertDurationToTime, toPascalCase} from '~/utils/helper';
import {
  useAddTopicToFavorite,
  useCreateStreak,
  useGetCourses,
  useGetReadTopics,
  useReadTopic,
  useRemoveTopicToFavorite,
  useTopicIsInFavorite,
} from '../CourseList/hook';
import {useQueryClient} from 'react-query';
import Video from 'react-native-video';

const itemHeight = 192;

const LessonDetail = () => {
  const {params} = useRoute();
  const queryClient = useQueryClient();
  const {navigateWithName, navigation} = useNavigate();

  const {data: courseData, isLoading}: any = useGetCourses({
    where: {
      course: {
        lessons: {some: {topics: {some: {id: {eq: params?.id}}}}},
      },
    },
  });

  const lessonData = useMemo(() => {
    if (courseData?.pages?.length > 0) {
      return courseData?.pages[0]?.course?.lessons?.find(item =>
        item?.topics.find(i => i?.id === params?.id),
      );
    }
  }, [courseData]);

  const topicData = useMemo(() => {
    return lessonData?.topics?.find(item => item?.id === params?.id);
  }, [lessonData]);

  const exams = useMemo(() => {
    return topicData?.exams;
  }, [topicData]);

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

  let islastItem = false;

  for (let i = courseData?.pages[0]?.course?.lessons.length - 1; i >= 0; i--) {
    const topics = courseData?.pages[0]?.course?.lessons[i].topics;
    const lastTopic = topics[topics.length - 1];

    if (lastTopic && lastTopic.id === params?.id) {
      islastItem = true;
      break;
    }
  }

  const [visible, setVisible] = useState(false);
  const [isLiked, setIsLike] = useState(false);

  const {mutate: favariteMutate, isLoading: isLoadingFavpriteMutate} =
    useAddTopicToFavorite();
  const {mutate: isLikeMutate} = useTopicIsInFavorite();
  const {mutate: readMutate, isLoading: readLoading} = useReadTopic();
  const {mutate: streakMutate, isLoading: streakLoading} = useCreateStreak();
  const {data, isLoading: readTopicsLoading} = useGetReadTopics({
    where: {lessonTopicId: {eq: params?.id}},
  });

  const {
    mutate: RemoveFavariteMutate,
    isLoading: isLoadingRemoveFavpriteMutate,
  } = useRemoveTopicToFavorite();

  useEffect(() => {
    isLikeMutate(
      {topicIds: [params?.id]},
      {
        onSuccess(data) {
          if (data?.course_topicIsInFavorite?.result[0]?.value) {
            setIsLike(true);
          } else {
            setIsLike(false);
          }
        },
      },
    );
  }, []);

  const icons = useMemo(
    () => (
      <VStack style={styles.moreIcon}>
        <MoreIconSet onPress={() => setVisible(true)} />
      </VStack>
    ),
    [],
  );

  const {} = useHeader({
    icons,
    hasBack: true,
    title: {
      children: toPascalCase(topicData?.topic ?? ''),
      fontWeight: 'bold',
      fontSize: 'lg',
    },
  });

  const onButtonPress = () => {
    if (exams?.length > 0) {
      readMutate(
        {lessonTopicId: params?.id},
        {
          onSuccess() {
            queryClient.invalidateQueries('getCourses');
            queryClient.invalidateQueries('getReadTopics');
            queryClient.invalidateQueries('getTopics');
            streakMutate({
              onSuccess() {
                queryClient.invalidateQueries('getGetStreak');
              },
            });
            navigateWithName('ExamDetail', {
              examId: exams[0]?.id,
              courseId: courseData?.pages[0]?.course?.id,
            });
          },
        },
      );
    } else if (data?.pages?.length === 0) {
      readMutate(
        {lessonTopicId: params?.id},
        {
          onSuccess() {
            queryClient.invalidateQueries('getCourses');
            queryClient.invalidateQueries('getReadTopics');
            queryClient.invalidateQueries('getTopics');
            streakMutate({
              onSuccess() {
                queryClient.invalidateQueries('getGetStreak');
              },
            });
            if (islastItem) {
              if (courseData?.pages[0]?.course?.hasCertificate) {
                navigateWithName('CourseCertification', {
                  courseId: courseData?.pages[0]?.course?.id,
                });
              } else {
                navigation.goBack();
              }
            }
          },
        },
      );
    } else {
      if (islastItem) {
        if (courseData?.pages[0]?.course?.hasCertificate) {
          navigateWithName('CourseCertification', {
            courseId: courseData?.pages[0]?.course?.id,
          });
        } else {
          navigation.goBack();
        }
      }
    }
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <Fragment>
        {item?.text && (
          <Typography
            fontSize="sm"
            lineHeight={19}
            fontWeight={'400'}
            color={'gray.800'}>
            {item?.text}
          </Typography>
        )}
        {item?.photoUrl ? (
          isUrlImage(item?.photoUrl) ? (
            <Image
              src={{
                uri: item?.photoUrl,
              }}
              style={styles.image}
              zoomable
            />
          ) : (
            <VStack
              alignSelf={'center'}
              width={'full'}
              height={167}
              p="2"
              my="4"
              borderRadius={5}
              borderWidth={1}
              borderColor={getColor({color: 'background.700'})}>
              <CourseItemIcon />
            </VStack>
          )
        ) : null}
        {item?.videoUrl && (
          <Video
            source={{uri: item?.videoUrl}}
            paused={true}
            controls={true}
            style={styles.videoStyle}
          />
        )}
      </Fragment>
    );
  }, []);

  const onFavoritePress = () => {
    if (isLiked) {
      RemoveFavariteMutate(
        {lessonId: topicData?.id},
        {
          onSuccess() {
            setIsLike(false);
            queryClient.invalidateQueries('getCourses');
            queryClient.invalidateQueries('getFavoriteLessons');
          },
        },
      );
    } else {
      favariteMutate(
        {lessonId: topicData?.id},
        {
          onSuccess(data) {
            setIsLike(true);
            queryClient.invalidateQueries('getCourses');
            queryClient.invalidateQueries('getFavoriteLessons');
          },
        },
      );
    }
  };

  const listHeaderComponent = useCallback(() => {
    return (
      <Fragment>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontSize="lg" fontWeight={'bold'} color="gray.800">
            {toPascalCase(topicData?.topic ?? '')}
          </Typography>

          {isLoadingFavpriteMutate || isLoadingRemoveFavpriteMutate ? (
            <ActivityIndicator />
          ) : (
            <Pressable
              onPress={() => {
                if (courseData?.pages[0]?.isEnrolled) {
                  onFavoritePress();
                }
              }}>
              <ArchiveMinusIconSet
                color={
                  !courseData?.pages[0]?.isEnrolled
                    ? 'gray.400'
                    : isLiked
                    ? 'primary.500'
                    : 'gray.800'
                }
                solid={isLiked}
              />
            </Pressable>
          )}
        </HStack>
        <Typography fontWeight={'500'} color="gray.500" fontSize="xs" mb="4">
          {convertDurationToTime(topicData?.duration)}
        </Typography>
      </Fragment>
    );
  }, [content, topicData, isLiked]);

  const listFooterComponet = useCallback(() => {
    return (
      <LessonQuestions
        topicId={topicData?.id}
        data={topicData?.questions}
        educator={courseData?.pages[0]?.course?.user}
      />
    );
  }, [topicData, courseData]);

  return isLoading || readTopicsLoading ? (
    <LoadIndicator />
  ) : (
    <Fragment>
      <FlatList
        data={content}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={listFooterComponet}
        style={styles.py}
        contentContainerStyle={styles.pb}
      />

      <CourseDetailModal
        item={topicData?.id}
        isVisible={visible}
        onClose={() => setVisible(false)}
        reportTitle={'lesson'}
      />

      <Button
        onPress={() => onButtonPress()}
        isLoading={readLoading || streakLoading}
        variant={data?.pages?.length === 0 ? 'solid' : 'outline'}>
        {exams?.length > 0
          ? 'Take the Exam'
          : data?.pages?.length === 0
          ? 'Mark as Read'
          : 'Marked as Read'}
      </Button>
    </Fragment>
  );
};

export default LessonDetail;

const styles = StyleSheet.create({
  mediaContainer: {
    width: '100%',
    height: itemHeight,
    borderRadius: 15,
    marginVertical: 16,
  },

  videoStyle: {
    width: '100%',
    height: itemHeight,
    borderRadius: 15,
    marginVertical: 16,
  },

  moreIcon: {transform: [{rotate: '90deg'}]},

  image: {
    borderRadius: 5,
    marginVertical: 16,
    width: '100%',
    height: itemHeight,
  },

  pb: {paddingBottom: 100},

  py: {paddingVertical: 24},
});
