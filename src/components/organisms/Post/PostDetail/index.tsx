import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import PostComment from '../PostComment';
import {useGetPosts} from '../hook';
import LoadIndicator from '../../../atoms/LoadIndicator';
import PostListItem from '../PostList/PostListItem';
import Header from '../../../atoms/Header';
import SelectedCommentHeader from './SelectedCommentHeader';
import useAuthStore from '~/stores/authStore';

const PostDetail = () => {
  const route: any = useRoute();
  const item = route?.params?.item as any;

  const {user} = useAuthStore();
  const [selected, setSelected] = useState(null);
  const {data, isLoading} = useGetPosts({
    where: {
      id: {eq: route?.params?.postId || item?.id},
    },
  });

  return (
    <View>
      {!selected ? (
        <Header
          data-id="d2f26216-8ef0-4ac5-806e-8fc5346a097e"
          data-name="Header"
          style={{
            position: 'relative',
            marginHorizontal: 0,
            marginBottom: 10,
          }}
          title="Post Detail"
        />
      ) : (
        <SelectedCommentHeader
          isAdmin={selected?.user?.id === user?.id}
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {isLoading && <LoadIndicator />}
      <PostComment
        item={data?.pages[0]}
        header={<PostListItem item={data?.pages[0]} />}
        selected={selected}
        setSelected={setSelected}
      />
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({});
