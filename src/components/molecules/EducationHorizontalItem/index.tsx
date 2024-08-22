import React from 'react';
import styles from './styles';
import {ProductHorizontalItemProps} from './product-horizontal-item.props';
import {Image, Typography, VStack, getColor} from '~/components/elemental';
import {Button, HStack, Pressable} from 'native-base';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import StarGoldIcon from '~/assets/icons/CustomIcons/StarYellow.icon';
import MedalFillStartIcon from '~/assets/iconset/Users/medal-fill-star';
import {numberWithCommas} from '~/utils/helper';

const EducationHorizontalItem = ({
  course,
  onCoursePress,
  style,
}: ProductHorizontalItemProps) => {
  return (
    <Button
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
          width={140}
          height={114}
          p="2"
          borderRadius={5}
          borderWidth={1}
          borderColor={getColor({color: 'background.700'})}>
          <CourseItemIcon />
        </VStack>
      )}

      {course?.course?.hasCertificate && (
        <Pressable style={styles.heartButton} shadow={'2'}>
          <MedalFillStartIcon width={16} height={16} />
        </Pressable>
      )}
      <Typography
        color={getColor({color: 'gray.800'})}
        style={styles.title}
        numberOfLines={2}>
        {course?.course?.title}
      </Typography>
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
        mt="4px">
        {course?.course?.category}
      </Typography>
      <VStack mt="3" flex={1}>
        {course?.course?.rateAverage !== 0 ? (
          <HStack>
            <StarGoldIcon />
            <Typography
              color={getColor({color: 'gray.800'})}
              fontSize={'sm'}
              fontWeight={'400'}
              mx="1">
              {Number.isInteger(course?.course?.rateAverage)
                ? course?.course?.rateAverage
                : course?.course?.rateAverage?.toFixed(1)}{' '}
              ({course?.course?.reviewCount} Reviews)
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
      </VStack>
    </Button>
  );
};

export default EducationHorizontalItem;
