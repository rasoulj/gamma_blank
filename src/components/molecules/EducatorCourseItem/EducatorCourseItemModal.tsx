import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Chart1IconSet,
  CircleIcon,
  Divider,
  EditIconSet,
  EyeIconSet,
  Trash2Icon,
  Typography,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';
import {PlusIcon} from '~/assets';
import QuestionsIconSet from '~/assets/iconset/Support/questions';
import {useGetNewquestionExists} from '~/components/organisms/CourseList/hook';

const EducatorCourseItemModal = ({
  item,
  isVisible,
  onClose,
  onDelete,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  const {navigateWithName} = useNavigate();

  const {data}: any = useGetNewquestionExists({
    courseId: item?.id,
  });

  const hasQuestion =
    data?.course_newQuestionExists?.value === 'Success' ? true : false;

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.content}>
          {item?.lessons?.length === 0 ? (
            <TouchableOpacity
              style={styles.btnContainer2}
              onPress={() => {
                onClose();
                navigateWithName('AddLesson', {courseId: item?.id});
              }}>
              <VStack px="1">
                <PlusIcon color={'gray.800'} />
              </VStack>
              <Typography
                color={'gray.800'}
                fontSize="sm"
                style={styles.reportTitle}>
                Add Lessons
              </Typography>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                onClose();
                navigateWithName('CourseDetails', {
                  id: item?.id,
                });
              }}>
              <EyeIconSet color={getColor({color: 'gray.800'})} />
              <Typography
                color={'gray.800'}
                fontSize="sm"
                style={styles.reportTitle}>
                View Course
              </Typography>
            </TouchableOpacity>
          )}
          <Divider />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              navigateWithName('CreateCourse', {item: item});
            }}>
            <EditIconSet color={getColor({color: 'gray.800'})} />
            <Typography
              color={'gray.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Edit Course
            </Typography>
          </TouchableOpacity>
          <Divider />
          {item?.lessons?.length === 0 ? (
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                onClose();
                navigateWithName('CourseDetails', {id: item?.id});
              }}>
              <EyeIconSet color={getColor({color: 'gray.800'})} />
              <Typography
                color={'gray.800'}
                fontSize="sm"
                style={styles.reportTitle}>
                View Course
              </Typography>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                onClose();
                navigateWithName('CourseDetails', {
                  id: item?.id,
                  initialTabName: 'Lessons',
                });
              }}>
              <EyeIconSet color={getColor({color: 'gray.800'})} />
              <Typography
                color={'gray.800'}
                fontSize="sm"
                style={styles.reportTitle}>
                View Lessons
              </Typography>
            </TouchableOpacity>
          )}
          <Divider />
          {item?.lessons?.length > 0 && (
            <Fragment>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  onClose();
                  navigateWithName('AddLesson', {
                    courseId: item?.id,
                    editable: true,
                  });
                }}>
                <EditIconSet color={getColor({color: 'gray.800'})} />
                <Typography
                  color={'gray.800'}
                  fontSize="sm"
                  style={styles.reportTitle}>
                  Edit Lessons
                </Typography>
              </TouchableOpacity>
              <Divider />
            </Fragment>
          )}
          {!item?.isDraft && (
            <Fragment>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  onClose();
                  navigateWithName('ViewStatistics', {courseId: item?.id});
                }}>
                <Chart1IconSet color={getColor({color: 'gray.800'})} />
                <Typography
                  color={'gray.800'}
                  fontSize="sm"
                  style={styles.reportTitle}>
                  View Statistics
                </Typography>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  onClose();
                  navigateWithName('ViewQuestions', {id: item?.id});
                }}>
                <QuestionsIconSet color={getColor({color: 'gray.800'})} />
                {hasQuestion && (
                  <CircleIcon
                    size={2}
                    color="error.500"
                    marginLeft={'4'}
                    marginTop={'-0.5'}
                    position="absolute"
                    alignSelf="flex-start"
                  />
                )}
                <Typography
                  color={'gray.800'}
                  fontSize="sm"
                  style={styles.reportTitle}>
                  View Questions
                </Typography>
              </TouchableOpacity>
              <Divider />
            </Fragment>
          )}
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onDelete?.();
              onClose();
            }}>
            <Trash2Icon color={getColor({color: 'error.500'})} />
            <Typography
              color={'error.500'}
              fontSize="sm"
              style={styles.reportTitle}>
              Delete Course
            </Typography>
          </TouchableOpacity>
        </View>
      </CustomActionSheet>
    </>
  );
};

export default EducatorCourseItemModal;

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
  btnContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
});
