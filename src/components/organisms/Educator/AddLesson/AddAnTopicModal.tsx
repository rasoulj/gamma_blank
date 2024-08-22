import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Input, VStack} from '~/components';

const AddAnTopicModal = ({
  setLesson,
  isVisible,
  onClose,
  lessonName,
}: {
  setLesson: any;
  isVisible: boolean;
  onClose: () => void;
  lessonName: string;
}) => {
  const [text, setText] = useState('');

  return (
    <CustomActionSheet
      title={lessonName ? 'Edit Topic' : 'Add Topic'}
      isVisible={isVisible}
      onClose={onClose}>
      <VStack height={120}>
        <Input
          defaultValue={lessonName}
          onChangeText={setText}
          placeholder="Input Text Here"
          label="Topic Title"
        />
      </VStack>

      <Button
        style={styles.btn}
        disabled={!text}
        bgColor={!text ? 'primary.200' : 'primary.500'}
        _text={!text ? styles.disableText : styles.text}
        onPress={() => [setLesson(text), setText(''), onClose()]}>
        Save
      </Button>
    </CustomActionSheet>
  );
};

export default AddAnTopicModal;

const styles = StyleSheet.create({
  btn: {
    height: 36,
    bottom: 10,
  },
  text: {lineHeight: 14},

  disableText: {color: 'gray.500', lineHeight: 14},
});
