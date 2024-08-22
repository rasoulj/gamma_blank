import React from 'react';
import {useQueryClient} from 'react-query';
import {
  useNavigate,
  useToast,
  useRoute,
  CreateSocialContent,
} from '~/components';
import {Image} from 'react-native';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import {useCreatePostMutation} from './hooks';
import RNFS from 'react-native-fs';
import {StackActions} from '@react-navigation/native';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import useHeader from '~/components/elemental/hooks/use_header';
import uploaderStore from '~/stores/uploaderStore';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
const hashtagRegex = /#\w+/g;
import {model} from '~/data/model';

const description = model?.metaData?.configs?.socialPost?.description ?? true;

function CreatePost({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) {
  const routeParams = useRoute();
  const params = routeParams?.params;
  const {socialType} = useSocialTypesConfig();

  const {toast} = useToast(),
    {mutate, isLoading} = useCreatePostMutation(),
    queryClient = useQueryClient(),
    {navigation} = useNavigate();
  const postItemsData = params?.photos ?? [
    {type: params?.type, uri: params?.uri},
  ];

  const setCreateFormData = uploaderStore(state => state.setCreateFormData);
  const {mutateAsync: uploadFileMutate, isLoading: isUploading} =
    useUploadFile();
  const submitForm = async (formData, isDraft = false) => {
    const result = await preAction?.(formData);
    const uploadData = [];
    if (postItemsData?.length > 0 && socialType != 'text') {
      if (postItemsData?.length > 0) {
        setCreateFormData({postItemsData, formData, isDraft});
        navigation.dispatch(StackActions.popToTop());
        return;
      }
      for (let i = 0; i < postItemsData?.length; i++) {
        const item = postItemsData?.[i];
        const inputItem = {aspectRatio: 1, thumbnailUrl: ''};
        let uri = item?.uri;
        let isVideo = item?.type?.toLowerCase()?.includes('video');
        let ext = isVideo ? 'mp4' : 'jpg';
        let mime = item?.type?.includes('image')
          ? item?.type
          : item?.type?.includes('video') ?? isVideo
          ? 'video/mp4'
          : 'image/jpg';
        if (item?.uri.includes('ph://')) {
          let id = uri.replace('ph://', '');
          id = id.substring(0, id.indexOf('/'));
          uri = `assets-library://asset/asset.${ext}?id=${id}&ext=${ext}`;
          const encodedUri = encodeURI(uri);
          const destPath = `${
            RNFS.CachesDirectoryPath
          }/${new Date().toISOString()}.${ext}`;
          if (isVideo) await RNFS.copyAssetsVideoIOS(encodedUri, destPath);
          else {
            await RNFS.copyAssetsFileIOS(encodedUri, destPath, 1080, 1080);
          }
          uri = destPath;
        }
        let thumbnailUrl = undefined;
        if (isVideo) {
          const thumbnail = await createThumbnailVideo(uri, 0);
          await uploadFileMutate(
            {path: thumbnail, mime: 'image/jpeg'},
            {
              onSuccess: (successData: any) => {
                thumbnailUrl = successData?.uploadedUrl;
                inputItem.thumbnailUrl = successData?.uploadedUrl;
              },
            },
          );
        } else {
          Image.getSize(item?.uri, (width, height) => {
            inputItem.aspectRatio = parseFloat((width / height).toFixed(2));
          });
        }
        await uploadFileMutate(
          {path: uri, mime},
          {
            onSuccess: async (successData: any) => {
              uploadData.push({
                url: successData?.uploadedUrl,
                type: !isVideo ? 'IMAGE' : 'VIDEO',
                thumbnailUrl,
                aspectRatio: inputItem?.aspectRatio,
              });
            },
          },
        );
        try {
          await RNFS.unlink(uri);
        } catch (error) {}
      }
    }
    if (result === false) {
      return;
    }

    let itemInput = {
      mediaUrl: formData?.imageUrl,
      content: formData?.caption,
      tags: formData?.caption ? formData?.caption.match(hashtagRegex) : [],
      mediaGalleryUrl: JSON.stringify(uploadData),
      isDraft: isDraft,
      locations: formData?.location,
      postType: 'POST',
    };
    mutate(
      {input: itemInput},
      {
        onSuccess: data => {
          if (data?.post_createPost?.status?.code === 1) {
            toast({message: 'Create success!', type: 'success'});
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['post_getUsedLocations'], {
              exact: false,
            });
            postAction?.(formData);
            navigation.dispatch(StackActions.popToTop());
          } else {
            toast({
              message: data?.post_createPost?.status?.value,
              type: 'error',
            });
          }
        },
        onError: error => {
          toast({message: error.toString(), type: 'error'});
        },
      },
    );
  };

  const onSaveAsDraft = formData => {
    submitForm(formData, true);
  };

  const {} = useHeader({
    title: {children: 'Add Post', fontWeight: 'bold'},
    hidden: false,
  });

  return (
    <CreateSocialContent
      onSubmitContent={submitForm}
      onSaveAsDraft={onSaveAsDraft}
      items={postItemsData}
      createButtonText={socialType === 'text' ? 'Post' : 'Create'}
      isCreateLoading={isLoading || isUploading}
      description={description}
    />
  );
}

export default CreatePost;
