import React from 'react';
import {useQueryClient} from 'react-query';
import {
  useNavigate,
  useToast,
  useRoute,
  CreateSocialContent,
} from '~/components';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import {useCreateReelsPostMutation} from './hooks';
import RNFS from 'react-native-fs';
import {StackActions} from '@react-navigation/native';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import {model} from '~/data/model';

const description = model?.metaData?.configs?.socialPost?.description ?? true;

export const hashtagRegex = /#\w+/g;

function AddReel({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) {
  const routeParams = useRoute();
  const params = routeParams?.params;
  const {toast} = useToast(),
    {mutate, isLoading} = useCreateReelsPostMutation(),
    queryClient = useQueryClient(),
    {navigation} = useNavigate();

  const postItemsData = [{type: 'VIDEO', uri: params?.media}];

  const {mutateAsync: uploadFileMutate, isLoading: isUploading} =
    useUploadFile();
  const submitForm = async (formData, isDraft = false) => {
    const result = await preAction?.(formData);
    const uploadData = [];
    for (let i = 0; i < postItemsData?.length; i++) {
      const item = postItemsData?.[i];
      let uri = item?.uri;
      let ext = 'mp4';
      if (item?.uri.includes('ph://')) {
        let id = uri.replace('ph://', '');
        id = id.substring(0, id.indexOf('/'));
        uri = `assets-library://asset/asset.${ext}?id=${id}&ext=${ext}`;
        const encodedUri = encodeURI(uri);
        const destPath = `${RNFS.CachesDirectoryPath}/temp.${ext}`;
        if (item?.type === 'VIDEO')
          await RNFS.copyAssetsVideoIOS(encodedUri, destPath);
        else {
          await RNFS.copyAssetsFileIOS(encodedUri, destPath, 1080, 1080);
        }
        uri = destPath;
      }
      const thumbnail = await createThumbnailVideo(uri, 0);
      let thumbnailUrl = '';
      await uploadFileMutate(
        {path: thumbnail, mime: 'image/jpeg'},
        {
          onSuccess: (successData: any) => {
            thumbnailUrl = successData?.uploadedUrl;
          },
        },
      );
      await uploadFileMutate(
        {path: uri, mime: item?.type},
        {
          onSuccess: (successData: any) => {
            uploadData.push({
              mediaUrl: successData?.uploadedUrl,
              thumbnail: thumbnailUrl,
            });
          },
        },
      );
    }
    if (result === false) {
      return;
    }

    let itemInput = {
      mediaUrl: uploadData?.[0]?.mediaUrl,
      content: formData?.caption,
      tags: formData?.caption ? formData?.caption.match(hashtagRegex) : [],
      isDraft: isDraft,
      locations: formData?.location,
      thumbnail: uploadData?.[0]?.thumbnail,
      postType: 'REELS',
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

  return (
    <CreateSocialContent
      onSubmitContent={submitForm}
      onSaveAsDraft={onSaveAsDraft}
      items={postItemsData}
      createButtonText="Create reels"
      isCreateLoading={isLoading || isUploading}
      description={description}
    />
  );
}

export default AddReel;
