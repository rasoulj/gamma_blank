import React, {memo, useMemo, useState} from 'react';
import {useCreateLikePost, useRemoveLikePost} from '../hook';
import {useQueryClient} from 'react-query';
import PostOptions from './PostOptions';
import ReelsOptions from './ReelsOptions';
import WishListBoardModal from '~/components/organisms/WishList/WishlistHome/Modals/WishlistBoardModal';
import ShareModal from '~/components/molecules/ShareModal';

const ContentOptions = ({
  dtoItem,
  isText = false,
  contentType = 'POST',
  onCommentPress,
}: {
  dtoItem: any;
  isText?: boolean;
  contentType?: 'POST' | 'REELS';
  onCommentPress?: () => void;
}) => {
  const item = dtoItem?.post;
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  const shareObject = useMemo(() => {
    const jsonItem = item?.mediaGalleryUrl
      ? JSON.parse(dtoItem?.post?.mediaGalleryUrl)
      : [];
    const image =
      dtoItem?.post?.thumbnail ??
      jsonItem?.[0]?.thumbnailUrl ??
      jsonItem?.[0]?.url;

    return {
      text: item?.content,
      mediaType: 'SHARED_POST',
      mediaUrl: image,
      mediaEntityId: item?.id,
      id: item?.id,
    };
  }, [dtoItem]);
  const {mutate: mutateCreateLikePost, isLoading: likeLoading} =
    useCreateLikePost();
  const queryClient = useQueryClient();
  const onLikePress = () => {
    dtoItem?.isLikedByCurrentUser
      ? handleRemovePostLike()
      : handleCreatePostLike();
  };
  const handleCreatePostLike = () => {
    mutateCreateLikePost(
      {entityId: item?.id},
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['getPosts']);
          queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
            exact: false,
          });
        },
        onError: errorData => {},
      },
    );
  };
  const {mutate: mutateRemoveLikePost} = useRemoveLikePost();
  const handleRemovePostLike = () => {
    mutateRemoveLikePost(
      {entityId: item?.id},
      {
        onSuccess() {
          queryClient.invalidateQueries('getPosts');
        },
      },
    );
  };

  const onArchivePress = () => {
    setIsSaveModalVisible(true);
  };
  const onSharePress = () => setIsShareModalVisible(true);

  return (
    <>
      {contentType === 'POST' ? (
        <PostOptions
          {...{
            dtoItem,
            onArchivePress,
            onLikePress,
            onSharePress,
            isText,
          }}
        />
      ) : (
        <ReelsOptions
          {...{
            dtoItem,
            onArchivePress,
            onCommentPress,
            onLikePress,
            onSharePress,
          }}
        />
      )}
      {isShareModalVisible && (
        <ShareModal
          item={shareObject}
          isVisible={isShareModalVisible}
          onClose={() => setIsShareModalVisible(false)}
          deepLink={`postDetail?id=${item?.id}`}
          mediaType="SHARED_POST"
        />
      )}
      {isSaveModalVisible && (
        <WishListBoardModal
          item={item}
          ids={[item?.id]}
          isVisible={isSaveModalVisible}
          entityName="post"
          onClose={() => setIsSaveModalVisible(false)}
        />
      )}
    </>
  );
};

export default memo(ContentOptions);
