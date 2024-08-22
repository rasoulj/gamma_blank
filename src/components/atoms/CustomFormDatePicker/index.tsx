import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useController} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {
  Button,
  scale,
  VStack,
  Center,
  Text,
  HStack,
  ArrowDownIcon,
  globalBorderRadius,
} from '~/components/elemental';

export default React.forwardRef(
  (
    {
      name,
      type,
      label,
      defaultValue,
      style,
      hasArrow = true,
      my = '2',
      onChange,
      maxValue,
      minValue,
      displayDjsFormat,
    }: {
      name: any;
      type: 'date' | 'time';
      label?: string;
      defaultValue: string | number;
      style?: any;
      hasArrow?: boolean;
      my?: string | number;
      onChange?: any;
      maxValue?: Date;
      minValue?: Date;
      displayDjsFormat?: string;
    },
    ref: any,
  ) => {
    const {field} = useController({name});
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      !field?.value && field.onChange(new Date());
    }, [name]);
    useEffect(() => {
      if (maxValue && field?.value > maxValue) field.onChange(maxValue);
      if (minValue && field?.value < minValue) field.onChange(minValue);
    }, [maxValue, minValue]);
    const onDateChange = (dateTemp: any) => {
      onChange?.(dateTemp);
      try {
        field.onChange(dateTemp);
      } catch (e) {
        console.log(e);
      }
    };

    const submit = () => {
      setIsVisible(false);
    };

    return (
      <>
        <VStack space="2" my={my} width="100%">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsVisible(true)}>
            <VStack space="2">
              {label && (
                <Text
                  ref={ref}
                  style={{
                    fontSize: scale(14),
                    fontWeight: '500',
                  }}>
                  {label}
                </Text>
              )}
              <HStack
                borderWidth="0.5"
                borderRadius={globalBorderRadius?.input}
                borderColor="gray.500"
                justifyContent="space-between"
                alignItems="center"
                px="4"
                style={style}
                height={scale(40)}>
                <Text color="gray.700">
                  {displayDjsFormat
                    ? dayjs(field?.value).format(displayDjsFormat)
                    : dayjs(Date.now()).diff(field?.value, 'year') ??
                      defaultValue}
                </Text>
                {hasArrow && <ArrowDownIcon />}
              </HStack>
            </VStack>
          </TouchableOpacity>
        </VStack>

        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
          <Center flex={1}>
            <VStack
              bg="white"
              space="5"
              justifyContent="center"
              py="5"
              borderRadius={globalBorderRadius?.button}
              w="100%"
              alignItems="center">
              <DatePicker
                date={field.value}
                mode={type === 'date' ? 'date' : 'time'}
                onDateChange={onDateChange}
                minimumDate={minValue}
                maximumDate={maxValue}
              />

              <Button style={{width: '50%'}} onPress={submit}>
                <Text color="white">Submit</Text>
              </Button>
            </VStack>
          </Center>
        </Modal>
      </>
    );
  },
);
