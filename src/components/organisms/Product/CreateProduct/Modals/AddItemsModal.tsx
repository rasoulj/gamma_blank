import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Input, Layer, Typography} from '~/components';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';

const AddItemsModal = ({
  title,
  setAttribute,
  isVisible,
  onClose,
}: {
  title;
  setAttribute: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [text, setText] = useState('');
  const [hex, setHex] = useState('');

  const hexCodeValidator = value => {
    var reg = /^#([0-9a-f]{3}){1,2}$/i;
    return reg.test(value) || !value;
  };

  return (
    <CustomActionSheet
      title={`Add a ${title}`}
      isVisible={isVisible}
      onClose={onClose}>
      <Input
        style={styles.input}
        onChangeText={setText}
        placeholder={title === 'Color' ? 'Color name' : 'Title'}
      />
      {title === 'Color' && (
        <>
          <Input
            onChangeText={setHex}
            style={{marginTop: 16}}
            placeholder="Hex Code (Ex: #FFFFFF)"
          />
          {hexCodeValidator(hex) ? null : (
            <Typography color={'red.500'} style={styles.hexColorText}>
              Invalid hex color
            </Typography>
          )}
        </>
      )}
      <Layer style={styles.buttonContainer}>
        <Button
          variant={'outline'}
          style={styles.cancelButton}
          onPress={onClose}>
          Cancel
        </Button>
        <Button
          isDisabled={hex && !hexCodeValidator(hex)}
          style={styles.saveButton}
          onPress={() => [
            setAttribute(`${hex ? text + ' - ' + hex : text}`),
            setHex(''),
            setText(''),
            onClose(),
          ]}>
          Save
        </Button>
      </Layer>
    </CustomActionSheet>
  );
};

export default AddItemsModal;

const styles = StyleSheet.create({
  hexColorText: {
    fontSize: 12,
  },
  input: {marginTop: 8},
  buttonContainer: {flexDirection: 'row', marginTop: 32},
  cancelButton:{flex: 1, marginRight: 16},
  saveButton:{flex: 1}
});
