import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  MicrophoneIconSet,
  MicrophoneSlashIconSet,
  getColor,
  VideoIconSet,
  VideoSlashIconSet,
  useNavigate,
  CloseIconSet,
  scale,
  RefreshIconSet,
} from '~/components/elemental';
import useLiveStreamStore from '~/stores/LiveStreamStore';

const LiveStreamFooter = ({
  toggleAudio,
  toggleVideo,
  endCall,
  onFlipCamera,
}: {
  toggleAudio: () => void;
  toggleVideo: () => void;
  endCall: () => void;
  onFlipCamera?: () => void;
}) => {
  const isMicEnabled = useLiveStreamStore(state => state?.isMicEnabled);
  const isCameraEnabled = useLiveStreamStore(state => state?.isCameraEnabled);
  const setApiKey = useLiveStreamStore(state => state?.setApiKey);
  const setSessionId = useLiveStreamStore(state => state?.setSessionId);
  const setToken = useLiveStreamStore(state => state?.setToken);
  const setStatus = useLiveStreamStore(state => state?.setStatus);

  const {navigation} = useNavigate();
  const LeaveRoom = () => {
    navigation?.goBack();
    setApiKey('');
    setToken('');
    setSessionId('');
    setStatus('wait');
    endCall();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={LeaveRoom}>
        <CloseIconSet color={'gray.800'} width={scale(32)} height={scale(32)} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.touchable,
          {
            backgroundColor: isMicEnabled
              ? 'rgba(255, 255, 255, 0.30)'
              : getColor({color: 'gray.800'}),
          },
        ]}
        onPress={toggleAudio}>
        {isMicEnabled ? (
          <MicrophoneIconSet color={'gray.800'} />
        ) : (
          <MicrophoneSlashIconSet color={'background.500'} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.touchable,
          {
            backgroundColor: isCameraEnabled
              ? 'rgba(255, 255, 255, 0.30)'
              : getColor({color: 'gray.800'}),
          },
        ]}
        onPress={toggleVideo}>
        {isCameraEnabled ? (
          <VideoIconSet color={'gray.800'} />
        ) : (
          <VideoSlashIconSet color={'background.500'} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={onFlipCamera}>
        <RefreshIconSet color={'gray.800'} />
      </TouchableOpacity>
    </View>
  );
};

export default LiveStreamFooter;

const iconWidth = scale(40);
const styles = StyleSheet.create({
  touchable: {
    width: iconWidth,
    height: iconWidth,
    borderRadius: iconWidth / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 1, height: 2},
    elevation: 10,
    marginBottom: 8,
    shadowRadius: 50,
    shadowColor: 'black',
  },

  container: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 16,
    zIndex: 10000,
  },
});
