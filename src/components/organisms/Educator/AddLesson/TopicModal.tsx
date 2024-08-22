import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BookIconSet,
  Divider,
  EditIconSet,
  TaskSquareIconSet,
  Trash2Icon,
  Typography,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';

const TopicModal = ({
  item,
  isVisible,
  courseId,
  onClose,
  onAddContent,
  onDelete,
  onEdit,
}: {
  item: any;
  isVisible: boolean;
  courseId: number;
  onClose: () => void;
  onAddContent: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  const {navigateWithName} = useNavigate();

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.btnContainer2}
            onPress={() => {
              onClose();
              onEdit?.();
            }}>
            <VStack>
              <EditIconSet color={getColor({color: 'gray.800'})} />
            </VStack>
            <Typography
              color={'gray.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Edit Topic Title
            </Typography>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              onAddContent?.();
            }}>
            <VStack>
              <BookIconSet color={'gray.800'} />
            </VStack>
            <Typography
              color={'gray.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Add Content
            </Typography>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              navigateWithName('CreateExam', {
                topicId: item?.id,
                courseId: courseId,
              });
            }}>
            <TaskSquareIconSet color={getColor({color: 'gray.800'})} />
            <Typography
              color={'gray.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Add Exam
            </Typography>
          </TouchableOpacity>
          <Divider />
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
              Delete Topic
            </Typography>
          </TouchableOpacity>
        </View>
      </CustomActionSheet>
    </>
  );
};

export default TopicModal;

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
