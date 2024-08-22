import React, {memo} from 'react';
import {HStack, Box, VStack, Circle} from 'native-base';
import {Typography} from '~/components';
import {TouchableOpacity} from 'react-native';
import {scale} from '../../elemental';
const RadioButton = ({
  label,
  checked,
  disabled,
  onPress,
  width,
  selectIcon,
  deSelectIcon,
  checkedColor = 'primary.500',
}: {
  checked: boolean;
  disabled?: boolean;
  label?: string;
  onPress?: () => void;
  width?: any;
  selectIcon?: JSX.Element;
  deSelectIcon?: JSX.Element;
  checkedColor?: string;
}) => {
  return (
    <VStack space="2">
      {checked ? (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.5}
          disabled={disabled}>
          <HStack alignItems="center" space="10px" width={width}>
            {selectIcon ? (
              selectIcon
            ) : (
              <Circle
                alignItems="center"
                justifyContent="center"
                borderColor={checkedColor}
                borderWidth="2"
                width={scale(24)}
                height={scale(24)}
                bg={'white'}>
                <Circle
                  width={scale(12)}
                  height={scale(12)}
                  bg={checkedColor}
                />
              </Circle>
            )}
            {label && <Typography>{label}</Typography>}
          </HStack>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.5}
          disabled={disabled}>
          <HStack alignItems="center" space="10px" width={width}>
            {deSelectIcon ? (
              deSelectIcon
            ) : (
              <Circle
                borderColor="gray.300"
                borderWidth="2"
                width={scale(24)}
                height={scale(24)}
                bg={'white'}
              />
            )}
            {label && <Typography>{label}</Typography>}
          </HStack>
        </TouchableOpacity>
      )}
    </VStack>
  );
};

export default memo(RadioButton);
