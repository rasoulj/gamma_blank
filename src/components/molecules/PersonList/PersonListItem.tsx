import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button, HStack, Image, Text, User2Icon} from '~/components/elemental';

const PersonListItem = ({
  item,
  onPress,
  navigation,
  unFollow,
  follow,
}: {
  onPress?: any;
  item: any;
  navigation: any;
  unFollow: any;
  follow: any;
}) => {
  return (
    <TouchableOpacity onPress={() => navigation('profile', {item})}>
      <HStack flex={1} alignItems="center" justifyContent={'space-between'}>
        <HStack py="4" space="4" alignItems="center">
          {item?.photoUrl ? (
            <Image
              size="10"
              borderRadius="full"
              resizeMode="cover"
              bg="gray.400"
              alt={'image'}
              source={{
                uri: item?.photoUrl,
              }}
              style={{width: 45, height: 45, borderRadius: 100}}
            />
          ) : (
            <User2Icon width={45} height={45} />
          )}
          <Text fontSize={17} fontWeight="semibold">
            {item?.fullName}
          </Text>
        </HStack>
        <Button
          onPress={item?.isFollowedByMe ? unFollow : follow}
          width={24}
          variant={item?.isFollowedByMe ? 'outline' : 'solid'}>
          {item?.isFollowedByMe ? 'Unfollow' : 'Follow'}
        </Button>
      </HStack>
    </TouchableOpacity>
  );
};

export default PersonListItem;
