import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Center, VStack} from 'native-base';
import {WithLocalSvg} from 'react-native-svg';
import {Typography, scale} from '~/components';

export default function EmptyData({
  text = 'No results',
  description,
  flex = 1,
  svg,
}: {
  text?: string;
  description?: string;
  flex?: number;
  svg?: any;
}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack p="24px" space="24px" justifyContent="center" flex={flex}>
        {svg && (
          <Center>
            <WithLocalSvg asset={svg} width={scale(120)} height={scale(120)} />
          </Center>
        )}
        <VStack space="1" justifyContent="center">
          <Typography
            textAlign="center"
            // lineHeight="xl"
          >
            {text}
          </Typography>
          {description && (
            <Typography
              textAlign="center"
              // lineHeight="xl"
            >
              {description}
            </Typography>
          )}
        </VStack>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
