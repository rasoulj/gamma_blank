import React, {useEffect} from 'react';
import {
  Button,
  LoadIndicator,
  Screen,
  Typography,
  VStack,
  useNavigate,
  useRoute,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import ExamIcon from '~/assets/icons/CustomIcons/ExamIcon';
import {StyleSheet} from 'react-native';
import {useGetExams} from '../CourseList/hook';

const ExamDetail = () => {
  const {navigateWithName} = useNavigate();
  const {params} = useRoute();

  const {data, isLoading: getDataLoading} = useGetExams({
    where: {id: {eq: params?.examId}},
  });

  const examData = data?.pages[0] ?? {};

  const {} = useHeader({
    hasBack: true,
    title: {
      children: params?.title ?? 'Exam',
      fontWeight: 'bold',
      fontSize: 'lg',
    },
  });

  return getDataLoading ? (
    <LoadIndicator />
  ) : (
    <Screen>
      <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
        <ExamIcon />
        <Typography fontSize="xl" fontWeight={'bold'} color="gray.800" mt="12">
          Ready for Exam?
        </Typography>
      </VStack>
      <VStack>
        <Typography fontSize="md" fontWeight={'500'} color="gray.800">
          {examData?.items?.length} Questions
        </Typography>
        <Typography fontSize="md" fontWeight={'500'} color="gray.800" my={'2'}>
          {examData?.timeToAnswer?.slice(2, -1) > 0
            ? `${examData?.timeToAnswer?.slice(
                2,
                -1,
              )} seconds for each question`
            : 'No time Limit'}
        </Typography>
        <Typography fontSize="md" fontWeight={'500'} color="gray.800">
          Answer{' '}
          {Math.ceil(
            (examData?.minPassingScore * examData.items?.length) / 100,
          )}
          /{examData.items?.length} to earn the point
        </Typography>
      </VStack>

      <Button
        onPress={() =>
          navigateWithName('ExamQuestions', {
            examId: examData?.id,
            courseId: params?.courseId,
            time: examData?.timeToAnswer?.slice(2, -1),
            title: params?.title,
          })
        }
        style={styles.btn}
        disabled={getDataLoading}>
        Let’s Start
      </Button>
    </Screen>
  );
};

export default ExamDetail;

const styles = StyleSheet.create({
  btn: {bottom: 0, marginTop: 83},
});
