import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  MicrophoneIconSet,
  MicrophoneSlashIconSet,
  getColor,
  VideoIconSet,
  VideoSlashIconSet,
  HStack,
  CallIconSet,
  CallSlashIconSet,
  useNavigate,
} from '~/components/elemental';
import {scale} from '../../elemental';
import useLiveStreamStore from '~/stores/LiveStreamStore';
const LiveStreamFooter = ({
  toggleAudio,
  toggleVideo,
  endCall,
}: {
  toggleAudio: () => void;
  toggleVideo: () => void;
  endCall: () => void;
}) => {
  const isMicEnabled = useLiveStreamStore(state => state?.isMicEnabled);
  const isCameraEnabled = useLiveStreamStore(state => state?.isCameraEnabled);
  const setApiKey = useLiveStreamStore(state => state?.setApiKey);
  const setSessionId = useLiveStreamStore(state => state?.setSessionId);
  const setToken = useLiveStreamStore(state => state?.setToken);
  const setStatus = useLiveStreamStore(state => state?.setStatus);

  const {navigateWithName, navigation} = useNavigate();
  const LiveRoom = () => {
    // setStatus('join');
    navigation?.goBack()
    setApiKey('');
    setToken('');
    setSessionId('');
    setStatus('wait');
    endCall();
  };
  return (
    <HStack
      style={{
        width: '70%',
        alignSelf: 'center',
        bottom: 10,
        left: 8,
        right: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 100,
      }}>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: getColor({color: 'error.500'}),
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: getColor({color: 'error.500'}),
          borderWidth: 2,
        }}
        onPress={() => LiveRoom()}>
        <CallSlashIconSet color={'background.500'} onPress={() => LiveRoom()} />
      </TouchableOpacity>
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
        onPress={() => toggleAudio()}>
        {isMicEnabled ? (
          <MicrophoneIconSet
            color={'primary.400'}
            onPress={() => toggleAudio()}
          />
        ) : (
          <MicrophoneSlashIconSet
            color={'background.500'}
            onPress={() => toggleAudio()}
          />
        )}
      </TouchableOpacity>
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
        onPress={() => toggleVideo()}>
        {isCameraEnabled ? (
          <VideoIconSet color={'primary.400'} onPress={() => toggleVideo()} />
        ) : (
          <VideoSlashIconSet
            color={'background.500'}
            onPress={() => toggleVideo()}
          />
        )}
      </TouchableOpacity>
    </HStack>
  );
};

export default LiveStreamFooter;
