import React from 'react';
import {Pressable} from 'react-native';
import {
  Button,
  HStack,
  Image,
  Typography,
  User2Icon,
  useNavigate,
} from '~/components/elemental';

const PersonListItem = ({
  item,
  onPress,
}: {
  onPress?: any;
  item: any;
  navigation: any;
}) => {
  const {navigateWithName} = useNavigate();
  return (
    <HStack justifyContent={'space-between'} alignItems={'center'}>
      <HStack py={4} space={4} alignItems={'center'}>
        <Pressable onPress={() => navigateWithName('profile', {item})}>
          {item?.photoUrl ? (
            <Image
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
              }}
              src={item?.photoUrl}
            />
          ) : (
            <User2Icon width={45} height={45} />
          )}
        </Pressable>
        <Typography fontSize={'md'} fontWeight="semibold">
          {item?.fullName}
        </Typography>
      </HStack>
      <Button onPress={() => navigateWithName('chat', {item, isProfile: true})}>
        Message
      </Button>
    </HStack>
  );
};

export default PersonListItem;
