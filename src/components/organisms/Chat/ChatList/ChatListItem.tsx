import {StyleSheet, View} from 'react-native';
import React from 'react';
import Layer from '../../../atoms/Layer';
import {
  IMG,
  User2Icon,
  isDark,
  Typography,
  relativeTimeFromNow,
  CircleIcon,
} from '../../../elemental';

const ChatListItem = ({item}) => {
  return (
    <Layer style={styles.container}>
      {item?.receiver?.[0]?.photoUrl ? (
        <IMG
          src={item?.receiver?.[0]?.photoUrl}
          style={styles.image}
          alt="profile"
        />
      ) : (
        <User2Icon width={54} height={54} />
      )}
      <Layer style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Typography>{item?.receiver?.[0]?.fullName}</Typography>
          {item?.unreadCount > 0 && <CircleIcon size={2.5} color="error.500" />}
        </View>
        <Layer style={styles.textContainer}>
          <Typography color={isDark() ? 'gray.300' : 'gray.500'} fontSize="sm">
            {item?.lastMessage?.text}
          </Typography>
          <Typography
            color={isDark() ? 'gray.300' : 'gray.500'}
            fontSize="sm"
            alignSelf="flex-end">
            {relativeTimeFromNow(item?.latestMessageDate)}
          </Typography>
        </Layer>
      </Layer>
    </Layer>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },

  row: {flexDirection: 'row'},

  innerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 8,
    justifyContent: 'space-between',
    paddingRight: 0,
  },

  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
