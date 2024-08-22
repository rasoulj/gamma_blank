import {View, Text, Pressable} from 'react-native';
import React from 'react';
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
  verticalScale,
  EqualizerIcon,
  HStack,
  User2Icon,
  EndCall2Icon,
} from '~/components/elemental';

export default function Live() {
  return (
    <Screen>
      <Header title="Live Streaming" hasBack={'true'} />
      <Layer
        style={{
          marginTop: 20,
          height: verticalScale(400),
          backgroundColor: getColor({color: 'background.600'}),
          marginLeft: 32,
          marginRight: 32,
          borderRadius: 15,
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <HStack justifyContent="flex-end">
          <EqualizerIcon />
        </HStack>
        <HStack justifyContent="center">
          <User2Icon width={160} height={160} />
        </HStack>
        <Layer>
          <Typography fontSize="xl">Allen willson</Typography>
        </Layer>
      </Layer>
      <HStack
        style={{
          marginLeft: 32,
          marginRight: 32,
          marginTop: 10,
        }}>
        <Layer
          style={{
            width: 60,
            height: 60,
            borderRadius: 15,
            backgroundColor: getColor({color: 'background.600'}),
          }}>
          <HStack
            justifyContent="flex-end"
            style={{
              position: 'absolute',
              right: 3,
              top: 5,
            }}>
            <Layer
              style={{
                width: 16,
                height: 16,
                borderWidth: 1,
                borderColor: getColor({color: 'primary.400'}),
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'white',
              }}>
              <VoiceIcon width={8} height={8} />
            </Layer>
          </HStack>

          <HStack
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 14,
            }}>
            <User2Icon width={30} height={30} />
          </HStack>
          <HStack>
            <Typography
              style={{marginTop: 20, textAlign: 'center', width: '100%'}}>
              Joe
            </Typography>
          </HStack>
        </Layer>
      </HStack>
      <HStack justifyContent="center" style={{marginTop: 40}}>
        <Pressable>
          <Layer
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: '#FF0101',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <EndCall2Icon />
          </Layer>
        </Pressable>
        <Pressable>
          <Layer
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: getColor({color: 'primary.400'}),
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <OffCameraIcon />
          </Layer>
        </Pressable>
        <Pressable>
          <Layer
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: getColor({color: 'primary.400'}),
            }}>
            <MuteIcon color="primary.400" />
          </Layer>
        </Pressable>
      </HStack>
    </Screen>
  );
}
