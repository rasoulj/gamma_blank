import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useAcceptVideoCall} from './hook';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import {
  CallIconSet,
  ElementalProvider,
  getColor,
  HStack,
  Image,
  isDark,
  Modals,
  Toasts,
  Typography,
  useNavigate,
} from '~/components/elemental';

const VideoCallModal = () => {
  const {navigateWithName} = useNavigate();

  const {mutate, isLoading} = useAcceptVideoCall();
  const {haveCall, setHaveCall, setStatus} = useLiveStreamStore();

  const answerCall = ({accepted}: {accepted: boolean}) => {
    const input = {
      vonageSessionId: haveCall?.vonageSessionId,
      accepted: accepted,
    };
    mutate(input, {
      onSuccess(data, variables, context) {
        console.log(data);
        setHaveCall({...haveCall, showModal: false});
        if (accepted && data) {
          setStatus('main');
          navigateWithName('Live stream');
        }
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        width: '90%',
        height: '80%',
        backgroundColor: getColor({color: 'primary.500'}),
        position: 'absolute',
        bottom: 60,
        alignSelf: 'center',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          src={haveCall?.creator?.photoUrl}
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
          {haveCall?.creator?.fullName}
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
      <HStack mt={2} space={10}>
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
            answerCall({accepted: false}),
            setHaveCall({...haveCall, showModal: false}),
          ]}>
          <CallIconSet color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#4CD85E',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => answerCall({accepted: true})}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'#fff'} />
          ) : (
            <CallIconSet color={'#fff'} />
          )}
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

export default VideoCallModal;

const styles = StyleSheet.create({});
