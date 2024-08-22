import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ArrowDownIconSet,
  ArrowUpIconSet,
  Button,
  CloseIconSet,
  EyeIconSet,
  HStack,
  Layer,
  MoreIconSet,
  ScrollView,
  Typography,
  VStack,
  getColor,
  useNavigate,
  useRoute,
  useToast,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import PenSolidIconSet from '~/assets/icons/CustomIcons/PenSolid.icon';
import AddAnLessonModal from './AddAnLessonModal';
import AddAnTopicModal from './AddAnTopicModal';
import ConfirmationModal from '~/components/molecules/EducatorCourseItem/ConfirmationModal';
import {
  useCreateLesson,
  useCreateLessonTopic,
  useDeleteLesson,
  useDeleteTopic,
  useEditLesson,
  useGetCourses,
  useUpdateCourse,
  useUpdateLesson,
} from '../../CourseList/hook';
import {useQueryClient} from 'react-query';
import TopicModal from './TopicModal';
import {toPascalCase} from '~/utils/helper';
import {useNavigation} from '@react-navigation/native';

const AddLesson = () => {
  const {params} = useRoute();
  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();
  const navigation = useNavigation();
  const {toast} = useToast();

  const [showMore, setShowMore] = useState('');
  const [itemTopicModel, setItemTopicModel] = useState(false);
  const [addLessonModal, setAddLessonModal] = useState(
    params?.editable ? false : true,
  );
  const [itemModelTitle, setItemModelTitle] = useState();
  const [lessonName, setLessonName] = useState(null);
  const [deleteLessonVisible, setDeleteLessonVisible] = useState(false);
  const [topicModal, setTopicModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const {mutate: addMutate} = useCreateLesson();
  const {mutate: editLessonMutate} = useEditLesson();
  const {mutate: deleteMutate, isLoading: deleteLoading} = useDeleteLesson();
  const {mutate: lessonTopicMutate} = useCreateLessonTopic();

  const {mutate, isLoading: publishLoading} = useUpdateCourse();
  const {mutate: updateTopicMutate} = useUpdateLesson();

  const {mutate: deleteTopicMutate, isLoading: deleteTopicLoading} =
    useDeleteTopic();

  const {data: courseData}: any = useGetCourses({
    where: {course: {id: {eq: params?.courseId}}},
  });

  const icons = useMemo(
    () => (
      <EyeIconSet
        onPress={() =>
          navigateWithName('CourseDetails', {id: params?.courseId})
        }
      />
    ),
    [],
  );

  const {} = useHeader({
    icons,
    hasBack: true,
    title: {
      children: toPascalCase(courseData?.pages[0]?.course?.title ?? ''),
      fontWeight: 'bold',
    },
  });

  const rightSwipeActions = item => {
    return (
      <HStack>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            setLessonName(item);
            setDeleteLessonVisible(true);
          }}>
          <CloseIconSet width={20} height={20} color={'gray.50'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            setAddLessonModal(true);
            setLessonName(item);
          }}>
          <PenSolidIconSet />
        </TouchableOpacity>
      </HStack>
    );
  };

  function checkDuplicateLessonTitle(newTitle) {
    for (const {course} of courseData?.pages) {
      for (const lesson of course.lessons) {
        if (lesson.title?.toLowerCase() === newTitle?.toLowerCase()) {
          return true;
        }
      }
    }

    return false;
  }

  const onAddLesson = title => {
    if (checkDuplicateLessonTitle(title)) {
      toast({
        message: `The lesson title "${title}" already exists.`,
        type: 'error',
        containerStyle: styles.toastPosition,
        style: styles.errorToast,
      });
      return false;
    }
    addMutate(
      {input: {courseId: params?.courseId, title: title}},
      {
        onSuccess(data) {
          if (data?.course_createLesson?.status?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
            setAddLessonModal(false);
          }
        },
      },
    );
  };

  const onEditLesson = title => {
    if (checkDuplicateLessonTitle(title)) {
      toast({
        message: `The lesson title "${title}" already exists.`,
        type: 'error',
        containerStyle: styles.toastPosition,
        style: styles.errorToast,
      });
      return false;
    }
    editLessonMutate(
      {
        input: {
          courseId: params?.courseId,
          title: title,
          id: lessonName?.id,
        },
      },
      {
        onSuccess(data) {
          if (data?.course_updateLesson?.status?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
            setAddLessonModal(false);
            setLessonName(null);
          }
        },
      },
    );
  };

  function checkDuplicateTopicTitle(newTitle) {
    for (const course of courseData?.pages[0].course?.lessons) {
      for (const topic of course.topics) {
        if (topic.topic?.toLowerCase() === newTitle?.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  const onAddTopic = title => {
    if (checkDuplicateTopicTitle(title)) {
      toast({
        message: `The topic title "${title}" already exists.`,
        type: 'error',
        containerStyle: styles.toastPosition,
        style: styles.errorToast,
      });
      return false;
    }
    lessonTopicMutate(
      {input: {lessonId: itemModelTitle?.id, topic: title, isDraft: true}},
      {
        onSuccess(data) {
          if (data?.course_createLessonTopic?.status?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
            setShowMore(itemModelTitle?.id);
            setItemTopicModel(false);
          }
        },
      },
    );
  };

  const onDeleteLesson = () => {
    deleteMutate(
      {lessonId: lessonName?.id},
      {
        onSuccess(data) {
          if (data?.course_deleteLesson?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
            setLessonName(null);
            setDeleteLessonVisible(false);
          }
        },
      },
    );
  };

  useEffect(() => {
    const hasNullContent =
      courseData?.pages[0]?.course?.lessons.some(lesson =>
        lesson.topics.some(topic => topic.content === null),
      ) ||
      courseData?.pages[0]?.course?.lessons.some(
        lesson => lesson.topics.length === 0,
      ) ||
      courseData?.pages[0]?.course?.lessons?.length === 0;

    setIsButtonDisabled(
      !hasNullContent && !courseData?.pages[0]?.course?.isDraft
        ? true
        : courseData?.pages[0]?.course?.isDraft && hasNullContent
        ? true
        : hasNullContent,
    );
  }, [courseData]);

  const onPublish = () => {
    const submitInput = {
      id: courseData?.pages[0]?.course.id,
      title: courseData?.pages[0]?.course?.title,
      price: Number(courseData?.pages[0]?.course) ?? 0,
      description: courseData?.pages[0]?.course?.description,
      photoUrl: courseData?.pages[0]?.course?.photoUrl,
      category: courseData?.pages[0]?.course?.category,
      subcategory: courseData?.pages[0]?.course?.subcategory,
      faq: courseData?.pages[0]?.course?.faqs,
      level: courseData?.pages[0]?.course?.level,
      keywords: courseData?.pages[0]?.course?.keywords,
      isDraft: false,
      hasCertificate: courseData?.pages[0]?.course?.hasCertificate,
      aboutCertificate: courseData?.pages[0]?.course?.aboutCertificate,
      paymentTopicConfiguration:
        courseData?.pages[0]?.course?.paymentTopicConfiguration,
    };

    mutate(
      {input: submitInput},
      {
        onSuccess: (data: any) => {
          if (data?.course_updateCourse?.status?.value === 'Success') {
            queryClient.invalidateQueries(['getCourses']);
            toast({
              message: 'Published Successfully',
              type: 'success',
              containerStyle: styles.toastPosition,
              style: styles.toast,
            });
          }
        },
        onError: error => {
          toast({message: error.toString()});
        },
      },
    );
  };

  const onDeleteTopic = () => {
    deleteTopicMutate(
      {lessonTopicId: lessonName?.id},
      {
        onSuccess(data) {
          if (data?.course_deleteLessonTopic?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
            setLessonName(null);
            setItemModelTitle(null);
            setDeleteVisible(false);
          }
        },
      },
    );
  };

  const onEditTopic = title => {
    if (checkDuplicateTopicTitle(title)) {
      toast({
        message: `The topic title "${title}" already exists.`,
        type: 'error',
        containerStyle: styles.toastPosition,
        style: styles.errorToast,
      });
      return false;
    }
    updateTopicMutate(
      {
        input: {
          lessonId: lessonName?.lessonId,
          content: lessonName?.content,
          id: lessonName?.id,
          topic: title,
          duration: lessonName?.duration,
          isDraft: lessonName?.isDraft,
        },
      },
      {
        onSuccess(data) {
          if (data?.course_updateLessonTopic?.status?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
            setItemTopicModel(false);
            setItemModelTitle(null);
            setLessonName(null);
          }
        },
      },
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {courseData?.pages[0]?.course?.lessons?.map(item => {
          return (
            <Swipeable
              key={item?.id}
              renderRightActions={() => rightSwipeActions(item)}>
              <Layer style={styles.itemContainer}>
                <Layer style={styles.content}>
                  <TouchableOpacity
                    style={styles.rowView}
                    onPress={() =>
                      setShowMore(item?.id === showMore ? '' : item?.id)
                    }>
                    {showMore === item?.id ? (
                      <ArrowUpIconSet />
                    ) : (
                      <ArrowDownIconSet />
                    )}

                    <Typography style={styles.title} numberOfLines={2}>
                      {item?.title}
                    </Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setItemModelTitle(item);
                      setItemTopicModel(true);
                      setLessonName(null);
                    }}>
                    <Typography color={'secondary.500'} style={styles.addTopic}>
                      + Add Topic
                    </Typography>
                  </TouchableOpacity>
                </Layer>

                {showMore === item?.id &&
                  item?.topics?.map?.(i => {
                    return (
                      <Layer style={styles.layer} key={i?.id}>
                        <Typography
                          style={styles.topicTitle}
                          color="gray.800"
                          numberOfLines={1}>
                          {i?.topic}
                        </Typography>
                        <VStack style={styles.rotation}>
                          <MoreIconSet
                            onPress={() => {
                              setLessonName(i);
                              setTopicModal(true);
                            }}
                          />
                        </VStack>
                      </Layer>
                    );
                  })}
              </Layer>
            </Swipeable>
          );
        })}
        <Button
          variant={'outline'}
          style={styles.createBtn}
          _text={styles.btnText}
          onPress={() => {
            setLessonName(null);
            setAddLessonModal(true);
          }}>
          Add Lesson
        </Button>
      </ScrollView>

      <HStack justifyContent={'space-between'} bottom={0} mx="1">
        <Button
          variant={'outline'}
          style={styles.btn}
          _text={styles.titleBtn}
          onPress={() => navigation.goBack()}>
          Save as Draft
        </Button>
        <Button
          style={styles.btn}
          bgColor={isButtonDisabled ? 'primary.200' : 'primary.500'}
          _text={isButtonDisabled ? {color: 'gray.500'} : {}}
          disabled={isButtonDisabled}
          isLoading={publishLoading}
          onPress={onPublish}>
          Publish
        </Button>
      </HStack>
      <AddAnLessonModal
        isVisible={addLessonModal}
        onClose={() => setAddLessonModal(false)}
        lessonName={lessonName?.title}
        setLesson={data => {
          if (lessonName) {
            onEditLesson(data);
          } else {
            onAddLesson(data);
          }
        }}
      />
      <AddAnTopicModal
        isVisible={itemTopicModel}
        onClose={() => setItemTopicModel(false)}
        lessonName={lessonName?.topic}
        setLesson={data => {
          if (lessonName) {
            onEditTopic(data);
          } else {
            onAddTopic(data);
          }
        }}
      />
      <ConfirmationModal
        isVisible={deleteLessonVisible}
        onClose={() => setDeleteLessonVisible(false)}
        title="Are you sure you want to delete this lesson?"
        acceptTitle="Delete"
        rejectTitle="Cancel"
        onSubmit={() => onDeleteLesson()}
        isLoading={deleteLoading}
      />

      <TopicModal
        item={lessonName}
        isVisible={topicModal}
        courseId={params?.courseId}
        onClose={() => {
          setTopicModal(false);
        }}
        onAddContent={() => {
          navigateWithName('CreateLesson', {
            topicData: lessonName,
          });
        }}
        onDelete={() => setDeleteVisible(true)}
        onEdit={() => {
          setItemTopicModel(true);
        }}
      />
      <ConfirmationModal
        title="Are you sure you want to delete this topic?"
        rejectTitle="Cancel"
        acceptTitle="Delete"
        onClose={() => setDeleteVisible(false)}
        isVisible={deleteVisible}
        onSubmit={onDeleteTopic}
        isLoading={deleteTopicLoading}
      />
    </GestureHandlerRootView>
  );
};

export default AddLesson;

const styles = StyleSheet.create({
  titleBtn: {
    fontWeight: '600',
  },

  container: {flex: 1},

  btn: {
    width: '48%',
  },

  createBtn: {marginVertical: 24, height: 36, marginHorizontal: 2},

  closeView: {
    padding: 2,
    borderRadius: 100,
    backgroundColor: 'red',
  },

  btnText: {lineHeight: 16, fontWeight: '700'},

  layer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  closeBtn: {
    width: 24,
    height: 24,
    padding: 2,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 10,
  },

  emptyView: {
    width: 24,
    height: 24,
  },

  itemContainer: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    shadowColor: getColor({color: 'gray.400'}),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 2,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  addTopic: {fontSize: 14, fontWeight: '500'},

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },

  topicTitle: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },

  rowView: {flexDirection: 'row', alignItems: 'center', flex: 1},

  editBtn: {
    width: 24,
    height: 24,
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  rotation: {transform: [{rotate: '90deg'}]},

  toastPosition: {
    top: 55,
  },

  toast: {
    backgroundColor: getColor({color: 'success.100'}),
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  errorToast: {
    backgroundColor: getColor({color: 'error.100'}),
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
