import React from 'react';
import {Image, Typography, VStack, getColor} from '~/components/elemental';
import {HStack, Pressable} from 'native-base';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import {StyleSheet, ViewStyle} from 'react-native';
import {appFormatDate} from '~/utils/helper';

const CompletedCourseCard = ({
  item,
  onCoursePress,
  style,
}: {
  item: any;
  onCoursePress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <Pressable
      shadow={'2'}
      style={[styles.container, style]}
      onPress={() => onCoursePress?.()}>
      {item?.course?.photoUrl ? (
        <Image style={styles.img} source={{uri: item?.course?.photoUrl}} />
      ) : (
        <VStack
          alignSelf={'center'}
          width={92}
          height={92}
          p="2"
          borderRadius={5}
          borderWidth={1}
          borderColor={getColor({color: 'background.700'})}>
          <CourseItemIcon />
        </VStack>
      )}

      <VStack flex={1} ml="2">
        <HStack justifyContent={'center'}>
          <Typography
            color={getColor({color: 'gray.800'})}
            style={styles.title}
            numberOfLines={2}>
            {item?.course?.title}
          </Typography>
        </HStack>
        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize={'xs'}
          fontWeight={'500'}
          lineHeight={17}>
          {item?.course?.user?.fullName}
        </Typography>
        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize={'xs'}
          lineHeight={17}
          fontWeight={'500'}>
          {item?.course?.category}
        </Typography>
        <HStack mt="2" justifyContent={'space-between'}>
          <Typography
            fontSize="xs"
            fontWeight={'500'}
            lineHeight={17}
            color="gray.800">
            Date: {appFormatDate(item?.completeDate, 'YYYY/MM/DD')}
          </Typography>
          <Typography
            fontSize="xs"
            fontWeight={'500'}
            lineHeight={17}
            color="gray.800">
            Result:{' '}
            {Number.isInteger(item?.examAverage)
              ? item?.examAverage
              : item?.examAverage?.toFixed(2)}
            %
          </Typography>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default CompletedCourseCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 2,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    color: getColor({color: 'gray.800'}),
    marginBottom: 4,
    flex: 1,
  },
  heartButton: {
    right: '4%',
    top: '2%',
    width: 30,
    height: 30,
    backgroundColor: getColor({color: 'primary.100'}),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 92,
    height: 92,
    borderRadius: 5,
  },
});
