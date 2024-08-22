import {ActivityIndicator, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Center, Text, TextArea, VStack} from 'native-base';
import {
  Button,
  useMutation,
  graphqlFetcher,
  useToast,
  View,
  Input,
} from '~/components/elemental';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {gql} from 'graphql-request';
import theme from '~/theme';

const First = ({
  onCreateSession,
  gotoVonage,
  isLoadingJoin,
}: {
  onCreateSession: any;
  gotoVonage: any;
  isLoadingJoin: boolean;
}) => {
  const {toast} = useToast();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleJoin, setIsVisibleJoin] = useState(false);
  const [date, setDate] = useState(new Date());
  const [sessionId, setSessionId] = useState('');

  const onDateChange = (dateTemp: any) => {
    setDate(dateTemp);
  };
  const {mutate, isLoading} = useMutation(args => {
    return graphqlFetcher(CREATE_SESSION, args);
  });

  const submit = () => {
    const input = {
      date,
    };
    mutate(
      {input},
      {
        onSuccess: success => {
          if (success?.vonage_createSession?.status?.value === 'Success') {
            onCreateSession?.(success?.vonage_createSession?.result);
            setIsVisible(false);
          }
          toast({message: 'success!'});
        },
        onError: error => {
          toast({message: error.toString()});
        },
      },
    );
  };

  return (
    <VStack justifyContent={'center'} alignItems="center" flex={1} space="5">
      <Button style={{width: '50%'}} onPress={() => setIsVisible(true)}>
        <Text style={{color: 'white'}}>Create Session</Text>
      </Button>
      <Button style={{width: '50%'}} onPress={() => setIsVisibleJoin(true)}>
        <Text style={{color: 'white'}}>Join Session</Text>
      </Button>
      <Modal isVisible={isVisible}>
        <Center flex={1}>
          <View
            // bg={theme.colors.background[500]}
            space="5"
            justifyContent="center"
            py="5"
            borderRadius="2xl"
            w="100%"
            alignItems="center">
            <DatePicker
              date={date}
              mode="datetime"
              onDateChange={onDateChange}
            />

            <Button style={{width: '50%'}} onPress={submit}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text>Submit</Text>
              )}
            </Button>
            <Button
              style={{width: '50%', marginTop: 10}}
              onPress={() => setIsVisible(false)}>
              <Text>Close</Text>
            </Button>
          </View>
        </Center>
      </Modal>

      <Modal isVisible={isVisibleJoin}>
        <Center flex={1}>
          <View
            // bg={theme.colors.background[500]}
            space="5"
            justifyContent="center"
            py="5"
            borderRadius="2xl"
            w="100%"
            px="4"
            alignItems="center">
            <Input
              style={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: 10,
                color: 'black',
              }}
              placeholder="enter your session id"
              placeholderTextColor="gray"
              value={sessionId}
              onChangeText={setSessionId}
            />

            <Button
              style={{width: '50%', marginTop: 10}}
              onPress={() => gotoVonage(parseInt(sessionId))}>
              {isLoadingJoin ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text>Submit</Text>
              )}
            </Button>
            <Button
              style={{width: '50%', marginTop: 10}}
              onPress={() => setIsVisibleJoin(false)}>
              <Text>Close</Text>
            </Button>
          </View>
        </Center>
      </Modal>
    </VStack>
  );
};

export default First;

export const CREATE_SESSION = gql`
  mutation vonage_createSession($input: VonageSessionInput) {
    vonage_createSession(input: $input) {
      result {
        creatorId
        sessionId
        date
        users {
          userId
          vonageSessionId
          id
          isDeleted
          createdDate
        }
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;
