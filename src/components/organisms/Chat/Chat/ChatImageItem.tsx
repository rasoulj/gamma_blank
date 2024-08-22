import {StyleSheet} from 'react-native';
import React from 'react';
import Layer from '../../../atoms/Layer';
import {
  relativeTimeFromNow,
  Typography,
  getColor,
  Image,
} from '../../../elemental';

const ChatImageItem = ({item, isMine}) => {
  return (
    <>
      <Layer style={isMine ? styles.isMineContainer : styles.container}>
        <Image src={item?.mediaUrl} style={styles.image} resizeMode="stretch" />
        {item?.text && (
          <Typography
            color={isMine ? 'gray.50' : 'gray.800'}
            fontSize="sm"
            fontWeight="400"
            style={styles.text}>
            {item?.text}
          </Typography>
        )}
      </Layer>
      {item?.createdAt && (
        <Typography
          marginY={6}
          marginTop={2}
          fontSize="xs"
          fontWeight="400"
          alignSelf={isMine ? 'flex-end' : 'flex-start'}>
          {relativeTimeFromNow(item?.createdAt)}
        </Typography>
      )}
    </>
  );
};

export default ChatImageItem;

const styles = StyleSheet.create({
  isMineContainer: {
    borderWidth: 1,
    borderColor: getColor({color: 'primary.500'}),
    alignSelf: 'flex-end',
    borderRadius: 15,
    backgroundColor: getColor({color: 'primary.500'}),
    overflow: 'hidden',
  },

  container: {
    borderWidth: 1,
    borderColor: getColor({color: 'gray.400'}),
    alignSelf: 'flex-start',
    borderRadius: 15,
    backgroundColor: getColor({color: 'primary.500'}),
    overflow: 'hidden',
  },

  image: {
    width: 243,
    height: 136,
    borderRadius: 15,
  },

  text: {
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
});
