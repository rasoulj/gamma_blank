import {Center, Divider, HStack, VStack} from 'native-base';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  Button,
  Location2Icon,
  convertTimeSpanToTime,
  print,
  relativeTime,
  scale,
} from '../../elemental';
import Image from '../../atoms/Image';
import Typography from '../../atoms/Typography';

export default function RenderItem({
  item,
  index,
  distance,
  onPress,
  showDetail,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <HStack
        shadow={1}
        p={scale(8)}
        borderRadius={10}
        backgroundColor={'background.500'}
        my={2}
        alignItems="center">
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
          }}
          src={item?.event?.imageUrl}
        />
        <VStack justifyContent={'space-between'} ml={2} space={3}>
          <Typography fontWeight={'bold'}>{item?.event?.title}</Typography>
          <Typography fontSize="sm" color="gray.500" fontWeight={'light'}>
            {item?.event?.category}
          </Typography>
          <Typography fontSize="sm" color="gray.500" fontWeight={'light'}>
            {relativeTime(item?.event?.date, 'MMMM, MM.YYYY / ') +
              convertTimeSpanToTime(item?.event?.startTime) +
              ' - ' +
              convertTimeSpanToTime(item?.event?.endTime)}
          </Typography>
          <HStack space={1} alignItems={'center'}>
            <Location2Icon />
            <TouchableWithoutFeedback onPress={showDetail}>
              <Typography fontSize="sm" color={'#006194'}>
                {item?.event?.state} - {distance?.toFixed(2)} KM
              </Typography>
            </TouchableWithoutFeedback>
          </HStack>
        </VStack>
      </HStack>
    </TouchableWithoutFeedback>
  );
}
