import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ModalContainer from '~/components/atoms/ModalContainer';
import {TickIconSet, Typography, VStack} from '~/components/elemental';
const HighlightAddedModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <ModalContainer
      isVisible={isVisible}
      onClose={onClose}
      hasCloseIcon={false}>
      <View>
        <TickIconSet
          style={styles.tick}
          color="success.400"
          strokeWidth="7"
          width="63"
          height="40"
        />
        <Typography
          fontWeight={'600'}
          fontSize="lg"
          lineHeight={24}
          mt="22px"
          mb="16px"
          alignSelf="center"
          color="success.400">
          New Highlight Saved!
        </Typography>
        <TouchableOpacity onPress={onClose}>
          <VStack
            backgroundColor="primary.500"
            alignItems="center"
            justifyContent="center"
            w="144px"
            h="36px"
            alignSelf="center"
            borderRadius="10px">
            <Typography
              fontWeight={'600'}
              fontSize="lg"
              lineHeight={24}
              color="gray.50"
              alignSelf="center">
              Done
            </Typography>
          </VStack>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

export default HighlightAddedModal;

const styles = StyleSheet.create({
  tick: {alignSelf: 'center'},
});
