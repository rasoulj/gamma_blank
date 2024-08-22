import React from 'react';
import styles from './styles';
import {Image, Typography, VStack, getColor} from '~/components/elemental';
import {HStack, Pressable} from 'native-base';
import {ProductHorizontalItemProps} from '../EducationHorizontalItem/product-horizontal-item.props';
import StarGoldIcon from '~/assets/icons/CustomIcons/StarYellow.icon';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import MedalFillStartIcon from '~/assets/iconset/Users/medal-fill-star';
import {numberWithCommas} from '~/utils/helper';

const EducationVerticalItem = ({
  course,
  onCoursePress,
  style,
}: ProductHorizontalItemProps) => {
  return (
    <Pressable
      shadow={'2'}
      style={[styles.container, style]}
      onPress={() => onCoursePress?.()}>
      {course?.course?.photoUrl ? (
        <Image
          style={styles.img}
          source={{uri: course?.course?.photoUrl}}
          resizeMode="cover"
        />
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
            {course?.course?.title}
          </Typography>

          {course?.hasCertificate && (
            <Pressable style={styles.heartButton} shadow={'2'}>
              <MedalFillStartIcon width={16} height={16} />
            </Pressable>
          )}
        </HStack>
        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize={'xs'}
          fontWeight={'500'}
          lineHeight={17}>
          {course?.course?.user?.fullName}
        </Typography>
        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize={'xs'}
          lineHeight={17}
          fontWeight={'500'}
          mt="2">
          {course?.course?.category}
        </Typography>
        <HStack
          mt="2"
          flex={1}
          justifyContent={'space-between'}
          alignItems={'center'}>
          {course?.course?.rateAverage !== 0 ? (
            <HStack justifyContent={'center'} alignItems={'center'}>
              <StarGoldIcon />
              <Typography
                color={getColor({color: 'gray.800'})}
                fontSize={'sm'}
                fontWeight={'400'}
                ml="1">
                {Number.isInteger(course?.course?.rateAverage)
                  ? course?.course?.rateAverage
                  : course?.course?.rateAverage?.toFixed(1)}
              </Typography>
            </HStack>
          ) : (
            <VStack />
          )}
          <Typography
            color={getColor({color: 'primary.500'})}
            fontSize={'sm'}
            fontWeight={'700'}>
            {course?.course?.price === 0
              ? 'Free'
              : `$${numberWithCommas(course?.course?.price)}`}
          </Typography>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default EducationVerticalItem;
