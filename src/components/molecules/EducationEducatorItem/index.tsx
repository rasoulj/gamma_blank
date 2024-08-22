import React from 'react';
import styles from './styles';
import {Image, Typography, VStack, getColor} from '~/components/elemental';
import {Button, HStack} from 'native-base';
import StarGoldIcon from '~/assets/icons/CustomIcons/StarYellow.icon';
import User3Icon from '~/assets/icons/user3icon';

const EducationEducatorItem = ({item, onItemPress, style}) => {
  return (
    <Button
      shadow={'2'}
      style={[styles.container, style]}
      onPress={() => onItemPress?.()}>
      {item?.photoUrl ? (
        <Image style={styles.img} source={{uri: item?.photoUrl}} />
      ) : (
        <VStack
          alignSelf={'center'}
          style={styles.img}
          borderRadius={'full'}
          borderWidth={1}
          borderColor={getColor({color: 'background.700'})}>
          <User3Icon width={54} height={54} />
        </VStack>
      )}
      <HStack justifyContent={'center'} alignItems={'center'} mt="2" mb="3">
        <StarGoldIcon />
        <Typography
          color={getColor({color: 'gray.800'})}
          fontSize={'sm'}
          fontWeight={'400'}
          ml="1">
          {Number.isInteger(item?.rateAverage)
            ? item?.rateAverage
            : item?.rateAverage?.toFixed(1)}
        </Typography>
      </HStack>

      <Typography
        color={getColor({color: 'gray.800'})}
        style={styles.title}
        numberOfLines={1}>
        {item?.fullName}
      </Typography>
      <Typography
        color={getColor({color: 'gray.500'})}
        fontSize={'xs'}
        fontWeight={'400'}
        lineHeight={17}
        numberOfLines={1}
        mt="1"
        mb="1.5"
        textAlign={'center'}>
        {item?.profession}
      </Typography>
    </Button>
  );
};

export default EducationEducatorItem;
