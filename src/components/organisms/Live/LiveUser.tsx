import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import LiveMain from './LiveMain';
import {useRoute} from '@react-navigation/native';
import {useVonageCreateSessionToken} from './hooks';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import {LoadIndicator} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';

const LiveUser = ({
  liveItem,
  creator,
  id,
  sessionId,
  hasBottomOptions = true,
}: {
  liveItem?: any;
  creator?: any;
  id?: any;
  sessionId?: any;
  hasBottomOptions?: boolean;
}) => {
  const params = useRoute().params;

  const item = liveItem
    ? liveItem
    : params?.item
    ? params?.item
    : {
        creator: creator ?? {
          fullName: params?.fullName,
          photoUrl: params?.photo,
        },
        id: id ? parseInt(id) : parseInt(params?.entityId),
        sessionId: sessionId ?? params?.sessionId,
      };
  const user = item?.creator;
  const entityId = item?.id;
  const {setApiKey, setToken, setSessionId} = useLiveStreamStore();
  const [streamStarted, setStreamStarted] = useState(false);

  const {mutate: tokenMutate, isLoading: tokenLoading} =
    useVonageCreateSessionToken();

  useEffect(() => {
    if (item) {
      setSessionId(item?.sessionId);
      tokenMutate(
        {vonageSessionId: item?.id},
        {
          onSuccess(data: any, variables, context) {
            if (
              data?.vonage_createTokenForSession?.status?.value === 'Success'
            ) {
              setApiKey(data?.vonage_createTokenForSession?.result?.apiKey);
              setToken(data?.vonage_createTokenForSession?.result?.token);
              setStreamStarted(true);
            }
          },
        },
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      {tokenLoading || !streamStarted ? (
        <LoadIndicator />
      ) : (
        <LiveMain {...{user, entityId, item, hasBottomOptions}} />
      )}
    </View>
  );
};

export default LiveUser;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: getColor({color: 'gray.800'})},
});
