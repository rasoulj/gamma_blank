import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import SupportIcon from '~/assets/icons/CustomIcons/Support.icon';
import {
  ArrowRightIconSet,
  CallIconSet,
  HStack,
  Image,
  Layer,
  MessageIconSet,
  Typography,
  VStack,
  deviceWidth,
  useNavigate,
} from '~/components/elemental';
import {useGetUsers} from './hook';

const FullSupport = ({
  phoneNumber,
  image,
  availableChatTime,
  availableTelephoneTime,
}) => {
  const {navigateWithName} = useNavigate();
  const {data} = useGetUsers({
    where: {
      userType: {
        eq: 'OWNER',
      },
    },
  });

  return (
    <VStack space={5}>
      <Layer style={styles.imageContainer}>
        {image ? <Image src={image} style={styles.image} /> : <SupportIcon />}
      </Layer>
      <HStack style={styles.supportTextContainer}>
        <CallIconSet />
        <Typography style={styles.supportText}>Telephone</Typography>
      </HStack>
      <Typography style={styles.phoneNumberText}>{phoneNumber}</Typography>
      <Typography color={'gray.500'} style={styles.timeText}>
        {availableTelephoneTime}
      </Typography>
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() =>
          navigateWithName('chat', {
            item: data?.pages?.[0],
            isProfile: true,
          })
        }>
        <MessageIconSet />
        <Typography style={styles.supportText}>Chat</Typography>
        <Layer style={styles.flexContainer} />
        <ArrowRightIconSet style={styles.arrowRightIcon} />
      </TouchableOpacity>
      <Typography color={'gray.500'} style={styles.timeText}>
        {availableChatTime}
      </Typography>
    </VStack>
  );
};

export default FullSupport;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  image: {
    width: deviceWidth * 0.7,
    height: deviceWidth * 0.7,
    resizeMode: 'contain',
    marginTop: 30,
    marginBottom: 10,
  },
  supportTextContainer: {},
  supportText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
  phoneNumberText: {
    fontSize: 14,
    fontWeight: '400',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
  },
  chatContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  flexContainer: {
    flex: 1,
  },
  arrowRightIcon: {
    alignSelf: 'flex-end',
  },
});
