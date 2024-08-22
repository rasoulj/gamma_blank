import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Image,
  Layer,
  Rating,
  Typography,
  getColor,
  isDark,
} from '~/components/elemental';
import EmptyPictureIcon from '~/assets/icons/EmptyPicture.icon';

const ServiceListItem = ({item}) => {
  console.log(item?.rateByCurrentUser);

  return (
    <Layer
      style={{
        flex: 1,
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 3,
        padding: 8,
        backgroundColor: isDark()
          ? getColor({color: 'background.400'})
          : getColor({color: 'background.500'}),
        shadowColor: '#555',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      {item?.service?.photoUrl ? (
        <Image
          src={item?.service?.photoUrl}
          style={{width: '100%', height: 114, borderRadius: 5}}
          resizeMode="cover"
        />
      ) : (
        <Layer
          style={{
            width: '100%',
            height: 114,
            borderWidth: 1,
            borderColor: getColor({color: 'gray.300'}),
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EmptyPictureIcon width={90} height={90} />
        </Layer>
      )}
      <Layer
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
        }}>
        <Typography
          numberOfLines={1}
          style={{width: '70%', fontSize: 14, fontWeight: '700'}}>
          {item?.service?.title}
        </Typography>
        <Typography
          color={'primary.500'}
          style={{fontSize: 14, fontWeight: '700'}}>
          ${item?.service?.price}
        </Typography>
      </Layer>
      <Rating rating={item?.service?.rateAverage || 0} onChange={() => {}} />
      <Typography color={'gray.500'} style={{fontSize: 12, fontWeight: '500'}}>
        {item?.service?.category}
      </Typography>
    </Layer>
  );
};

export default ServiceListItem;

const styles = StyleSheet.create({});
