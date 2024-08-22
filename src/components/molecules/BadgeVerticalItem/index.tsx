import React from 'react';
import {Typography, VStack, getColor} from '~/components/elemental';
import {HStack, Pressable} from 'native-base';
import {StyleSheet} from 'react-native';
import StreakBadge from '~/assets/icons/CustomIcons/StreakBadge.icon';
import {appFormatDate} from '~/utils/helper';

const BadgeVerticalItem = ({item, onItemPress, style, userBadge}) => {
  const badgDate = userBadge?.find(
    badge => badge?.badgeType === item?.type,
  )?.createdDate;

  return (
    <Pressable
      shadow={'2'}
      style={[styles.container, style]}
      onPress={() => onItemPress?.()}>
      <VStack alignSelf={'center'} width={70} height={70}>
        <StreakBadge
          color={getColor({
            color: userBadge?.some(badge => badge?.badgeType === item?.type)
              ? 'primary.200'
              : 'gray.300',
          })}
        />
        <VStack position={'absolute'} alignSelf={'center'} top={'32%'}>
          {item?.icon}
        </VStack>
      </VStack>

      <VStack flex={1} ml="2">
        <HStack justifyContent={'space-between'}>
          <Typography numberOfLines={1} fontSize={'sm'} lineHeight={19}>
            {item?.title}
          </Typography>
          {badgDate && (
            <Typography
              color={getColor({color: 'gray.500'})}
              fontWeight={'400'}
              fontSize={'xs'}>
              {appFormatDate(badgDate, 'DD/MM/YYYY')}
            </Typography>
          )}
        </HStack>
        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize={'sm'}
          fontWeight={'400'}
          lineHeight={19}
          numberOfLines={2}
          mt="2">
          {item?.desc}
        </Typography>
      </VStack>
    </Pressable>
  );
};

export default BadgeVerticalItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
