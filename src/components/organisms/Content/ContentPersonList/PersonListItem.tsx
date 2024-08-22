import React from 'react';
import {HStack, Image, Text, User2Icon} from '~/components/elemental';

const PersonListItem = ({item}: {item: any}) => {
  return (
    <HStack flex={1} alignItems="center" justifyContent={'space-between'}>
      <HStack py="4" space="4" alignItems="center">
        {item?.photoUrl ? (
          <Image
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
    </HStack>
  );
};

export default PersonListItem;
