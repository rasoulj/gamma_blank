import {gql} from 'graphql-request';
import {FlatList, HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useQueryClient} from 'react-query';
import {graphqlFetcher, useMutation, useToast} from '~/components/elemental';
import Button from '../../atoms/Button';
import Screen from '../../atoms/Screen';
import {useGetUsers, useGetUsersOfSession} from './hooks';

const AddUser = ({
  sessionData,
  gotoVonage,
  isLoadingJoin,
}: {
  sessionData: any;
  gotoVonage: any;
  isLoadingJoin: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {toast} = useToast();
  const queryClient = useQueryClient();

  const options = {
    vonageSessionId: sessionData?.id,
  };
  const {isLoading, data} = useGetUsersOfSession(options);
  const {isLoading: isLoadingGetUsers, data: usersData} = useGetUsers();
  const {mutate, isLoading: isLoadingAddUser} = useMutation(args => {
    return graphqlFetcher(VONAGE_CREATE_USER, args);
  });

  const items = data?.pages || [];
  const users = usersData?.pages || [];
  const addUserFunction = id => {
    const input = [
      {
        id: null,
        userId: id,
        vonageSessionId: sessionData?.id,
      },
    ];
    mutate(
      {input},
      {
        onSuccess: success => {
          queryClient.invalidateQueries('getUsersOfSession');
          setIsVisible(false);
          toast({message: 'Add success!'});
        },
        onError: error => {
          toast({message: error.toString()});
        },
      },
    );
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          borderBottomWidth="0.5"
          mx="5"
          py="4">
          <Text>{item?.user?.fullName}</Text>
          <Text>{item?.user?.email}</Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  const renderItemUsers = ({item}: {item: any}) => {
    return (
      <TouchableOpacity onPress={() => addUserFunction(item?.id)}>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          borderBottomWidth="0.5"
          mx="5"
          py="4">
          <Text color={'black'}>{item?.fullName}</Text>
          <Text>{item?.email}</Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  return (
    <Screen
      isLoading={
        isLoading || isLoadingGetUsers || isLoadingAddUser || isLoadingJoin
      }>
      <VStack py="5" flex={1}>
        <Button
          onPress={() => setIsVisible(true)}
          style={{width: '50%', alignSelf: 'center'}}>
          <Text>Add User</Text>
        </Button>
        <FlatList data={items} renderItem={renderItem} />

        <Button
          onPress={gotoVonage}
          style={{width: '50%', alignSelf: 'center'}}>
          <Text>Join</Text>
        </Button>

        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
          <FlatList
            borderRadius="xl"
            my="10"
            data={users}
            renderItem={renderItemUsers}
          />
          <Button
            onPress={() => setIsVisible(false)}
            style={{width: '50%', alignSelf: 'center'}}>
            <Text>Close</Text>
          </Button>
        </Modal>
      </VStack>
    </Screen>
  );
};

export default AddUser;

const VONAGE_CREATE_USER = gql`
  mutation vonage_createSessionUser($input: [VonageSessionUserInput]) {
    vonage_createSessionUser(input: $input) {
      status
    }
  }
`;
