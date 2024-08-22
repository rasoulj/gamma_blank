import {useRoute} from '@react-navigation/native';
import {gql} from 'graphql-request';
import React, {useEffect, useState} from 'react';
import {
  graphqlFetcher,
  useMutation,
  useToast,
  Typography,
  View,
  useNavigate,
  getColor,
} from '~/components/elemental';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import AddUser from './AddUser';
import {
  AcceptVideoCallSubscription,
  useCreateVideoCall,
  useVonageCreateSession,
  useVonageCreateSessionUser,
} from './hooks';
import Join from './Join';
import Live from './Live';
import LiveMain from './LiveMain';
import {ActivityIndicator} from 'react-native';
import WaitingRoom from './WaitingRoom';

const LiveStream = () => {
  const {toast} = useToast();
  const status = useLiveStreamStore(state => state?.status);
  const {params} = useRoute();
  const {navigateWithName} = useNavigate();
  const [type, setType] = useState('wait');
  const [sessionData, setSessionData] = useState();
  const [liveStreamData, setLiveStreamData] = useState();
  const {mutate, isLoading} = useMutation(args => {
    return graphqlFetcher(CREATE_TOKEN_FOR_SESSION, args);
  });
  const {mutate: mutateCreateVideoCall} = useCreateVideoCall();
  const onCreateSession = result => {
    setType('addUser');
    setSessionData(result);
  };
  useEffect(() => {
    const input = {
      userId: params?.item?.id,
    };

    mutateCreateVideoCall(input, {
      onSuccess(data, variables, context) {
        console.log(data);
      },
    });
  }, []);

  // const {mutate: mutateCreateSession} = useVonageCreateSession();

  // useEffect(() => {
  //   mutateCreateSession(undefined, {
  //     onSuccess(data) {
  //       console.log(data);
  //     },
  //   });
  // }, []);
  const gotoVonage = id => {
    console.log(id);
    const input = {
      vonageSessionId: typeof id === 'number' ? id : sessionData?.id,
    };
    mutate(input, {
      onSuccess: success => {
        console.log(success);
        if (
          success?.vonage_createTokenForSession?.status?.value === 'Success'
        ) {
          toast({message: 'success!'});
          setLiveStreamData(success?.vonage_createTokenForSession?.result);
          setTimeout(() => {
            setType('live');
          }, 1000);
        }
      },
      onError: error => {
        toast({message: error.toString()});
      },
    });
  };

  switch (status) {
    case 'wait':
      return (
        <>
          <WaitingRoom user={params?.item} />
          <AcceptVideoCallSubscription />
        </>
      );
    case 'rejected':
      setTimeout(() => {
        navigateWithName('profile', {item: params?.item});
      }, 3000);
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getColor({color: 'primary.400'}),
            borderRadius: 15,
          }}>
          <Typography color={'#fff'} style={{fontWeight: '600', fontSize: 16}}>
            The video call was declined
          </Typography>
        </View>
      );
    // case 'join':
    //   return (
    //     <Join
    //       // userId={params?.userId}
    //       navigation={{
    //         navigate: setType,
    //         goBack: () => setType('join'),
    //       }}
    //     />
    //   );
    // case 'addUser':
    //   return (
    //     <AddUser {...{sessionData, gotoVonage}} isLoadingJoin={isLoading} />
    //   );

    case 'live':
      return (
        <Live
          navigation={{
            navigate: setType,
            goBack: () => setType('join'),
          }}
        />
      );

    default:
      return <LiveMain />;
  }
};

export default LiveStream;

const CREATE_TOKEN_FOR_SESSION = gql`
  mutation vonage_createTokenForSession($vonageSessionId: Int!) {
    vonage_createTokenForSession(vonageSessionId: $vonageSessionId) {
      result {
        sessionId
        apiKey
        token
      }
      status
    }
  }
`;
