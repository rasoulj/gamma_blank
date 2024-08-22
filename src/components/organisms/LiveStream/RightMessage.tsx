import dayjs from 'dayjs';
import {Box, Text, VStack} from 'native-base';
import React from 'react';

const RightMessage = ({item}: {item: any}) => {
  const currentDate = dayjs(item?.addedOn);

  return (
    <VStack space="1">
      <Box bg="#1DE9B6" px="3" py="4" borderRadius="2xl">
        <Text color="white">{item?.text}</Text>
      </Box>
      <Text fontSize={12} color="gray.600" alignSelf="flex-end">
        {currentDate.format('hh:mm A')}
      </Text>
    </VStack>
  );
};

export default RightMessage;
