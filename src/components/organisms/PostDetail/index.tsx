import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import PostTypeDetail from './PostTypeDetail';
import {ReelsDetail} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {useGetPosts} from './hook';
import {model} from '~/data/model';

const PostDetail = () => {
  const {params} = useRoute();
  const item = params?.item;
  const postId = item?.post?.id ?? params?.postId;

  const [hidden, setHidden] = useState(false);
  const {} = useHeader({hidden: hidden});

  const {data} = useGetPosts({
    where: {post: {id: {eq: postId}}},
  });
  const postDto = data?.pages?.[0];
  const postType =
    postDto?.post?.postType?.toLowerCase() ?? params?.postType?.toLowerCase();

  useEffect(() => {
    setHidden(postType != 'post');
  }, [postType]);

  return (
    <>
      {postType === 'post' ? (
        <PostTypeDetail item={postDto} />
      ) : (
        <ReelsDetail item={postDto} />
      )}
    </>
  );
};
export default PostDetail;
