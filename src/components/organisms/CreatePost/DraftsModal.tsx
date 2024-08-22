import React, {useCallback} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetPosts} from '../SocialHome/hook';
import {
  FlatList,
  HStack,
  LoadIndicator,
  Typography,
  useNavigate,
  BackIcon,
} from '~/components/elemental';
import DraftItem from '../AddStory/DraftItem';
import useAuthStore from '~/stores/authStore';
import {getColor} from '~/utils/helper/theme.methods';

const PostDraftModal = ({isVisible, onClose, postType = 'Post'}) => {
  const user = useAuthStore(state => state.user);

  const {data, isLoading} = useGetPosts({
    where: {
      and: [
        {post: {isDraft: {eq: true}}},
        {post: {posterId: {eq: user?.id}}},
        {post: {postType: {eq: postType === 'Reels' ? 'REELS' : 'POST'}}},
      ],
    },
  });

  const {navigateWithName} = useNavigate();

  const renderItem = useCallback(({item, index}) => {
    const postItems =
      postType === 'Post' ? JSON.parse(item?.post?.mediaGalleryUrl) : {};

    const imageSource =
      postType != 'Post'
        ? item?.post?.thumbnail
        : postItems?.[0]?.thumbnailUrl ?? postItems?.[0]?.url;

    const onItemPress = () => {
      onClose();
      if (item?.post?.postType === 'REELS')
        navigateWithName('EditPost', {
          item: {postId: item?.post?.id, item: item?.post, postType: 'REELS'},
          fromRoute: 'draft',
        });
      else
        navigateWithName('EditPost', {
          item: {
            postId: item?.post?.id,
            ...item?.post,
            postType: 'POST',
            mediaGalleryUrl: item?.post?.mediaGalleryUrl
              ? JSON.parse(item?.post?.mediaGalleryUrl)
              : {},
          },
          fromRoute: 'draft',
        });
    };

    return (
      <DraftItem
        {...{
          item,
          index,
          onClose,
          createdDate: item?.post?.createdDate,
          imageSource,
          onItemPress,
        }}
      />
    );
  }, []);

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <HStack marginTop="10" mx="5">
          <TouchableOpacity onPress={onClose}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.absoluteView}>
            <Typography fontWeight={'bold'}>Drafts</Typography>
          </View>
        </HStack>
        <View style={styles.flatListContainer}>
          {isLoading && <LoadIndicator />}
          <FlatList
            data={data?.pages}
            renderItem={renderItem}
            numColumns={3}
            setEmptyComponent
            isLoading={isLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PostDraftModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: getColor({color: 'background.200'}),
  },

  flatListContainer: {flex: 1, margin: 20},

  absoluteView: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    pointerEvents: 'none',
  },
});
