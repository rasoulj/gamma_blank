import React, {useCallback} from 'react';
import {Modal, Platform, StyleSheet, View} from 'react-native';
import {useGetStories} from '../SocialHome/hook';
import {
  FlatList,
  Header,
  LoadIndicator,
  useNavigate,
} from '~/components/elemental';
import DraftItem from './DraftItem';
import {getColor} from '~/utils/helper/theme.methods';

const DraftModal = ({isVisible, onClose}) => {
  const {data, isLoading} = useGetStories({
    where: {story: {isDraft: {eq: true}}},
  });

  const {navigateWithName} = useNavigate();

  const renderItem = useCallback(({item, index}) => {
    const imageSource =
      item?.story?.mediaType === 'IMAGE'
        ? item?.story?.mediaUrl
        : item?.story?.thumbnail;

    const onItemPress = () => {
      onClose();
      navigateWithName('previewAddedStory', {...item?.story});
    };
    return (
      <DraftItem
        {...{
          item,
          index,
          onClose,
          createdDate: item?.story?.createdDate,
          imageSource,
          onItemPress,
        }}
      />
    );
  }, []);

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        {isLoading && <LoadIndicator />}
        <Header title="Drafts" onClickBack={onClose} />
        <View style={styles.flatListContainer}>
          <FlatList data={data?.pages} renderItem={renderItem} numColumns={3} />
        </View>
      </View>
    </Modal>
  );
};

export default DraftModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: getColor({color: 'background.500'}),
  },

  flatListContainer: {flex: 1, margin: 20},
});
