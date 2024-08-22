import React from 'react';
import {Modal, Platform, StyleSheet, View} from 'react-native';
import StoryItem from '../../Stories/StoryItem';

const StoryModal = ({visibleStory, onCloseStory, data}) => {
  return (
    <Modal visible={visibleStory} onRequestClose={onCloseStory}>
      <View style={styles.modalContainer}>
        <StoryItem
          data={data}
          totalCount={1}
          seenIndex={0}
          storyIndex={0}
          goToNextUserStory={onCloseStory}
          goToPreviewsUserStory={onCloseStory}
          onClose={onCloseStory}
        />
      </View>
    </Modal>
  );
};

export default StoryModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: 'black',
  },
});
