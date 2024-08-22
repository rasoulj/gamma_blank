import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import Layer from '../../../atoms/Layer';
import {
  IMG,
  User2Icon,
  Typography,
  relativeTime,
  isDark,
  deviceHeight,
  Divider,
  HeartIcon,
  getColor,
  CommentsIcon2,
  SendIcon3,
  TreeDotIcon,
  useNavigate,
  DrawerKit,
  RelativeLayout,
  Share,
  Button,
  Input,
  useDrawer,
  Trash2Icon,
  EditIconSet,
  RightIcon,
  CustomFormInput,
  ReportIcon,
  BlockIcon,
  Image,
} from '../../../elemental';
import {
  useCreateBlockUser,
  useCreateLikePost,
  useCreateViolationReport,
  useDeletePost,
  useGetUsers,
  useRemoveLikePost,
} from '../hook';
import {useQueryClient} from 'react-query';
import useIsImage from '../../../elemental/hooks/use_is_image';
import {sharePostData} from '../../../molecules/gallery/shareData';
import {useCreateDirectMessage} from '../../../elemental/hooks/use_get_chat';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuthStore from '~/stores/authStore';
import {model} from '~/data/model';
import Video from '~/components/atoms/Video';
import ShareModal from './Modals/ShareModal';
import PostItemModal from './Modals/PostItemModal';

const schema = yup.object().shape({
  report: yup.string().required(),
});

const configs = model?.metaData?.configs?.postlist || {
  like: true,
  comments: true,
  share: true,
  profile: true,
  social: true,
};

const PostListItem = ({item}) => {
  const {navigateWithName} = useNavigate();

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {},
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  const [desLength, setDesLength] = useState(140);

  const isImage = useIsImage(item?.mediaUrl);

  const {mutate: mutateCreateLikePost} = useCreateLikePost();
  const handleCreatePostLike = useCallback(postId => {
    console.log('liked');

    mutateCreateLikePost(
      {entityId: postId},
      {
        onSuccess(data, variables, context) {
          console.log(data);
          // queryClient.invalidateQueries(['getPosts']);
        },
      },
    );
  }, []);
  const {mutate: mutateRemoveLikePost} = useRemoveLikePost();

  const handleRemovePostLike = useCallback(postId => {
    mutateRemoveLikePost(
      {entityId: postId},
      {
        onSuccess(data, variables, context) {
          console.log(data);
          // queryClient.invalidateQueries('getPosts');
        },
      },
    );
  }, []);
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => navigateWithName('postDetail', {item})}>
        <Layer
          style={{
            borderRadius: 18,
            marginVertical: 8,
            marginHorizontal: 3,
            padding: 16,
            backgroundColor: isDark()
              ? getColor({color: 'background.400'})
              : getColor({color: 'background.500'}),
            shadowColor: '#555',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Layer
            style={{
              flexDirection: 'row',
              marginBottom: 16,
              alignItems: 'center',
            }}>
            {configs?.profile && (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigateWithName('profile', {item: item?.poster})
                  }>
                  {item?.poster?.photoUrl ? (
                    <Image
                      src={item?.poster?.photoUrl}
                      style={{width: 38, height: 38, borderRadius: 50}}
                    />
                  ) : (
                    <User2Icon width={38} height={38} />
                  )}
                </TouchableOpacity>
                <Layer style={{marginLeft: 8}}>
                  <Typography fontWeight="semibold">
                    {item?.poster?.fullName}
                  </Typography>
                  <Typography
                    color={isDark() ? 'gray.300' : 'gray.500'}
                    style={{fontSize: 12, fontWeight: '400'}}>
                    {relativeTime(item?.createdDate, 'DD MMMM - h:mm A')}
                  </Typography>
                </Layer>
              </>
            )}

            <TouchableOpacity
              style={{position: 'absolute', right: 0}}
              onPress={() => setIsModalVisible(true)}>
              <TreeDotIcon
              // onPress={() => [
              //   setSelectedPost(item),
              //   user?.id === item?.poster?.id
              //     ? onOpenTreeDots(item?.id)
              //     : onOpenUserTreeDots(item?.id),
              // ]}
              />
            </TouchableOpacity>
          </Layer>
          {isImage ? (
            item?.mediaUrl ? (
              <Image
                src={item?.mediaUrl}
                style={{
                  width: '100%',
                  height: deviceHeight * 0.3,
                  borderRadius: 8,
                }}
                resizeMode="stretch"
              />
            ) : (
              <Image
                src={
                  'https://apsygammastorage.blob.core.windows.net/images/gTqT7CMiKp.jpg'
                }
                style={{
                  width: '100%',
                  height: deviceHeight * 0.2,
                  borderRadius: 15,
                }}
                resizeMode="contain"
              />
            )
          ) : item?.mediaUrl ? (
            <Video
              source={{
                uri: item?.mediaUrl,
              }}
              style={{
                width: '100%',
                height: deviceHeight * 0.2,
                borderRadius: 15,
              }}
              resizeMode="cover"
              paused={true}
              muted={false}
              repeat={false}
              onLoadError={er => console.log('errrrrr', er)}
              controls
            />
          ) : (
            <></>
          )}
          <Layer style={{paddingVertical: 16}}>
            <Typography style={{fontSize: 14, fontWeight: '400'}}>
              {item?.content?.length > desLength
                ? (item?.content).substring(0, desLength - 3) + '...'
                : item?.content}
            </Typography>
            {item?.content?.length > desLength && (
              <TouchableOpacity onPress={() => setDesLength(2000)}>
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                  color="gray.400">
                  See more
                </Typography>
              </TouchableOpacity>
            )}
            {item?.postTags?.length > 0 && (
              <Typography style={{fontSize: 14, fontWeight: '400'}}>
                {item?.postTags.map(i => {
                  return i?.title;
                })}
              </Typography>
            )}
          </Layer>
          <Divider />
          {configs?.social && (
            <Layer
              style={{
                flexDirection: 'row',
                marginTop: 16,
                alignItems: 'center',
              }}>
              {configs?.like && (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginRight: 16,
                    alignItems: 'center',
                  }}>
                  <HeartIcon
                    onPress={() =>
                      item?.isLiked
                        ? handleRemovePostLike(item?.id)
                        : handleCreatePostLike(item?.id)
                    }
                    color={'#233'}
                    type="big"
                    isLiked={item?.isLiked}
                  />
                  <Typography color={'gray.400'} style={{marginLeft: 4}}>
                    {item?.likesCount}
                  </Typography>
                </TouchableOpacity>
              )}
              {configs?.comments && (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginRight: 16,
                    alignItems: 'center',
                  }}
                  onPress={() => navigateWithName('post detail', {item})}>
                  <CommentsIcon2 width={24} height={24} />
                  <Typography color={'gray.400'} style={{marginLeft: 4}}>
                    {item?.commentCount}
                  </Typography>
                </TouchableOpacity>
              )}
              {configs?.share && (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginRight: 16,
                    alignItems: 'center',
                  }}
                  onPress={() => setIsShareModalVisible(true)}>
                  <SendIcon3
                    width={24}
                    height={24}
                    onPress={() => {
                      setIsShareModalVisible(true);
                    }}
                  />
                </TouchableOpacity>
              )}
            </Layer>
          )}
        </Layer>
      </TouchableWithoutFeedback>

      <ShareModal
        item={item}
        isVisible={isShareModalVisible}
        onClose={() => setIsShareModalVisible(false)}
      />
      <PostItemModal
        item={item}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default memo(PostListItem);

const styles = StyleSheet.create({});
