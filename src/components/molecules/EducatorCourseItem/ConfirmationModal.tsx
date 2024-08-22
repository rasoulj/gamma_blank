import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, HStack, Layer, Typography} from '~/components/elemental';

const ConfirmationModal = ({
  title,
  rejectTitle,
  acceptTitle,
  isVisible,
  isLoading,
  onClose,
  onSubmit,
}: {
  title: string;
  isLoading?: boolean;
  rejectTitle: string;
  acceptTitle: string;
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Layer>
          <Typography style={styles.title}>Confirmation</Typography>
          <Typography fontSize="sm" style={styles.margin}>
            {title}
          </Typography>
          <HStack style={styles.footerView} space={'4'}>
            <Button
              style={styles.btn}
              _text={styles.lineHeight}
              variant="outline"
              onPress={() => {
                onClose();
              }}>
              {rejectTitle}
            </Button>
            <Button
              style={styles.btn}
              _text={styles.lineHeight}
              variant="solid"
              bg={'error.500'}
              isLoading={isLoading}
              onPress={() => onSubmit?.()}>
              {acceptTitle}
            </Button>
          </HStack>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  lineHeight: {lineHeight: 15, fontWeight: '700'},
  btn: {
    flex: 1,
    position: 'relative',
    borderRadius: 10,
    height: 36,
  },
  margin: {
    marginVertical: 16,
    textAlign: 'center',
  },
  footerView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  title: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
});
