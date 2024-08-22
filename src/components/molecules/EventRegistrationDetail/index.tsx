import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  ArrowBackIcon,
  Avatar,
  Button,
  CalenderIcon,
  ClockIcon,
  HStack,
  Image,
  isIOS,
  MenuBarIcon,
  relativeTime,
  ScrollView,
  Typography,
} from '../../elemental';
import Card from '../../atoms/Card';

interface IProps {
  title?: string;
  data: any;
  navigation?: NativeStackNavigationProp<any>;
  onOpenDrawer?: () => void;
  onBuyTicket?: (id) => void;
}

export default function EventRegistrationDetail({
  title = 'Event Details',
  data,
  navigation,
  onOpenDrawer,
  onBuyTicket,
}: IProps) {
  return (
    <React.Fragment>
      <Card
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mx={4}
        height={12}
        borderRadius={10}
        px={4}
        style={{
          shadowColor: isIOS ? '#ccc' : '#000',
          marginTop: isIOS ? 0 : 16,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}>
          <ArrowBackIcon width={15} height={15} />
        </TouchableWithoutFeedback>
        <Typography fontWeight={'bold'}>{title}</Typography>
        <TouchableWithoutFeedback onPress={onOpenDrawer}>
          <MenuBarIcon width={18} height={18} />
        </TouchableWithoutFeedback>
      </Card>
      <ScrollView mt={8} px={8} bounces={false}>
        <Image
          style={{
            width: '100%',
            height: 216,
            borderRadius: 5,
          }}
          alt={'Detail'}
          src={data?.image}
        />
        <Typography mt={4} fontWeight="bold" fontSize={18}>
          {data?.title}
        </Typography>
        <HStack justifyContent="space-between" alignItems="center" mt={2}>
          <Typography color="#828282">{data?.type}</Typography>
          <Typography color="#006194" fontWeight={'bold'} fontSize={16}>
            ${parseFloat(data?.price).toFixed(2)}
          </Typography>
        </HStack>
        <HStack mt={3} alignItems="center">
          <CalenderIcon />
          <Typography ml={1}>
            {relativeTime(data?.date, 'DD MMMM, YYYY')}
          </Typography>
          <ClockIcon style={{marginLeft: 32}} />
          <Typography ml={1}>{data?.time}</Typography>
        </HStack>
        <Typography fontWeight="bold" mt={8}>
          Description
        </Typography>
        <Typography mt={2}>{data?.description}</Typography>
        <HStack mt={12} alignItems="center">
          <Avatar.Group>
            {data?.participant.map(item => (
              <Avatar key={item.id} source={{uri: item.uri}}>
                {data?.name}
              </Avatar>
            ))}
          </Avatar.Group>
          <Typography ml={8}>
            +{data?.participant.length / 2} Participants
          </Typography>
        </HStack>
        <Button
          onPress={() => onBuyTicket(data?.id)}
          _text={{
            fontWeight: 'bold',
          }}
          style={{
            height: 52,
          }}
          bgColor={'#1DE9B6'}
          mt={16}>
          Buy Ticket
        </Button>
      </ScrollView>
    </React.Fragment>
  );
}
