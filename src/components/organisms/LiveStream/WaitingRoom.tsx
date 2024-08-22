import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CallIconSet,
  getColor,
  HStack,
  Image,
  MicrophoneIconSet,
  MicrophoneSlashIconSet,
  Pressable,
  Typography,
  useNavigate,
  VideoIconSet,
  VideoSlashIconSet,
} from '~/components/elemental';
import useLiveStreamStore from '~/stores/LiveStreamStore';

const WaitingRoom = ({user}: {user: any}) => {
  const setHaveCall = useLiveStreamStore(state => state?.setHaveCall);
  const setIsCameraEnabled = useLiveStreamStore(
    state => state?.setIsCameraEnabled,
  );
  const isCameraEnabled = useLiveStreamStore(state => state?.isCameraEnabled);
  const setIsMicEnabled = useLiveStreamStore(state => state?.setIsMicEnabled);
  const isMicEnabled = useLiveStreamStore(state => state?.isMicEnabled);

  const {navigateWithName, navigation} = useNavigate();

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: getColor({color: 'primary.500'}),
        alignSelf: 'center',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          src={user?.photoUrl}
          alt="video call image"
          style={{width: 100, height: 100, borderRadius: 100}}
        />

        <Typography
          color={'#fff'}
          style={{
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: 40,
          }}>
          {user?.fullName}
        </Typography>
        <Typography
          color={'#fff'}
          style={{
            fontSize: 20,
            fontWeight: '600',
            margin: 30,
            textAlign: 'center',
          }}>
          Calling...
        </Typography>
      </View>
      <HStack mt={2} space={5}>
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
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#FF381C',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: '135deg'}],
          }}
          onPress={() => [
            setHaveCall({
              creator: '',
              sessionId: '',
              vonageSessionId: '',
              showModal: false,
            }),
            navigation?.goBack(),
          ]}>
          <CallIconSet color={'#fff'} />
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

export default WaitingRoom;

const styles = StyleSheet.create({});
