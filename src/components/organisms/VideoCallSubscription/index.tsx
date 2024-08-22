import {useQueryClient} from 'react-query';
import {Typography, useAuth} from '../../elemental';
import {useEffect, useRef} from 'react';
import {subscribe} from '~/utils/subscription';
import {gql} from 'graphql-request';
import {View} from 'react-native';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import {useVonageCreateSessionToken} from './hook';
import {useSubscriptionWithEventSource} from '~/utils/subscriptionWithEventSource';

export default function VideoCallSubscription() {
  const {user} = useAuth();
  const {setHaveCall, setSessionId, setApiKey, setToken} = useLiveStreamStore();
  const {mutate: mutateCreateSessionToken, isLoading} =
    useVonageCreateSessionToken();

  const userId = user?.id;

  const ref = useRef(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const unsbscribe = subscribe(SUB_VIDEO_CALL_CREATED, {userId}, listener);
    function listener(e) {
      try {
        const data = JSON.parse(e.data);

        if (data?.payload?.data) {
          setHaveCall({
            showModal: true,
            creator: data?.data?.videoCallCreated?.creator,
            sessionId: data?.data?.videoCallCreated?.sessionId,
            vonageSessionId: data?.data?.videoCallCreated?.id,
          });
          setSessionId(data?.data?.videoCallCreated?.sessionId);
          mutateCreateSessionToken(
            {vonageSessionId: data?.data?.videoCallCreated?.id},
            {
              onSuccess(data: any, variables, context) {
                console.log(data);
                if (
                  data?.vonage_createTokenForSession?.status?.value ===
                  'Success'
                ) {
                  setApiKey(data?.vonage_createTokenForSession?.result?.apiKey);
                  setToken(data?.vonage_createTokenForSession?.result?.token);
                  // setStatus('main');
                }
              },
            },
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
    return () => {
      unsbscribe();
    };
  }, [userId]);

  return null;
}

const SUB_VIDEO_CALL_CREATED = gql`
  subscription videoCallCreated($userId: Int!) {
    videoCallCreated(userId: $userId) {
      creatorId
      creator {
        externalId
        email
        photoUrl
        fullName
        phoneNumber
        about
        location
        age
        dateOfBirth
        streetAddress
        unitNumber
        city
        state
        zipCode
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      sessionId
      date
      sessionType
      users {
        userId
        vonageSessionId
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
  }
`;
