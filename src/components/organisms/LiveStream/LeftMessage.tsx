import dayjs from 'dayjs';
import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {Image} from 'react-native';

const LeftMessage = ({item}: {item: any}) => {
  const currentDate = dayjs(item?.addedOn);

  return (
    <HStack space="1" alignItems="flex-end">
      <Image
        source={item?.sender?.photoUrl}
        style={{
          width: 50,
          height: 50,
          borderRadius: 1000,
          backgroundColor: 'gray',
        }}
      />
      <VStack space="1">
        <VStack space="1" bg="#DCF3FF" px="3" pb="4" pt="2" borderRadius="2xl">
          <Text color="#1DE9B6">{item?.sender?.fullName}</Text>

          <Text color="black">{item?.text}</Text>
        </VStack>
        <Text fontSize={12} color="gray.600" alignSelf="flex-start">
          {currentDate.format('hh:mm A')}
        </Text>
      </VStack>
    </HStack>
  );
};

export default LeftMessage;
