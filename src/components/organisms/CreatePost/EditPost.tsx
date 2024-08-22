import React from 'react';
import {useRoute, EditReels} from '~/components';
import EditPostType from './EditPostType';
import useHeader from '~/components/elemental/hooks/use_header';

function EditPost({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) {
  const routeParams = useRoute();
  const params = routeParams?.params;
  const postItem = params?.item;

  const {} = useHeader({
    title: {
      children:
        params?.fromRoute === 'draft'
          ? postItem?.postType === 'POST'
            ? 'Add Post'
            : 'Add Reels'
          : postItem?.postType === 'POST'
          ? 'Edit Post'
          : 'Edit Reels',
      fontWeight: 'bold',
    },
  });
  return (
    <>{postItem?.postType === 'POST' ? <EditPostType /> : <EditReels />}</>
  );
}

export default EditPost;
