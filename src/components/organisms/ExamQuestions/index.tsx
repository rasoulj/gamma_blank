import React, {
  Fragment,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Button,
  CloseIcon,
  LoadIndicator,
  Pressable,
  Progress,
  RadioButton,
  Typography,
  VStack,
  getColor,
  useIsFocused,
  useNavigate,
  useRoute,
} from '~/components';
import {HStack} from 'native-base';
import useHeader from '~/components/elemental/hooks/use_header';
import {ScrollView, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import ExamSuccessStatus from '~/assets/icons/CustomIcons/ExamSuccessStatus';
import ExamFailedStatus from '~/assets/icons/CustomIcons/ExamFailedStatus';
import {
  useAnswerExam,
  useCreateStreak,
  useGetExams,
  useGetMyCourses,
} from '../CourseList/hook';
import {useQueryClient} from 'react-query';

const ExamQuestions = () => {
  const {navigateWithName, navigation} = useNavigate();
  const {params} = useRoute();
  const queryClinet = useQueryClient();
  const isFocused = useIsFocused();

  const progressRef = useRef<AnimatedCircularProgress>();

  const [finishExam, setFinishExam] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState();
  const [arrayAnswers, setArrayAnswers] = useState([]);
  const [result, setResult] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [stopInterval, setStopInterval] = useState(false);

  const {data, isLoading} = useGetExams({where: {id: {eq: params?.examId}}});

  const {data: nextData} = useGetMyCourses({
    enabled: !!params?.courseId,
    where: {
      and: [{course: {id: {eq: params?.courseId}}}],
    },
  });

  const examData = data?.pages[0]?.items ?? [];

  const {mutate, isLoading: answerLoading} = useAnswerExam();
  const {mutate: streakMutate, isLoading: streakLoading} = useCreateStreak();

  const logo = useMemo(
    () => (
      <Pressable onPress={() => navigation.goBack()}>
        <CloseIcon />
      </Pressable>
    ),
    [],
  );

  const {} = useHeader({
    logo,
    hasBack: false,
    title: {
      children: params?.title ?? 'Exam',
      fontWeight: 'bold',
      fontSize: 'lg',
    },
  });

  useEffect(() => {
    if (
      parseInt(data?.pages[0]?.timeToAnswer?.slice(2, -1)) > 0 &&
      !params?.questionReviewData
    ) {
      if (!finishExam) {
        let interval;
        if (!stopInterval) {
          interval = setInterval(() => {
            setCount(prevCount => {
              if (prevCount === 0) {
                clearInterval(interval);

                if (answer === null || answer === undefined) {
                  setAnswer({id: ''});
                }
                return 0;
              } else {
                return prevCount - 1;
              }
            });
          }, 1000);
        }

        return () => clearInterval(interval);
      }
    } else {
    }
  }, [data, questionIndex, finishExam, stopInterval]);

  useEffect(() => {
    if (data) {
      setCount(parseInt(data?.pages[0]?.timeToAnswer?.slice(2, -1)));
    }
  }, [data]);

  useEffect(() => {
    if (params?.lastResult) {
      setFinishExam(true);
      setIsSuccess(params?.lastResult?.passed);
      setResult(
        (params?.lastResult?.rightAnswersCount * 100) /
          params?.lastResult?.questionsCount,
      );
      setStopInterval(true);
      setCorrectAnswer(
        `${params?.lastResult?.rightAnswersCount}/${params?.lastResult?.questionsCount}`,
      );
    } else {
      setStopInterval(false);
      setFinishExam(false);
      setResult(0);
      setAnswer(null);
      setArrayAnswers([]);
      setIsSuccess(false);
      setCorrectAnswer('');
      setQuestionIndex(0);
    }
    setCount(parseInt(data?.pages[0]?.timeToAnswer?.slice(2, -1)));
  }, [isFocused]);

  useEffect(() => {
    if (params?.questionReviewData) {
      setAnswer({id: params?.questionReviewData?.rightAnswer});
    }
  }, [params?.questionReviewData]);

  const onNextPress = () => {
    if (params?.questionReviewData) {
      navigateWithName('CreateExamItem', {
        examId: params?.examId,
        courseId: params?.courseId,
      });
    } else if (finishExam) {
      setFinishExam(false);
      setResult(0);
      setAnswer(null);
      setArrayAnswers([]);
      setIsSuccess(false);
      setCorrectAnswer('');
      setQuestionIndex(0);
      setCount(parseInt(data?.pages[0]?.timeToAnswer?.slice(2, -1)));
      setStopInterval(false);
    } else if (examData?.length > questionIndex + 1) {
      setQuestionIndex(questionIndex + 1);
      setAnswer(null);
      setCount(parseInt(data?.pages[0]?.timeToAnswer?.slice(2, -1)));
      setStopInterval(false);
    } else {
      mutate(
        {input: arrayAnswers},
        {
          onSuccess(data) {
            setFinishExam(true);
            if (data?.course_answerToExam?.result?.passed) {
              setIsSuccess(true);
            }
            queryClinet.invalidateQueries('course_getCourses');
            queryClinet.invalidateQueries('getMyCourses');
            queryClinet.invalidateQueries('getExamResults');
            streakMutate({
              onSuccess() {
                queryClinet.invalidateQueries('getGetStreak');
              },
            });
            setResult(
              (data?.course_answerToExam?.result?.rightAnswersCount * 100) /
                data?.course_answerToExam?.result?.questionsCount,
            );
            setCorrectAnswer(
              `${data?.course_answerToExam?.result?.rightAnswersCount}/${data?.course_answerToExam?.result?.questionsCount}`,
            );
            setStopInterval(true);
          },
        },
      );
    }
  };

  return isLoading ? (
    <LoadIndicator />
  ) : (
    <Fragment>
      <VStack flex={1}>
        {finishExam ? (
          <VStack
            alignItems={'center'}
            justifyContent={'center'}
            mt="10%"
            px="5">
            {isSuccess ? <ExamSuccessStatus /> : <ExamFailedStatus />}
            <Typography
              my={'6'}
              fontWeight={'700'}
              color={isSuccess ? 'primary.500' : 'error.500'}
              fontSize="xl">
              {isSuccess ? 'Congratulations!' : 'Failed!'}
            </Typography>
            <Typography
              mb={'2'}
              fontWeight={'500'}
              color={'gray.800'}
              fontSize="lg">
              Result = {Math.floor(result)}%
            </Typography>
            {isSuccess && (
              <Typography fontWeight={'500'} color={'gray.800'} fontSize="md">
                Answer: {correctAnswer} Right Answers
              </Typography>
            )}
          </VStack>
        ) : isLoading ? (
          <LoadIndicator />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <Typography
              fontSize="2xl"
              fontWeight={'bold'}
              color="gray.800"
              my="6">
              {params?.questionReviewData
                ? params?.questionReviewData?.question
                : examData[questionIndex]?.question}
            </Typography>
            {JSON.parse(
              JSON.stringify(params?.questionReviewData?.options) ??
                examData[questionIndex]?.options ??
                '',
            )?.map((item, index) => {
              return (
                <HStack
                  key={index}
                  py="4"
                  px="6"
                  justifyContent={'space-between'}
                  bg={getColor({
                    color:
                      Number(
                        params?.questionReviewData?.rightAnswer ??
                          examData[questionIndex]?.rightAnswer,
                      ) === Number(item?.id) && answer
                        ? 'primary.100'
                        : Number(answer?.id) === Number(item?.id) &&
                          Number(
                            params?.questionReviewData?.rightAnswer ??
                              examData[questionIndex]?.rightAnswer,
                          ) !== Number(item?.id)
                        ? 'error.100'
                        : 'gray.50',
                  })}
                  borderRadius={15}
                  borderWidth={1}
                  borderColor={getColor({
                    color:
                      Number(
                        params?.questionReviewData?.rightAnswer ??
                          examData[questionIndex]?.rightAnswer,
                      ) === Number(item?.id) && answer
                        ? 'primary.500'
                        : 'gray.300',
                  })}
                  my="2">
                  <Typography
                    fontSize="md"
                    color={'black.500'}
                    fontWeight={'500'}
                    flex={1}>
                    {item?.title}
                  </Typography>
                  <RadioButton
                    checkedColor={
                      Number(answer?.id) === Number(item?.id) &&
                      Number(
                        params?.questionReviewData?.rightAnswer ??
                          examData[questionIndex]?.rightAnswer,
                      ) !== Number(item?.id)
                        ? 'error.500'
                        : 'primary.500'
                    }
                    disabled={!!answer}
                    checked={
                      Number(answer?.id) === Number(item?.id) ||
                      (Number(
                        params?.questionReviewData?.rightAnswer ??
                          examData[questionIndex]?.rightAnswer,
                      ) === Number(item?.id) &&
                        answer)
                        ? true
                        : false
                    }
                    onPress={() => {
                      setAnswer({
                        examItemId: examData[questionIndex]?.id,
                        id: item?.id,
                      });
                      setArrayAnswers([
                        ...arrayAnswers,
                        {
                          examItemId: examData[questionIndex]?.id,
                          answer: item?.id?.toString(),
                        },
                      ]);
                      setStopInterval(true);
                    }}
                  />
                </HStack>
              );
            })}
          </ScrollView>
        )}
      </VStack>
      {!finishExam && (
        <Fragment>
          <VStack
            alignItems={'center'}
            position={'absolute'}
            bottom={'13%'}
            alignSelf={'center'}
            px="5">
            {parseInt(data?.pages[0]?.timeToAnswer?.slice(2, -1)) !== 0 && (
              <AnimatedCircularProgress
                size={80}
                ref={progressRef}
                width={6}
                fill={
                  (count * 100) /
                  parseInt(data?.pages[0]?.timeToAnswer?.slice(2, -1))
                }
                tintColor={getColor({color: 'secondary.500'})}
                backgroundColor={getColor({color: 'secondary.200'})}>
                {fill => (
                  <Typography color={'secondary.500'} fontSize="xl">
                    {count}
                  </Typography>
                )}
              </AnimatedCircularProgress>
            )}
          </VStack>
          {!params?.questionReviewData && (
            <VStack
              mt="3.5"
              position={'absolute'}
              width={'100%'}
              bottom={'10%'}>
              <Progress
                progress={((questionIndex + 1) * 100) / examData?.length}
                parentColor={getColor({color: 'gray.300'})}
                presentColor={getColor({color: 'gray.800'})}
                hidePercent={true}
                style={styles.progress}
              />
            </VStack>
          )}
        </Fragment>
      )}
      {finishExam && isSuccess ? (
        <HStack justifyContent={'space-between'} px="5">
          <Button
            onPress={() => {
              navigateWithName('ExamDetail', {
                examId: params?.examId,
                courseId: params?.courseId,
              });
            }}
            variant={'outline'}
            style={styles.button}>
            Start Over
          </Button>
          <Button
            onPress={() => {
              setFinishExam(true);
              if (
                nextData?.pages[0]?.nextTopicId === null &&
                nextData?.pages[0]?.course?.hasCertificate
              ) {
                navigateWithName('CourseCertification', {
                  courseId: params?.courseId,
                });
              } else {
                navigateWithName('LessonDetails', {
                  id: nextData?.pages[0]?.nextTopicId,
                });
              }
            }}
            style={styles.button}>
            Next Lesson
          </Button>
        </HStack>
      ) : (
        <Button
          onPress={() => onNextPress()}
          isLoading={answerLoading || streakLoading}
          disabled={finishExam ? false : !answer}
          mx="5"
          style={finishExam ? {} : !answer && styles.bgBtn}
          _text={finishExam ? {} : !answer && styles.txtBtn}>
          {finishExam ? 'Try Again' : 'Continue'}
        </Button>
      )}
    </Fragment>
  );
};

export default memo(ExamQuestions);

const styles = StyleSheet.create({
  button: {
    width: '48%',
  },

  progress: {
    marginHorizontal: -18,
  },

  bgBtn: {
    backgroundColor: getColor({color: 'primary.200'}),
    bottom: 0,
    marginTop: 16,
  },

  txtBtn: {color: getColor({color: 'gray.500'})},

  scrollView: {paddingBottom: 100, flexGrow: 1, paddingHorizontal: 20},
});
