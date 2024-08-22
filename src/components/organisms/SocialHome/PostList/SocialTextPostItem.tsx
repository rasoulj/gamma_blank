import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {memo, useState} from 'react';
import {ContentOptions, Divider, Layer, VStack} from '~/components';
import {
  Typography,
  isDark,
  getColor,
  useNavigate,
} from '~/components/elemental';
import {model} from '~/data/model';
import PostItemModal from './Modals/PostItemModal';
import UserAvatar from './UserAvatar';

const configs = model?.metaData?.configs?.postlist || {
  like: true,
  comments: true,
  share: true,
  profile: true,
  social: true,
};

const SocialTextPostItem = React.forwardRef(
  (
    {
      dtoItem,
      usersLiked,
      navigateWithName,
    }: {dtoItem: any; usersLiked?: any; navigateWithName?: any},
    ref,
  ) => {
    const {navigateWithName: nWithname} = useNavigate();
    const item = dtoItem?.post ?? dtoItem;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [desLength, setDesLength] = useState(500);

    const onPressPostDetail = () => {
      if (navigateWithName)
        navigateWithName('postDetail', {
          item: dtoItem,
          postType: item?.postType === 'POST' ? 'post' : 'reel',
        });
      else {
        nWithname('postDetail', {
          item: dtoItem,
          postType: item?.postType === 'POST' ? 'post' : 'reel',
        });
      }
    };

    return (
      <>
        <TouchableWithoutFeedback onPress={onPressPostDetail}>
          <VStack space="16px" paddingX={'16px'} style={styles.container}>
            <UserAvatar item={item} />
            <Divider />
            <Layer>
              <Typography style={styles.contentText} color="gray.800">
                {item?.content?.length > desLength
                  ? (item?.content).substring(0, desLength - 3) + '...'
                  : item?.content}
              </Typography>
              {item?.content?.length > desLength && (
                <TouchableOpacity onPress={() => setDesLength(2000)}>
                  <Typography style={styles.seeMore} color="gray.400">
                    See more
                  </Typography>
                </TouchableOpacity>
              )}
            </Layer>
            {configs?.social && <ContentOptions dtoItem={dtoItem} isText />}
            {usersLiked?.length > 0 && (
              <Typography
                fontSize="sm"
                fontWeight="400"
                color="gray.800">{`Liked by ${usersLiked?.[0]?.fullName} ${
                usersLiked?.[1] ? `and ${usersLiked?.[1].fullName}` : ''
              }${
                item?.likeCount > usersLiked?.length
                  ? `and ${item?.likeCount - usersLiked?.length}`
                  : ''
              } `}</Typography>
            )}
          </VStack>
        </TouchableWithoutFeedback>
        <PostItemModal
          item={item}
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      </>
    );
  },
);

export default memo(SocialTextPostItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: isDark()
      ? getColor({color: 'background.400'})
      : getColor({color: 'background.500'}),
  },
  contentText: {fontSize: 14, fontWeight: '400'},
  seeMore: {
    fontSize: 14,
    fontWeight: '600',
  },
});
