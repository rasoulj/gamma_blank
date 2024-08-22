import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Button,
  Success2Icon,
  Typography,
  getColor,
} from '~/components/elemental';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';

const EnrollStatusModal = ({
  iconSize = 24,
  title = `You are enrolled \n Successfully!`,
  description,
  isVisible,
  onClose,
}: {
  iconSize?: number;
  title?: string;
  isVisible: boolean;
  description?: string;
  onClose: () => void;
}) => {
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.content}>
        <Success2Icon style={styles.mt} width={iconSize} height={iconSize} />
        <Typography
          fontWeight={'bold'}
          color={getColor({color: 'success.500'})}
          my={4}
          textAlign={'center'}
          fontSize="lg"
          lineHeight={24}>
          {title}
        </Typography>
        {description && (
          <Typography
            fontWeight={'500'}
            color={'gray.400'}
            my={4}
            textAlign={'center'}
            fontSize="md"
            lineHeight={24}>
            {description}
          </Typography>
        )}

        <Button
          onPress={onClose}
          borderRadius={12}
          mt={4}
          mb={10}
          width="40%"
          style={styles.btn}
          _text={styles.text}>
          Done
        </Button>
      </View>
    </CustomActionSheet>
  );
};

export default EnrollStatusModal;

const styles = StyleSheet.create({
  btn: {height: 36},
  text: {lineHeight: 16},
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
  },
  mt: {marginTop: 16},
});
