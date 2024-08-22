import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {
  relativeTimeFromNow,
  Typography,
  useNavigate,
  Image,
  scale,
  VideoPlay2IconSet,
} from '~/components';
import {useGetPosts} from './hook';
import UserAvatar from '~/components/molecules/UserAvatar';
import {VStack} from 'native-base';
import {getColor} from '~/utils/helper/theme.methods';

const SharedPostItem = ({item, isMine}: any) => {
  const {navigateWithName} = useNavigate();
  const {data, isLoading}: any = useGetPosts({
    where: {
      post: {id: {eq: item?.mediaEntityId}},
    },
  });
  const post = data?.pages[0].post_getAllPosts?.result?.items?.[0]?.post;

  const firstImage = useMemo(() => {
    if (post) {
      if (post?.thumbnail) return post.thumbnail;
      else if (post?.mediaGalleryUrl) {
        const postItems = JSON.parse(post?.mediaGalleryUrl);
        return postItems?.[0]?.thumbnailUrl ?? postItems?.[0]?.url;
      } else return '';
    }
  }, [post]);

  return (
    <VStack alignSelf={isMine ? 'flex-end' : 'flex-start'} w="50%">
      <TouchableOpacity
        style={
          post?.postType === 'POST' ? styles.touchable : styles.reelTouchable
        }
        onPress={() =>
          navigateWithName('postdetail', {
            isDetails: true,
            postId: item?.mediaEntityId,
          })
        }>
        {!isLoading ? (
          post?.postType === 'POST' ? (
            <>
              <UserAvatar
                user={post?.poster}
                hasShadow={false}
                extraData={relativeTimeFromNow(post?.createdDate)}
                paddingX={16}
              />
              {firstImage && <Image src={firstImage} style={styles.media} />}
              <Typography fontSize="sm" marginY={2} fontWeight="400" mx="4">
                {post?.content}
              </Typography>
            </>
          ) : (
            <>
              <View style={styles.absoluteView}>
                <UserAvatar
                  user={post?.poster}
                  hasShadow={false}
                  avatarSize={scale(16)}
                  color="gray.50"
                />
                <VideoPlay2IconSet color="gray.50" />
              </View>
              {firstImage && (
                <Image
                  src={firstImage}
                  style={[
                    styles.media,
                    {marginVertical: post?.postType === 'POST' ? 10 : 0},
                  ]}
                />
              )}
            </>
          )
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
      <Typography style={styles.dateText}>
        {relativeTimeFromNow(item?.createdAt)}
      </Typography>
    </VStack>
  );
};

export default SharedPostItem;

const styles = StyleSheet.create({
  dateText: {
    color: 'gray.500',
    textAlign: 'left',
    marginLeft: 3,
    fontSize: 12,
    marginTop: 5,
  },

  media: {
    width: '100%',
    height: 200,
    borderRadius: 1,
    marginVertical: 10,
  },

  touchable: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: getColor({color: 'gray.300'}),
    paddingVertical: 10,
    marginTop: 10,
  },

  reelTouchable: {
    borderRadius: 15,
    overflow: 'hidden',
  },

  absoluteView: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 8,
    left: 8,
    bottom: 8,
    justifyContent: 'space-between',
  },
});
