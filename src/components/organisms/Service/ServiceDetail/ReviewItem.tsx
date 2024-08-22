import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  HStack,
  Image,
  Typography,
  getColor,
  Rating,
  relativeTimeFromNow,
  useNavigate,
  User2Icon,
} from '../../../elemental';

const ReviewItem = ({item}: {item: any}) => {
  const {navigateWithName} = useNavigate();

  return (
    <HStack mx={1} my={3} space={2}>
      <TouchableOpacity
        onPress={() => {
          navigateWithName('profile', {item: item?.review?.user});
        }}>
        {item?.review?.user?.photoUrl ? (
          <Image
            src={item?.review?.user?.photoUrl}
            style={{
              alignSelf: 'flex-end',
              borderRadius: 100,
              width: 30,
              height: 30,
            }}
          />
        ) : (
          <User2Icon width={38} height={38} />
        )}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          backgroundColor: '#2222',
          borderRadius: 16,
          padding: 10,
        }}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Typography
            color={getColor({color: 'primary.500'})}
            numberOfLines={1}
            style={{flex:1, fontWeight: '700', fontSize: 14}}>
            {item?.review?.user?.fullName}
            {'  '}
            <Typography
              color={getColor({color: 'gray.500'})}
              style={{fontWeight: '400', fontSize: 12}}>
              {relativeTimeFromNow(item?.review?.createdDate)}
            </Typography>
          </Typography>
          <HStack>
            <Rating rating={item?.rateByReviewCreator} type={'numberic'} />
          </HStack>
        </HStack>
        <Typography>{item?.review?.review}</Typography>
      </View>
    </HStack>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({});
