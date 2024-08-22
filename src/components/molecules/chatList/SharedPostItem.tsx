import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Layer from '../../atoms/Layer';
import Typography from '../../atoms/Typography';
import {
  IMG,
  relativeTimeFromNow,
  User2Icon,
  useNavigate,
} from '../../elemental';
import {useGetPosts} from './hook';
import {getColor} from '~/utils/helper/theme.methods';

const SharedPostItem = ({item}: any) => {
  const {navigateWithName} = useNavigate();
  const {data, isLoading}: any = useGetPosts({
    where: {
      id: {eq: item?.mediaEntityId},
    },
  });
  const post = data?.pages[0].post_getAllPosts?.result?.items || [];

  return (
    <>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          navigateWithName('postdetail', {
            isDetails: true,
            postId: item?.mediaEntityId,
          })
        }>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {}}>
          {post[0]?.poster?.photoUrl ? (
            <IMG
              src={post[0]?.poster?.photoUrl}
              alt="profile"
              style={styles.avatar}
            />
          ) : (
            <User2Icon width={42} height={42} />
          )}
          <Layer>
            <Typography
              numberOfLines={1}
              ellipsizeMode="head"
              style={styles.fullName}>
              {post[0]?.poster?.fullName}
            </Typography>
            <Typography
              numberOfLines={1}
              ellipsizeMode="head"
              style={styles.text}>
              {relativeTimeFromNow(post[0]?.createdDate)}
            </Typography>
          </Layer>
        </TouchableOpacity>
        {post[0]?.mediaUrl && (
          <IMG src={post[0]?.mediaUrl} alt="profile" style={styles.postImage} />
        )}
        <Typography style={styles.contentText}>{post[0]?.content}</Typography>
      </TouchableOpacity>
      <Typography style={styles.date}>
        {relativeTimeFromNow(item?.createdAt)}
      </Typography>
    </>
  );
};

export default SharedPostItem;

const styles = StyleSheet.create({
  fullName: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  text: {
    marginLeft: 10,
    color: 'gray.500',
    fontSize: 14,
    marginTop: 4,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 1,
    marginVertical: 10,
  },
  date: {
    color: 'gray.500',
    textAlign: 'left',
    marginLeft: 3,
    fontSize: 12,
    marginTop: 5,
  },
  contentText: {marginVertical: 10, fontSize: 14, fontWeight: '400'},
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  touchable: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: getColor({color: 'gray.300'}),
    padding: 10,
    marginTop: 10,
  },
});
