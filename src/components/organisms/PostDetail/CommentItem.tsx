import React, {memo, useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Image from '~/components/atoms/Image';
import {
  Box,
  FlatList,
  Typography,
  getColor,
  relativeTimeFromNow,
} from '~/components/elemental';
import {deviceWidth, scale} from '~/utils/methods';
import CommentOptions from './CommentOptions';
import ReplyItem from './ReplyItem';

const CommentItem = ({
  item,
  postId,
  onReplyPress,
  containerStyle,
}: {
  item: any;
  postId: number;
  onReplyPress: (item: any) => void;
  containerStyle?: ViewStyle;
}) => {
  const dateText = useMemo(() => {
    return relativeTimeFromNow(item?.createdDate);
  }, [item]);

  const renderItem = ({item: replyItem, index}) => {
    const onChildReplyPress = () => {
      onReplyPress({...replyItem, id: item?.id});
    };
    return (
      <ReplyItem
        {...{item: replyItem, postId, onReplyPress: onChildReplyPress}}
      />
    );
  };

  return (
    <View style={{marginHorizontal: 20, ...containerStyle}}>
      <View style={styles.container}>
        <Image style={styles.avatar} src={item?.user?.photoUrl} />
        <View style={styles.textContainer}>
          <Typography style={styles.nameText} color="primary.700">
            {item?.user?.fullName}
            <Typography style={styles.dateText} color="gray.500">
              {`  ${dateText}`}
            </Typography>
          </Typography>
          <Typography fontWeight="400" mt="8px" alignItems="center">
            {item?.text}
            {item?.notPosted && (
              <Typography fontSize="xs" color="error.500">
                {'  '}
                Sending...
              </Typography>
            )}
          </Typography>
        </View>
      </View>
      <CommentOptions
        {...{item, postId, onReplyPress: () => onReplyPress(item)}}
      />
      {item?.children?.length > 0 && (
        <FlatList
          renderItem={renderItem}
          data={item?.children}
          style={{marginTop: 16}}
          ItemSeparatorComponent={<Box h="16px" />}
        />
      )}
    </View>
  );
};
export default memo(CommentItem);

const styles = StyleSheet.create({
  avatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30) / 2,
    alignSelf: 'flex-end',
    marginEnd: 8,
  },
  container: {flexDirection: 'row'},
  textContainer: {
    backgroundColor: getColor({color: 'background.700'}),
    borderRadius: 16,
    padding: 16,
    width: deviceWidth * 0.8,
  },
  nameText: {
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 19,
    // color: 'primary.700',
  },
  dateText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 19,
    // color: 'gray.500',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
