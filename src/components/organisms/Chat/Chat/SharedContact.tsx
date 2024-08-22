import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Typography,
  UserAvatar,
  relativeTimeFromNow,
  scale,
  useNavigate,
} from '~/components';
import {useGetUser} from './hook';
import {VStack} from 'native-base';
import {getColor} from '~/utils/helper/theme.methods';
const SharedContact = ({item, isMine}) => {
  const {data} = useGetUser(item?.mediaEntityId);
  const user = data?.social_getUser?.result?.user;

  const {navigateWithName} = useNavigate();
  const onPress = () => {
    navigateWithName('Profile', {item: user});
  };

  return (
    <VStack w="70%" alignSelf={isMine ? 'flex-end' : 'flex-start'}>
      <VStack
        space="4"
        p="4"
        borderRadius={15}
        borderWidth={1}
        borderColor="primary.500">
        <UserAvatar user={user} extraData={user?.username} hasShadow={false} />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Typography fontWeight="700" fontSize="sm" color="gray.50">
            View Profile
          </Typography>
        </TouchableOpacity>
      </VStack>
      <Typography style={styles.dateText}>
        {relativeTimeFromNow(item?.createdAt)}
      </Typography>
    </VStack>
  );
};

export default SharedContact;

const styles = StyleSheet.create({
  dateText: {
    color: 'gray.500',
    textAlign: 'left',
    marginLeft: 3,
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: getColor({color: 'primary.500'}),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 23,
    borderRadius: 10,
  },
});
