import React from 'react';
import {useQueryClient} from 'react-query';
import {
  Screen,
  useNavigate,
  useToast,
  useRoute,
  CreateSocialContent,
} from '~/components';
import {useUpdatePostMutation} from './hooks';
import {StackActions} from '@react-navigation/native';
import {model} from '~/data/model';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
const hashtagRegex = /#\w+/g;

const description = model?.metaData?.configs?.socialPost?.description;

function EditPostType({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) {
  const {socialType} = useSocialTypesConfig();
  const routeParams = useRoute();
  const params = routeParams?.params;
  const postItem = params?.item;

  const {toast} = useToast(),
    {mutate, isLoading} = useUpdatePostMutation(),
    queryClient = useQueryClient(),
    {navigation} = useNavigate();

  const postItemsData =
    socialType === 'text'
      ? []
      : postItem
      ? Array.isArray(postItem?.mediaGalleryUrl)
        ? postItem?.mediaGalleryUrl?.map((itm, index) => {
            return {type: itm?.type, uri: itm?.url, ...itm};
          })
        : []
      : params?.photos ?? [{type: params?.type, uri: params?.uri}];

  const submitForm = async (formData, isDraft = false) => {
    await preAction?.(formData);

    let itemInput = {
      mediaUrl: formData.imageUrl,
      content: formData?.caption,
      tags: formData?.caption ? formData?.caption.match(hashtagRegex) : [],
      mediaGalleryUrl: JSON.stringify(formData?.items),
      isDraft: isDraft,
      locations: formData?.location,
      postType: 'POST',
      id: postItem?.id,
    };
    mutate(
      {input: itemInput},
      {
        onSuccess: data => {
          if (data?.post_updatePost?.status?.code === 1) {
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
              message: data?.post_updatePost?.status?.value,
              type: 'error',
            });
          }
        },
        onError: error => {
          toast({message: error.toString()});
        },
      },
    );
  };

  return (
    <Screen>
      <CreateSocialContent
        onSubmitContent={submitForm}
        items={postItemsData}
        createButtonText="Save"
        isCreateLoading={isLoading}
        content={postItem}
        description={description}
        type="edit"
      />
    </Screen>
  );
}

export default EditPostType;
