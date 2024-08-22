import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Input, Layer} from '~/components';

const AddAnAttributeModal = ({
  setAttribute,
  isVisible,
  onClose,
}: {
  setAttribute: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [text, setText] = useState('');
  return (
    <CustomActionSheet
      title="Add an Attribute"
      isVisible={isVisible}
      onClose={onClose}>
      <Input onChangeText={setText} placeholder="Title" />

      <Layer style={{flexDirection: 'row', marginTop: 32}}>
        <Button
          variant={'outline'}
          style={{flex: 1, marginRight: 16}}
          onPress={onClose}>
          Cancel
        </Button>
        <Button
          style={{flex: 1}}
          onPress={() => [setAttribute(text), onClose()]}>
          Save
        </Button>
      </Layer>
    </CustomActionSheet>
  );
};

export default AddAnAttributeModal;

const styles = StyleSheet.create({});
