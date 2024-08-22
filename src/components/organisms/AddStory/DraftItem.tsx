import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Typography, deviceWidth} from '~/components/elemental';
import dayjs from 'dayjs';

const getDayFormat = date => dayjs(new Date(date)).format('DD MMM');

const DraftItem = ({index, createdDate, imageSource, onItemPress}) => {
  const dateText = useMemo(() => {
    return getDayFormat(createdDate)?.split(' ');
  }, [createdDate]);

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View
        style={(index + 1) % 3 === 0 ? styles.image : styles.imageWithMargin}>
        <Image src={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.dateText}>
          <Typography color="gray.50" fontSize="xs">
            {dateText?.[0]}
            <Typography color="gray.300" fontSize="xs">
              {` ${dateText?.[1]}`}
            </Typography>
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default DraftItem;

const itemWidth = (deviceWidth - 44) / 3;

const styles = StyleSheet.create({
  imageWithMargin: {
    width: itemWidth,
    height: itemWidth * 2,
    marginBottom: 2,
    marginRight: 2,
  },

  image: {width: itemWidth, height: itemWidth * 2, marginBottom: 2},

  button: {position: 'absolute', bottom: 60, zIndex: 1, right: 20, left: 20},

  dateText: {
    position: 'absolute',
    left: 4,
    borderRadius: 5,
    top: 4,
    backgroundColor: 'rgba(39, 39, 42, 0.70)',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});
