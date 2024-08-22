import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {
  Button,
  LoadIndicator,
  Typography,
  VStack,
  useNavigate,
  useRoute,
} from '~/components';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CustomPicker from '~/components/atoms/CustomPicker';
import {useCreateExam, useGetExams, useUpdateExam} from '../../CourseList/hook';
import {useQueryClient} from 'react-query';

const timeData = [
  {label: '40 seconds', value: 'PT40S'},
  {label: '30 seconds', value: 'PT30S'},
  {label: '20 seconds', value: 'PT20S'},
  {label: '10 seconds', value: 'PT10S'},
  {label: 'No time Limit', value: 'PT0S'},
];

const minPassData = [
  {label: '70%', value: '70'},
  {label: '80%', value: '80'},
  {label: '90%', value: '90'},
  {label: '100%', value: '100'},
];

const schema = yup.object().shape({
  time: yup.string().required('Required'),
  minPass: yup.number().required('Required'),
});

const CreateExam = () => {
  const {params} = useRoute();
  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();

  const {data, isLoading: getDataLoading} = useGetExams({
    where: {lessonTopicId: {eq: params?.topicId}},
  });

  const examData = data?.pages[0] ?? {};

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      time: examData?.timeToAnswer ?? 'PT40S',
      minPass: examData?.minPassingScore ?? '70',
    },
  });

  const {handleSubmit, setValue, watch} = methods;

  const {mutate, isLoading} = examData?.id ? useUpdateExam() : useCreateExam();

  useEffect(() => {
    if (examData) {
      setValue('minPass', examData?.minPassingScore ?? '70');
      setValue('time', examData?.timeToAnswer ?? 'PT40S');
    }
  }, [data]);

  const onPress = data => {
    mutate(
      {
        input: {
          lessonTopicId: params.topicId,
          minPassingScore: data?.minPass,
          timeToAnswer: data?.time,
          id: examData?.id || null,
          isDraft: examData?.isDraft ?? true,
        },
      },
      {
        onSuccess(data) {
          if (
            data?.course_createExam?.status?.value === 'Success' ||
            data?.course_updateExam?.status?.value === 'Success'
          ) {
            queryClient.invalidateQueries('getCourses');
            queryClient.invalidateQueries('getExams');
            navigateWithName('CreateExamItem', {
              examId:
                data?.course_createExam?.result?.id ??
                data?.course_updateExam?.result?.id,
              courseId: params?.courseId,
            });
          }
        },
      },
    );
  };

  return getDataLoading ? (
    <LoadIndicator />
  ) : (
    <VStack style={styles.flex1}>
      <VStack style={styles.flex1}>
        <FormProvider {...methods}>
          <Typography fontWeight={'400'} fontSize="sm" my={'6'}>
            Adding exams means students have to pass them in order to go the
            next topic.
          </Typography>
          <CustomPicker
            placeholder="Choose"
            name={'time'}
            title={'Time to answer to each Question'}
            data={timeData}
            required
            width="89%"
            left="1%"
            titleKey="label"
            onChangeValue={(value: string) => {
              setValue('time', value);
            }}
          />
          <CustomPicker
            placeholder="Choose"
            name={'minPass'}
            title={'Min Passing score'}
            data={minPassData}
            required
            width="89%"
            left="1%"
            titleKey="label"
            onChangeValue={(value: string) => {
              setValue('minPass', value);
            }}
          />
        </FormProvider>
      </VStack>
      <Button onPress={handleSubmit(onPress)} isLoading={isLoading}>
        Let’s Start
      </Button>
    </VStack>
  );
};

export default CreateExam;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
