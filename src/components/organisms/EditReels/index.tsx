import React from 'react';
import {useQueryClient} from 'react-query';
import {
  useNavigate,
  useToast,
  useRoute,
  CreateSocialContent,
} from '~/components';
import {useGetpostQuery, useUpdatePostMutation} from './hooks';
import {hashtagRegex} from '../AddReel';
import {model} from '~/data/model';
import useHeader from '~/components/elemental/hooks/use_header';

const description = model?.metaData?.configs?.socialReels?.description ?? true;

function EditReels({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) {
  const {} = useHeader({
    title: {children: 'Edit Reels', fontSize: 'lg', fontWeight: 'bold'},
  });
  const route = useRoute();

  const {data: postData} = useGetpostQuery({
    postId: route?.params?.postId,
  });
  const {toast} = useToast(),
    {mutate, isLoading} = useUpdatePostMutation(),
    queryClient = useQueryClient(),
    {navigation} = useNavigate();

  const post = route?.params?.item?.item ?? postData?.post_getPostById?.result;
  const items = [{type: 'VIDEO', uri: post?.mediaUrl}];
  const submitForm = async (formData, isDraft = false) => {
    await preAction?.(formData);
    let itemInput = {
      mediaUrl: post?.mediaUrl,
      content: formData?.caption,
      isDraft: isDraft,
      locations: formData?.location,
      thumbnail: post?.thumbnail,
      postType: 'REELS',
      id: post?.id,
      tags: formData?.caption ? formData?.caption.match(hashtagRegex) : [],
    };
    mutate(
      {input: itemInput},
      {
        onSuccess: data => {
          if (data?.post_updatePost?.status?.code === 1) {
            toast({message: 'Update success!', type: 'success'});
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['post_getUsedLocations'], {
              exact: false,
            });
            postAction?.(formData);
            navigation.goBack();
          } else {
            toast({message: data?.post_updatePost?.status?.value});
          }
        },
        onError: error => {
          toast({message: error.toString()});
        },
      },
    );
  };

  return (
    <CreateSocialContent
      onSubmitContent={submitForm}
      items={items}
      content={post}
      createButtonText="Save"
      isCreateLoading={isLoading}
      description={description}
    />
  );
}

export default EditReels;
