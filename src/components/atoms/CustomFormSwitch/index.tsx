import {Animated, StyleSheet, View} from 'react-native';
import React, {forwardRef, useEffect, useState} from 'react';
import {getColor} from '../../elemental/helper';
import {useController} from 'react-hook-form';
import Typography from '../Typography';
import {HStack} from 'native-base';
import {Pressable} from '~/components/elemental';
const defaultStyles = {
  bgGradientColors: getColor({color: 'gray.400'}),
  headGradientColors: getColor({color: 'primary.100'}),
};

const activeStyles = {
  bgGradientColors: getColor({color: 'primary.200'}),
  headGradientColors: getColor({color: 'primary.500'}),
};
const CustomFormSwitch = forwardRef(
  (
    {
      name,
      control,
      onValueChange,
      label,
    }: {
      name: string;
      control?: any;
      onValueChange?: (value: boolean) => void;
      label?: string;
    },
    ref,
  ) => {
    const {field} = useController({name, control});
    const [animatedValue] = useState(new Animated.Value(field.value ? 1 : 0));

    useEffect(() => {
      // Update the animated value when the value prop changes
      Animated.timing(animatedValue, {
        toValue: field.value ? 1 : 0,
        duration: 300, // Adjust the animation duration
        useNativeDriver: false,
      }).start();
    }, [field]);

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20], // Adjust the distance of the switch head
    });

    const toggleSwitch = () => {
      const newValue = !field.value;
      field.onChange(newValue);
      onValueChange?.(newValue);
    };
    const currentStyles = field?.value ? activeStyles : defaultStyles;
    return (
      <HStack
        justifyContent={label ? 'space-between' : undefined}
        alignItems="center">
        {label && (
          <Typography fontWeight="500" fontSize="md">
            {label}
          </Typography>
        )}
        <Pressable onPress={toggleSwitch} style={styles.pressable}>
          <View
            style={[
              styles.innerContainer,
              {backgroundColor: currentStyles.bgGradientColors},
            ]}>
            <Animated.View
              style={{
                transform: [{translateX}],
              }}>
              <View
                style={[
                  styles.headGradient,
                  {backgroundColor: currentStyles.headGradientColors},
                ]}
              />
            </Animated.View>
          </View>
        </Pressable>
      </HStack>
    );
  },
);

export default CustomFormSwitch;

const styles = StyleSheet.create({
  pressable: {
    width: 40,
    height: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'red',
    width: 40,
    borderRadius: 31,
    height: 14,
  },
  headGradient: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
