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
  isDark,
  User2Icon,
} from '../../elemental';

const ReviewItem = ({item}: {item: any}) => {
  const {navigateWithName} = useNavigate();

  return (
    <HStack mx={1} style={{marginTop: 16}} space={2}>
      <TouchableOpacity
        onPress={() => {
          navigateWithName('profile', {item: item?.user});
        }}>
        {item?.user?.photoUrl ? (
          <Image
            src={item?.user?.photoUrl}
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
          paddingHorizontal: 16,
          paddingVertical: 11,
        }}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Typography
            color={getColor({color: 'primary.500'})}
            style={{fontWeight: '700', fontSize: 14}}>
            {item?.user?.fullName}
            {'  '}
            <Typography
              color={getColor({color: isDark() ? 'gray.300' : 'gray.500'})}
              style={{fontWeight: '400', fontSize: 12}}>
              {relativeTimeFromNow(item?.createdDate)}
            </Typography>
          </Typography>
          <HStack>
            <Rating rating={item?.rate} type={'numberic'} />
          </HStack>
        </HStack>
        <Typography
          color={getColor({color: isDark() ? 'gray.300' : 'gray.500'})}>
          {item?.review}
        </Typography>
      </View>
    </HStack>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({});
