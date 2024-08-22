import React, {Fragment} from 'react';
import styles from './styles';
import {
  getColor,
  HStack,
  Image,
  Typography,
  VStack,
} from '~/components/elemental';
import User3Icon from '~/assets/icons/user3icon';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import MedalFillStartIcon from '~/assets/iconset/Users/medal-fill-star';
import StarGoldIcon from '~/assets/icons/CustomIcons/StarYellow.icon';
import {
  formatMillisecondsToString,
  numberWithCommas,
  toPascalCase,
} from '~/utils/helper';
import CenterIconContainer from '~/components/atoms/CenterIconContainer';

const CourseDetailsHeader = ({data, duration}) => {
  return (
    <VStack>
      <HStack
        alignItems={'center'}
        space={'4'}
        mb="4"
        justifyContent={'space-between'}>
        {data?.user?.photoUrl ? (
          <Image style={styles.img} source={{uri: data?.user?.photoUrl}} />
        ) : (
          <VStack
            alignSelf={'center'}
            style={styles.img}
            borderRadius={'full'}
            borderWidth={1}
            borderColor={getColor({color: 'background.700'})}>
            <User3Icon width={41} height={41} />
          </VStack>
        )}
        <VStack flex={1}>
          <Typography
            fontSize="sm"
            fontWeight={'500'}
            color={getColor({color: 'gray.800'})}
            lineHeight={19}>
            {data?.user?.fullName}
          </Typography>
          <Typography
            fontSize="sm"
            fontWeight={'400'}
            color={getColor({color: 'gray.500'})}
            lineHeight={19}
            mt={1}>
            {data?.user?.profession}
          </Typography>
        </VStack>
      </HStack>
      {data?.photoUrl ? (
        <Fragment>
          <Image style={styles.certificate} source={{uri: data?.photoUrl}} />
          {data?.hasCertificate && (
            <VStack style={styles.certificateButton2} shadow={'2'}>
              <MedalFillStartIcon width={16} height={16} />
            </VStack>
          )}
        </Fragment>
      ) : (
        <VStack
          alignSelf={'center'}
          width={'full'}
          height={167}
          p="2"
          borderRadius={5}
          borderWidth={1}
          borderColor={getColor({color: 'background.700'})}>
          <CourseItemIcon />
          {data?.hasCertificate && (
            <VStack style={styles.certificateButton} shadow={'2'}>
              <MedalFillStartIcon width={16} height={16} />
            </VStack>
          )}
        </VStack>
      )}
      <Typography
        fontWeight={'600'}
        fontSize="xl"
        lineHeight={26}
        color="gray.800"
        mt="4">
        {toPascalCase(data?.title)}
      </Typography>
      <Typography
        fontWeight={'500'}
        fontSize="sm"
        lineHeight={19}
        color="gray.500"
        my="2">
        {data?.category} - {data?.subcategory}
      </Typography>
      <Typography
        fontWeight={'700'}
        fontSize="lg"
        lineHeight={24}
        color="secondary.500">
        {data?.price === 0 ? 'Free' : `$${numberWithCommas(data?.price)}`}
      </Typography>
      <HStack
        mt="4"
        mb="5"
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Typography
          fontWeight={'500'}
          fontSize="sm"
          lineHeight={19}
          color="gray.800">
          {toPascalCase(data?.level)}
        </Typography>
        <CenterIconContainer
          width={'2'}
          height={'2'}
          color={getColor({color: 'gray.800'})}
        />
        <Typography
          fontWeight={'500'}
          fontSize="sm"
          lineHeight={19}
          color="gray.800">
          {data?.lessons?.length} Lessons
        </Typography>
        <CenterIconContainer
          width={'2'}
          height={'2'}
          color={getColor({color: 'gray.800'})}
        />
        <Typography
          fontWeight={'500'}
          fontSize="sm"
          lineHeight={19}
          color="gray.800">
          {formatMillisecondsToString(Math.ceil(duration / 60) * 60 * 1000)}
        </Typography>
        <CenterIconContainer
          width={'2'}
          height={'2'}
          color={getColor({color: 'gray.800'})}
        />
        <HStack alignItems={'center'}>
          <StarGoldIcon width={15} height={15} />
          <Typography
            fontWeight={'500'}
            fontSize="sm"
            lineHeight={19}
            color="gray.800"
            ml="1">
            {Number.isInteger(data?.rateAverage)
              ? data?.rateAverage
              : data?.rateAverage?.toFixed(1)}
          </Typography>
        </HStack>
      </HStack>
    </VStack>
  );
};
export default CourseDetailsHeader;
