import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, HStack, Input, VStack} from '~/components';

const AddAnLessonModal = ({
  setLesson,
  isVisible,
  lessonName,
  onClose,
}: {
  setLesson: any;
  isVisible: boolean;
  lessonName: string;
  onClose: () => void;
}) => {
  const [text, setText] = useState('');
  return (
    <CustomActionSheet
      title={lessonName ? 'Edit Lesson Title' : 'Add Lesson Title'}
      isVisible={isVisible}
      onClose={onClose}>
      <VStack height={120}>
        <Input
          defaultValue={lessonName}
          onChangeText={setText}
          placeholder="Input Text Here"
          label="Title"
        />
      </VStack>
      <HStack justifyContent={'space-between'} space={'3'} bottom={'4'}>
        <Button
          variant={'outline'}
          style={styles.btn}
          onPress={onClose}
          _text={styles.text}>
          Cancel
        </Button>
        <Button
          style={styles.btn}
          disabled={!text}
          bgColor={!text ? 'primary.200' : 'primary.500'}
          _text={!text ? styles.disableText : styles.text}
          onPress={() => [setLesson(text), setText(''), onClose()]}>
          Save
        </Button>
      </HStack>
    </CustomActionSheet>
  );
};

export default AddAnLessonModal;

const styles = StyleSheet.create({
  btn: {
    height: 36,
    flex: 1,
  },

  text: {lineHeight: 14},

  disableText: {color: 'gray.500', lineHeight: 14},
});
