import {VStack} from 'native-base';
import React, {useEffect} from 'react';
import {Typography, deviceWidth, useToast} from '~/components/elemental';
import {useUploadFileWithPercent} from '~/components/elemental/hooks/useUploadFile';
import RNFS from 'react-native-fs';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import {Image, Platform} from 'react-native';
import {hashtagRegex} from '../AddReel';
import {useCreatePostMutation} from '../CreatePost/hooks';
import {useQueryClient} from 'react-query';
import {Video} from 'react-native-compressor';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as Progress from 'react-native-progress';
import {getColor} from '~/utils/helper/theme.methods';
import uploaderStore from '~/stores/uploaderStore';
import {useCreateStoryMutation} from '../AddStory/hooks';

const getTempCachePath = (date: Date, ext: any) => {
  return `${RNFS.CachesDirectoryPath}/${date.toISOString()}.${ext}`;
};
const useBackgroundContentUploader = () => {
  const {
    createPostData,
    setProcessStatus,
    setCreateFormData,
    setIsProcessing,
    createStoryData,
    setCreateStoryData,
    isProcessing,
  } = uploaderStore(state => state);

  const {mutate: storyMutate} = useCreateStoryMutation();
  const {toast} = useToast(),
    {mutate} = useCreatePostMutation(),
    queryClient = useQueryClient();
  const {mutateAsync: uploadFileMutate} = useUploadFileWithPercent();

  const onUploadProgress = (percent: any, index?: number) => {
    setProcessStatus({
      text: `Uploading file ${index ? index + 1 : ''}`,
      processValue: percent,
    });
  };

  const uploadStory = async () => {
    setIsProcessing(true);
    const {media, type, isCompressed, isMute, isDraft} = createStoryData;
    let uploadUrl = '';
    let thumbnailUrl = '';
    let mediaUrl = media;
    setProcessStatus({text: 'Processing file'});
    try {
      if (media) {
        if (type != 'IMAGE') {
          const videoPath =
            Platform.OS === 'android' && media.indexOf('file://') != 0
              ? `file://${media}`
              : media;
          const thumbnail = await createThumbnailVideo(videoPath, 0);
          if (thumbnail)
            await uploadFileMutate(
              {param: {path: thumbnail, mime: 'image/jpeg'}},
              {
                onSuccess: (successData: any) => {
                  if (successData?.uploadedUrl)
                    thumbnailUrl = successData?.uploadedUrl;
                  else {
                    setIsProcessing(false);
                    return;
                  }
                },
                onError: () => {
                  setIsProcessing(false);
                  return;
                },
              },
            );
          if (!isCompressed) {
            const result = await Video.compress(
              videoPath,
              {
                bitrate: 0.45,
                progressDivider: 10,
                minimumFileSizeForCompress: 5,
              },
              progress => {},
            ).catch(() => {
              setIsProcessing(false);
              return;
            });
            if (result) {
              let resultFileInfo = await ReactNativeBlobUtil.fs.stat(
                Platform.OS === 'ios'
                  ? result?.replace('file:///', '/')
                  : result,
              );
              let mediaFileInfo = await ReactNativeBlobUtil.fs.stat(
                Platform.OS === 'ios' ? media?.replace('file:///', '/') : media,
              );
              if (resultFileInfo?.size < mediaFileInfo?.size)
                mediaUrl = result ?? media;
            }
          }
        }
        await uploadFileMutate(
          {
            param: {
              path: mediaUrl,
              mime:
                type === 'IMAGE'
                  ? `image/${media?.split('.')?.[1] ?? 'png'}`
                  : `video/${media?.split('.')?.[1] ?? 'mp4'}`,
            },
            onUploadProgress: percent => onUploadProgress(percent),
          },
          {
            onSuccess: successData => {
              if (successData?.uploadedUrl)
                uploadUrl = successData?.uploadedUrl;
              else {
                setIsProcessing(false);
                return;
              }
            },
            onError(errorData) {
              setIsProcessing(false);
              return;
            },
          },
        );
      }
      storyMutate(
        {
          input: {
            mediaUrl: uploadUrl,
            isDraft: isDraft,
            mediaType: type,
            isMute,
            thumbnail: thumbnailUrl,
          },
        },
        {
          onSuccess: data => {
            setCreateStoryData(undefined);
            setIsProcessing(false);
            if (data?.story_createStory?.status?.code === 1) {
              toast({message: 'Success', type: 'success'});
              queryClient.invalidateQueries(['story_getLastStoriesOfUsers'], {
                exact: false,
              });
              queryClient.invalidateQueries(['story_getMyLastStoriesOfUsers'], {
                exact: false,
              });
            } else {
              toast({
                message: data?.story_createStory?.status?.value,
                type: 'error',
              });
            }
          },
          onError: data => {
            setIsProcessing(false);
            toast({message: 'Something went wrong', type: 'error'});
          },
        },
      );
    } catch (error) {
      setCreateStoryData(undefined);
      setIsProcessing(false);
      toast({message: 'Something went wrong'});
    }
  };

  const uploadPost = async () => {
    setIsProcessing(true);
    const {formData, isDraft, postItemsData} = createPostData;
    const uploadData = [];
    for (let i = 0; i < postItemsData?.length; i++) {
      setProcessStatus({text: `Processing file ${i + 1}`, processValue: 0});
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
        const destPath = getTempCachePath(new Date(), ext);
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
          {param: {path: thumbnail, mime: 'image/jpeg'}},
          {
            onSuccess: (successData: any) => {
              thumbnailUrl = successData?.uploadedUrl;
              inputItem.thumbnailUrl = successData?.uploadedUrl;
            },
          },
        );

        const result = await Video.compress('file://' + uri, {
          bitrate: 0.45,
          progressDivider: 10,
          minimumFileSizeForCompress: 5,
        });
        if (result) {
          let resultFileInfo = await ReactNativeBlobUtil.fs.stat(
            Platform.OS === 'ios' ? result?.replace('file:///', '/') : result,
          );
          let mediaFileInfo = await ReactNativeBlobUtil.fs.stat(
            Platform.OS === 'ios' ? uri?.replace('file:///', '/') : uri,
          );
          if (resultFileInfo?.size < mediaFileInfo?.size) uri = result ?? uri;
        }
      } else {
        Image.getSize(item?.uri, (width, height) => {
          inputItem.aspectRatio = parseFloat((width / height).toFixed(2));
        });
      }
      await uploadFileMutate(
        {
          param: {path: `${uri}`, mime},
          onUploadProgress: percent => onUploadProgress(percent, i),
        },
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

    let itemInput = {
      mediaUrl: formData.imageUrl,
      content: formData?.caption,
      tags: formData?.caption ? formData?.caption.match(hashtagRegex) : [],
      category: null,
      mediaGalleryUrl: JSON.stringify(uploadData),
      isDraft: isDraft,
      locations: formData?.location,
      postType: 'POST',
    };
    mutate(
      {input: itemInput},
      {
        onSuccess: data => {
          setIsProcessing(false);
          if (data?.post_createPost?.status?.code === 1) {
            toast({message: 'Create success!', type: 'success'});
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['post_getUsedLocations'], {
              exact: false,
            });
            setCreateFormData(undefined);
            setProcessStatus(undefined);
          } else {
            toast({message: data?.post_createPost?.status?.value});
          }
        },
        onError: error => {
          toast({message: error.toString()});
          setIsProcessing(false);
        },
      },
    );
  };

  const startUpload = () => {
    if (createPostData && !isProcessing) uploadPost();
    else if (createStoryData && !isProcessing) uploadStory();
    else setIsProcessing(false);
  };

  useEffect(() => {
    startUpload();
  }, [createPostData, createStoryData]);

  return {startUpload, uploadStory, uploadPost};
};

export default useBackgroundContentUploader;

export const BackgroundContentUploaderUI = () => {
  const {} = useBackgroundContentUploader();
  const {processStatus, isProcessing} = uploaderStore(state => state);

  if (!isProcessing) return null;
  return (
    <VStack px="4" space="1" mt="0">
      <Typography fontSize="sm" fontWeight="500" color="gray.500">
        {processStatus?.text ?? 'Uploading post'} ...
      </Typography>
      {processStatus?.processValue > 0 && (
        <Progress.Bar
          progress={
            processStatus?.processValue > 0
              ? processStatus?.processValue / 100
              : 0
          }
          width={deviceWidth * 0.9}
          color={getColor({color: 'primary.500'})}
          unfilledColor={getColor({color: 'primary.200'})}
          borderColor={getColor({color: 'primary.200'})}
        />
      )}
    </VStack>
  );
};
