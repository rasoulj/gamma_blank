import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {
  AddIconSet,
  ArrowDown1IconSet,
  ArrowUp1IconSet,
  Button,
  Divider,
  EyeIconSet,
  HStack,
  Input,
  LoadIndicator,
  TrashIconSet,
  Typography,
  VStack,
  useNavigate,
  useRoute,
  useToast,
} from '~/components';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import CustomPicker from '~/components/atoms/CustomPicker';
import {
  useDeleteExamItem,
  useGetExams,
  useUpdateExamItem,
  useCreateExamItem,
  useUpdateExam,
} from '../../CourseList/hook';
import {useQueryClient} from 'react-query';
import useHeader from '~/components/elemental/hooks/use_header';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';
import {getColor} from '~/utils/helper/theme.methods';
import QuestionContainer from './QuestionContainer';
import ConfirmationModal from '~/components/molecules/EducatorCourseItem/ConfirmationModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {isNumber} from '~/utils/helper';

const defaultValues = {
  options: [
    {title: {}, id: {}},
    {title: {}, id: {}},
  ],
  question: '',
  rightAnswer: '',
  itemId: null,
};

const CreateExamItem = () => {
  const {params} = useRoute();
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [showActionButtons, setShowActionButtons] = useState();
  const [optionCount, setOptionCount] = useState();
  const [page, setPage] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [counter, setCounter] = useState(1);

  const {data, isLoading} = useGetExams({
    where: {id: {eq: params?.examId}},
  });

  const examData = data?.pages[0]?.items ?? [];

  function createArrayOfEmptyObjects(length) {
    return Array.from({length}, () => ({}));
  }

  const {...methods} = useForm({
    defaultValues: defaultValues,
  });

  const {handleSubmit, control, setValue, watch} = methods;

  const {fields, append, remove, swap} = useFieldArray({
    name: 'options',
    control,
  });

  const {mutate, isLoading: publishLoading} = watch('itemId')
    ? useUpdateExamItem()
    : useCreateExamItem();
  const {mutate: deleteMutate, isLoading: deleteLoading} = useDeleteExamItem();
  const {mutate: updateExamMutate, isLoading: updateLoading} = useUpdateExam();

  useEffect(() => {
    if (examData[page - 1]) {
      resetFormValues();
      const array = JSON.parse(examData[page - 1]?.options);

      setIsDirty(false);
      for (const i in array) {
        setValue(`options.${i}`, array[i]);
      }

      setValue('question', examData[page - 1]?.question);
      setValue('rightAnswer', examData[page - 1]?.rightAnswer);
      setValue('itemId', examData[page - 1]?.id);
      setCounter(examData?.length);
      setOptionCount(JSON.parse(examData[page - 1]?.options)?.length);
    } else {
      setIsDirty(false);
      const array = createArrayOfEmptyObjects(optionCount);
      for (const i in array) {
        setValue(`options.${i}`, array[i]);
      }
    }
  }, [page, examData, counter]);

  useEffect(() => {
    if (examData && examData?.length !== 0) {
      setPage(examData?.length);
    } else {
      setPage(1);
    }
  }, [isFocused]);

  const resetFormValues = () => {
    setValue('options', defaultValues.options);
    setValue('question', defaultValues.question);
    setValue('rightAnswer', defaultValues.rightAnswer);
    setValue('itemId', defaultValues.itemId);
  };

  const onPress = (inputData, navigate) => {
    if (isDirty) {
      mutate(
        {
          input: {
            question: inputData?.question,
            options: JSON.stringify(inputData?.options),
            rightAnswer: inputData?.rightAnswer.toString(),
            examId: params?.examId,
            id: watch('itemId') || null,
          },
        },
        {
          onSuccess(d) {
            if (
              d?.course_createExamItem?.status?.value === 'Success' ||
              d?.course_updateExamItem.status?.value === 'Success'
            ) {
              queryClient.invalidateQueries('getExams');
              if (isNumber(navigate)) {
                setIsDirty(false);
                resetFormValues();
                setPage(navigate);
              } else if (navigate === 'onDraft' || navigate === 'onPublish') {
              } else {
                setIsDirty(false);
                resetFormValues();
                setPage(page + 1);

                if (navigate === 'addQuestion') {
                  setCounter(counter + 1);
                }
              }

              if (navigate === 'goBack') {
                navigation.goBack();
              } else if (navigate === 'onPublish') {
                onPublish();
              } else if (navigate === 'onDraft') {
                onSaveDraft();
              } else if (navigate === 'review') {
                navigateWithName('ExamQuestions', {
                  examId: params?.examId,
                  courseId: params?.courseId,
                  time: examData?.timeToAnswer?.slice(2, -1),
                  title: 'Exam Preview',
                  questionReviewData: questionReviewData,
                });
              }
            } else {
              toast({
                message: d?.course_createExamItem?.status?.description,
                type: 'error',
              });
            }
          },
        },
      );
    } else {
      resetFormValues();
      setIsDirty(false);

      if (isNumber(navigate)) {
        setPage(navigate);
      } else if (navigate === 'onDraft' || navigate === 'onPublish') {
      } else {
        setPage(page + 1);
        if (navigate === 'addQuestion') {
          setCounter(counter + 1);
        }
      }
      if (navigate === 'goBack') {
        navigation.goBack();
      } else if (navigate === 'onPublish') {
        onPublish();
      } else if (navigate === 'onDraft') {
        onSaveDraft();
      } else if (navigate === 'review') {
        navigateWithName('ExamQuestions', {
          examId: params?.examId,
          courseId: params?.courseId,
          time: examData?.timeToAnswer?.slice(2, -1),
          title: 'Exam Preview',
          questionReviewData: questionReviewData,
        });
      }
    }
  };

  const onDelete = () => {
    if (examData[page - 1]?.id) {
      deleteMutate(
        {examItemId: examData[page - 1]?.id},
        {
          onSuccess(data) {
            if (data?.course_deleteExamItem?.value === 'Success') {
              queryClient.invalidateQueries('getExams');
              setIsDirty(false);
              resetFormValues();
              remove();
              if (page === 1) {
                setPage(1);
              } else {
                setPage(page - 1);
              }

              setCounter(counter - 1);
              setDeleteModalVisible(false);
            } else {
              toast({
                message: data?.course_deleteExamItem?.description,
                type: 'error',
                containerStyle: styles.toastPosition,
                style: styles.toast,
              });
            }
          },
        },
      );
    } else {
      setIsDirty(false);
      resetFormValues();

      if (page === 1) {
        setPage(1);
      } else {
        setPage(page - 1);
      }
      setDeleteModalVisible(false);
    }
  };

  const onSaveDraft = () => {
    onSave(true);
  };

  const onPublish = () => {
    onSave(false);
  };

  const onSave = isDarft => {
    updateExamMutate(
      {
        input: {
          lessonTopicId: data?.pages[0]?.lessonTopicId,
          minPassingScore: data?.pages[0]?.minPassingScore,
          timeToAnswer: data?.pages[0]?.timeToAnswer,
          id: data?.pages[0]?.id,
          isDraft: isDarft,
        },
      },
      {
        onSuccess(data) {
          if (data?.course_updateExam?.status?.value === 'Success') {
            queryClient.invalidateQueries('getExams');
            queryClient.invalidateQueries('getCourses');
            toast({
              message: isDarft ? 'Saved in Drafts' : 'Published Successfully.',
              type: 'success',
              containerStyle: styles.toastPosition,
              style: styles.toast,
            });
            if (!isDarft) {
              navigateWithName('AddLesson', {
                courseId: params?.courseId,
                editable: true,
              });
            }
          } else {
            toast({
              message: data?.course_updateExam?.status?.description,
              type: 'error',
              containerStyle: styles.toastPosition,
              style: styles.toast,
            });
          }
        },
      },
    );
  };

  const replaceItemAtIndex = (fromIndex, toIndex) => {
    swap(fromIndex, toIndex);
    setShowActionButtons(toIndex);
  };

  const optionData = watch('options').map((option, index) => ({
    value: option?.id,
    label: `Option ${index + 1}`,
  }));

  const isButtonDisabled = !(
    watch('options') &&
    watch('question') &&
    Boolean(watch('rightAnswer').toString())
  );

  const showToast = () => {
    toast({
      message: 'Please complete fields!',
      type: 'error',
    });
  };

  const icons = isLoading ? null : (
    <FormProvider {...methods}>
      <EyeIconSet onPress={handleSubmit(params => onPress(params, 'review'))} />
    </FormProvider>
  );

  const {} = useHeader({
    icons,
    hasBack: true,
    onBack: isButtonDisabled
      ? () => navigation.goBack()
      : handleSubmit(params => onPress(params, 'goBack')),
    title: {
      children: 'Create Exam',
      fontWeight: 'bold',
    },
  });

  useEffect(() => {
    const backAction = () => {
      if (isButtonDisabled) {
        handleSubmit(params => onPress(params, 'goBack'));
      } else {
      }

      return isButtonDisabled ? true : false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const options = watch('options');
  const questionReviewData = watch();

  return isLoading ? (
    <LoadIndicator />
  ) : (
    <VStack style={styles.flex1}>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          contentContainerStyle={styles.mb}
          showsVerticalScrollIndicator={false}>
          <VStack px="5">
            <Typography fontWeight={'400'} fontSize="sm" my={'6'}>
              To add next question please write a question with at least 2
              options then tap on corner plus.
            </Typography>

            <Controller
              name={'question'}
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  value={value}
                  onChangeText={t => {
                    onChange(t);
                    setIsDirty(true);
                  }}
                  p="4"
                  size="2xl"
                  label={`Question`}
                  placeholder="Input Text Here"
                  variant="outline"
                  multiline
                  required
                  mb="3"
                  borderRadius="lg"
                />
              )}
            />
            <Typography fontWeight={'700'} fontSize="lg" my={'4'}>
              Answers
            </Typography>
            {options?.map((item, index) => (
              <VStack key={index}>
                {showActionButtons === index && (
                  <HStack
                    space={'4'}
                    bg={getColor({color: 'gray.300'})}
                    borderRadius={8}
                    p="2"
                    position={'absolute'}
                    right={2}
                    zIndex={10}>
                    <ArrowDown1IconSet
                      onPress={() => {
                        if (index < fields.length - 1) {
                          replaceItemAtIndex(index, index + 1);
                          setIsDirty(true);
                        }
                      }}
                    />
                    <ArrowUp1IconSet
                      onPress={() => {
                        if (index > 0) {
                          replaceItemAtIndex(index, index - 1);
                          setIsDirty(true);
                        }
                      }}
                    />
                    {watch('options')?.length > 2 && (
                      <TrashIconSet
                        color={'error.500'}
                        onPress={() => {
                          remove(index);
                          setIsDirty(true);
                        }}
                      />
                    )}
                  </HStack>
                )}
                <Controller
                  name={`options.${index}`}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Input
                      value={watch(`options.${index}.title`) ?? value?.title}
                      onChangeText={t => {
                        onChange({title: t, id: index});
                        setIsDirty(true);
                      }}
                      p="4"
                      size="2xl"
                      label={`Option ${index + 1}`}
                      placeholder="Input Text Here"
                      variant="outline"
                      multiline
                      borderRadius="lg"
                      mb="4"
                      onFocus={() => {
                        setShowActionButtons(index);
                      }}
                    />
                  )}
                />
              </VStack>
            ))}
          </VStack>
          {fields.length < 5 && (
            <VStack>
              <Divider mt="4" backgroundColor={getColor({color: 'gray.500'})} />
              <TouchableOpacity
                style={styles.createBtn}
                onPress={() => {
                  if (fields.length < 5) {
                    setOptionCount(fields.length + 1);
                    append('');
                    setIsDirty(true);
                  }
                }}>
                <AddIconSet color={'primary.500'} width={20} height={20} />
              </TouchableOpacity>
            </VStack>
          )}
          <VStack px="5">
            <CustomPicker
              placeholder="Choose"
              name={'rightAnswer'}
              title={'Right Answer'}
              data={optionData}
              required
              width="90%"
              left="1%"
              titleKey="label"
            />
          </VStack>
        </CustomKeyboardAwareScrollView>
        <HStack
          justifyContent={'space-between'}
          bottom={5}
          alignItems={'center'}
          pt="8"
          px="5">
          {examData[page - 1]?.id || isDirty ? (
            <TouchableOpacity
              style={styles.trashBtn}
              onPress={() => setDeleteModalVisible(true)}>
              {deleteLoading ? (
                <ActivityIndicator color={getColor({color: 'error.500'})} />
              ) : (
                <TrashIconSet color={'error.500'} />
              )}
            </TouchableOpacity>
          ) : (
            <VStack w="8" />
          )}
          <QuestionContainer
            page={page}
            setPage={index => {
              if (!isDirty) {
                setIsDirty(false);
                setPage(index);
              } else {
                handleSubmit(params => onPress(params, index)).call(undefined);
              }
            }}
            counter={counter}
          />
          <TouchableOpacity
            style={[
              styles.plusBtn,
              isButtonDisabled && {borderColor: getColor({color: 'gray.400'})},
            ]}
            onPress={
              isButtonDisabled
                ? () => {
                    showToast();
                  }
                : handleSubmit(params => onPress(params, 'addQuestion'))
            }>
            {publishLoading ? (
              <ActivityIndicator />
            ) : (
              <AddIconSet
                color={isButtonDisabled ? 'gray.400' : 'primary.500'}
              />
            )}
          </TouchableOpacity>
        </HStack>
        <HStack justifyContent={'space-between'} bottom={0} space={'3'} px="5">
          <Button
            variant={'outline'}
            style={styles.flex1}
            _text={styles.titleBtn}
            isLoading={updateLoading}
            onPress={() =>
              handleSubmit(params => onPress(params, 'onDraft')).call(undefined)
            }>
            Save as Draft
          </Button>
          <Button
            style={styles.flex1}
            bgColor={isButtonDisabled ? 'primary.200' : 'primary.500'}
            _text={isButtonDisabled ? {color: 'gray.500'} : {}}
            disabled={isButtonDisabled}
            isLoading={publishLoading}
            onPress={handleSubmit(params => onPress(params, 'onPublish'))}>
            Publish
          </Button>
        </HStack>
        <ConfirmationModal
          isVisible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          acceptTitle="Delete"
          rejectTitle="Cancel"
          onSubmit={() => onDelete()}
          isLoading={deleteLoading}
          title="This action will delete this screen.Are you sure you want to delete this question?"
        />
      </FormProvider>
    </VStack>
  );
};

export default memo(CreateExamItem);

const styles = StyleSheet.create({
  flex1: {flex: 1},

  titleBtn: {
    fontWeight: '600',
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

  plusBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    alignSelf: 'flex-end',
  },

  trashBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'error.500'}),
    alignSelf: 'flex-start',
  },

  mb: {paddingBottom: 100},

  toastPosition: {
    top: 55,
  },

  toast: {
    backgroundColor: getColor({color: 'success.100'}),
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
