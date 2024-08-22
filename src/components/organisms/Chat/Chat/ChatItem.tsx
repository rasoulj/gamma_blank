import {StyleSheet} from 'react-native';
import React from 'react';
import Layer from '../../../atoms/Layer';
import Typography from '../../../atoms/Typography';
import {getColor} from '../../../elemental/helper';
import {IMG, relativeTimeFromNow, isDark} from '../../../elemental';

const ChatItem = ({item, isMine}) => {
  return (
    <>
      <Layer
        style={{
          backgroundColor: isMine
            ? getColor({color: 'primary.500'})
            : getColor({color: 'background.700'}),
          padding: 16,
          borderRadius: 15,
          maxWidth: 275,
          alignSelf: isMine ? 'flex-end' : 'flex-start',
        }}>
        {item?.parent?.createdAt && (
          <Layer style={styles.row}>
            <Layer style={styles.emptyLayer}></Layer>
            {item?.parent?.mediaUrl !== '' && (
              <IMG src={item?.parent?.mediaUrl} style={styles.media} />
            )}
            <Layer>
              <Typography
                color={isMine ? 'gray.50' : 'gray.800'}
                fontSize="sm"
                fontWeight="500">
                {isMine ? item?.sender?.fullName : 'You'}
              </Typography>
              <Typography
                fontSize="sm"
                fontWeight="400"
                marginTop={-5}
                color={isMine ? 'gray.50' : 'gray.800'}>
                {item?.parent?.text}
              </Typography>
            </Layer>
          </Layer>
        )}
        <Typography
          color={
            isMine
              ? isDark('primary')
                ? 'gray.50'
                : 'gray.800'
              : isDark('primary')
              ? 'gray.800'
              : 'gray.50'
          }
          marginTop={item?.parent?.text ? 5 : 0}>
          {item?.text}
        </Typography>
      </Layer>
      <Typography
        color={isDark() ? 'gray.300' : 'gray.500'}
        fontSize="xs"
        fontWeight="400"
        alignSelf={isMine ? 'flex-end' : 'flex-start'}>
        {relativeTimeFromNow(item?.createdAt)}
      </Typography>
    </>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  media: {
    width: 35,
    height: 35,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  emptyLayer: {width: 2, backgroundColor: '#222'},
});
