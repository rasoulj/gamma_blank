import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BookIconSet,
  ChartIconSet,
  Divider,
  TaskSquareIconSet,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import {useExamResults} from '../../CourseList/hook';
import {durationToSeconds} from '~/utils/helper';
import useAuthStore from '~/stores/authStore';

const LessonDetailModal = ({
  item,
  isVisible,
  onClose,
  courseId,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  courseId: number;
}) => {
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state.user);

  const {data} = useExamResults({
    where: {
      and: [{examId: {eq: item?.exams[0]?.id}}, {userId: {eq: user?.id}}],
    },
  });

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            onClose();
            navigateWithName('LessonDetails', {id: item?.id});
          }}>
          <BookIconSet color={'gray.800'} />
          <Typography
            color={'gray.800'}
            fontSize="sm"
            style={styles.reportTitle}>
            Start Reading
          </Typography>
        </TouchableOpacity>
        {item?.exams?.length > 0 && !item?.exams[0]?.isDraft && (
          <Fragment>
            <Divider />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                onClose();
                if (data?.pages?.length > 0) {
                  navigateWithName('ExamQuestions', {
                    examId: item?.exams[0]?.id,
                    lastResult: data?.pages[0],
                    courseId: courseId,
                    time:
                      durationToSeconds(data?.pages[0]?.exam?.timeToAnswer) /
                      data?.pages[0]?.questionsCount,
                  });
                } else {
                  navigateWithName('ExamDetail', {
                    examId: item?.exams[0]?.id,
                    courseId: courseId,
                  });
                }
              }}>
              {data?.pages[0] ? (
                <ChartIconSet />
              ) : (
                <TaskSquareIconSet color={getColor({color: 'gray.800'})} />
              )}

              <Typography
                color={'gray.800'}
                fontSize="sm"
                style={styles.reportTitle}>
                {data?.pages[0] ? 'View Exam Result' : 'Take the Exam'}
              </Typography>
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </CustomActionSheet>
  );
};

export default LessonDetailModal;

const styles = StyleSheet.create({
  reportTitle: {marginLeft: 8, fontWeight: 'bold'},
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
});
