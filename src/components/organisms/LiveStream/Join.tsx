import React, {useEffect} from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import {
  Screen,
  Header,
  Typography,
  getColor,
  VStack,
  Layer,
  OnCameraIcon,
  OffCameraIcon,
  VoiceIcon,
  MuteIcon,
  Button,
  verticalScale,
  MicrophoneIconSet,
  MicrophoneSlashIconSet,
  VideoIconSet,
  VideoSlashIconSet,
} from '~/components/elemental';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import {
  useVonageCreateSession,
  useVonageCreateSessionToken,
  useVonageCreateSessionUser,
} from './hooks';

export default function Join({userId}: {userId?: Number}) {
  const {
    isMicEnabled,
    isCameraEnabled,
    setIsCameraEnabled,
    setIsMicEnabled,
    setStatus,
    setSessionId,
    setApiKey,
    setToken,
  } = useLiveStreamStore();

  const {mutate: mutateCreateSession} = useVonageCreateSession();
  const {mutate: mutateCreateSessionToken, isLoading} =
    useVonageCreateSessionToken();
  const {mutate: mutateCreateSessionUser} = useVonageCreateSessionUser();

  const AddUserToSession = ({
    userId,
    sessionId,
  }: {
    userId: any;
    sessionId: any;
  }) => {
    mutateCreateSessionUser({userId});
  };
  const JoinToMeet = () => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1));
    const input = {
      date: `${date.toISOString()}`,
    };
    mutateCreateSession(
      {input: input},
      {
        onSuccess(data: any) {
          if (data?.vonage_createSession?.status?.value === 'Success') {
            setSessionId(data?.vonage_createSession?.result?.sessionId);
            if (userId) {
              AddUserToSession({
                userId: userId,
                sessionId: data?.vonage_createSession?.result?.id,
              });
            }
            mutateCreateSessionToken(
              {vonageSessionId: data?.vonage_createSession?.result?.id},
              {
                onSuccess(data: any, variables, context) {
                  console.log(data);
                  if (
                    data?.vonage_createTokenForSession?.status?.value ===
                    'Success'
                  ) {
                    setApiKey(
                      data?.vonage_createTokenForSession?.result?.apiKey,
                    );
                    setToken(data?.vonage_createTokenForSession?.result?.token);
                    setStatus('main');
                  }
                },
              },
            );
          }
        },
      },
    );
  };

  return (
    <Screen>
      {/* <Header title="Join" hasBack="true" style={{marginHorizontal: 5}} /> */}
      <VStack justifyContent="center" alignItems={'center'}>
        <Layer
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography
            style={{
              fontWeight: '600',
              fontSize: 26,
              textAlign: 'center',
              marginTop: 30,
              padding: 5,
              lineHeight: 35,
            }}>
            Ready to join to design workshop?
          </Typography>
          <Typography style={{marginTop: 12, fontSize: 15}}>
            There are {} people in this meeting
          </Typography>
        </Layer>
        <Layer
          style={{
            marginTop: 24,
            width: 200,
            height: 311,
            backgroundColor: getColor({color: 'gray.500'}),
            borderRadius: 9,
          }}></Layer>
        <Layer style={{marginTop: 32, flexDirection: 'row'}}>
          <Pressable>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: isCameraEnabled
                  ? getColor({color: 'background.500'})
                  : getColor({color: 'primary.400'}),
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: getColor({color: 'primary.400'}),
                borderWidth: 2,
                marginRight: 20,
              }}
              onPress={() => setIsCameraEnabled(!isCameraEnabled)}>
              {isCameraEnabled ? (
                <VideoIconSet
                  color={'primary.400'}
                  onPress={() => setIsCameraEnabled(false)}
                />
              ) : (
                <VideoSlashIconSet
                  color={'background.500'}
                  onPress={() => setIsCameraEnabled(true)}
                />
              )}
            </TouchableOpacity>
          </Pressable>
          <Pressable>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: isMicEnabled
                  ? getColor({color: 'background.500'})
                  : getColor({color: 'primary.400'}),
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: getColor({color: 'primary.400'}),
                borderWidth: 2,
              }}
              onPress={() => setIsMicEnabled(!isMicEnabled)}>
              {isMicEnabled ? (
                <MicrophoneIconSet
                  color={'primary.400'}
                  onPress={() => setIsMicEnabled(false)}
                />
              ) : (
                <MicrophoneSlashIconSet
                  color={'background.500'}
                  onPress={() => setIsMicEnabled(true)}
                />
              )}
            </TouchableOpacity>
          </Pressable>
        </Layer>
        <Button
          isLoading={isLoading}
          onPress={() => JoinToMeet()}
          style={{
            width: '96%',
            marginTop: verticalScale(65),
            height: verticalScale(49),
          }}>
          <Typography style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            Join
          </Typography>
        </Button>
      </VStack>
    </Screen>
  );
}
