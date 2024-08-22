import React from 'react';
import styles from './styles';
import {
  BriefcaseIconSet,
  CalendarIconSet,
  getColor,
  HStack,
  Image,
  Rating,
  Typography,
  VStack,
} from '~/components/elemental';
import User3Icon from '~/assets/icons/user3icon';
import FillVerifyIcon from '~/assets/icons/CustomIcons/FillVerify.icon';
import {appFormatDate} from '~/utils/helper';

const EducatorProfile = ({data, joinDate, yearsOfExperience}) => {
  return (
    <VStack>
      {data?.isVerified && (
        <VStack position={'absolute'} top={0} left={'20%'} zIndex={10}>
          <FillVerifyIcon />
        </VStack>
      )}
      <HStack
        alignItems={'center'}
        space={'4'}
        mb="4"
        justifyContent={'space-between'}>
        {data?.photoUrl ? (
          <Image style={styles.img} source={{uri: data?.photoUrl}} />
        ) : (
          <VStack
            alignSelf={'center'}
            style={styles.img}
            borderRadius={'full'}
            borderWidth={1}
            borderColor={getColor({color: 'background.700'})}>
            <User3Icon width={110} height={110} />
          </VStack>
        )}
        <VStack flex={1}>
          <Typography
            fontSize="lg"
            fontWeight={'500'}
            color={getColor({color: 'gray.800'})}>
            {data?.fullName}
          </Typography>
          <Typography
            fontSize="md"
            fontWeight={'500'}
            color={getColor({color: 'gray.500'})}
            mt={'1'}
            mb={'1'}>
            {data?.profession}
          </Typography>
          <VStack alignItems={'flex-start'}>
            <Rating rating={data?.rateAverage} onlyRead={true} />
          </VStack>
        </VStack>
      </HStack>
      {joinDate && (
        <HStack space={'2'} alignItems={'center'} my={'2'}>
          <CalendarIconSet />
          <Typography style={styles.date}>
            Joined {appFormatDate(data?.createdDate, 'MMM YYYY')}
          </Typography>
        </HStack>
      )}
      {yearsOfExperience && (
        <HStack space={'2'} alignItems={'center'}>
          <BriefcaseIconSet />
          <Typography style={styles.date}>
            {data?.yearsOfExperience} years of Experience
          </Typography>
        </HStack>
      )}
    </VStack>
  );
};
export default EducatorProfile;
