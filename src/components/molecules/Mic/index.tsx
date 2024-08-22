import React, {useState} from 'react';
import {VStack, Center, View, useSpeech, Typography} from '../../elemental';

import Microphone from './Microphone';
import Timer from './Timer';
import {Pressable, LayoutAnimation} from 'react-native';

function Mic() {
  const {isRecording, startRecording, stopRecording} = useSpeech();
  return (
    <VStack flex={1} alignItems={'center'} justifyContent={'space-between'}>
      <View />
      <VStack alignItems={'center'} width={'100%'}>
        <Microphone isRecording={isRecording} />
        <Timer reset={!isRecording} />
      </VStack>
      <Pressable
        onPress={() => {
          isRecording ? stopRecording() : startRecording();
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}>
        {isRecording ? (
          <Center
            width={12}
            height={12}
            borderWidth={1}
            borderColor={'primary.500'}
            borderRadius={'full'}>
            <View width={4} height={4} backgroundColor={'primary.500'} />
          </Center>
        ) : (
          <Center
            width={12}
            height={12}
            borderWidth={1}
            borderColor={'primary.500'}
            borderRadius={'full'}>
            <View
              width={5}
              height={5}
              backgroundColor={'red.500'}
              borderRadius={'full'}
            />
          </Center>
        )}
      </Pressable>
    </VStack>
  );
}

export default Mic;
