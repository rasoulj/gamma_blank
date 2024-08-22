import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {TouchableOpacity, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {
  Button,
  Center,
  FormControl,
  globalBorderRadius,
  scale,
  Text,
  Typography,
  VStack,
} from '~/components/elemental';

export default React.forwardRef(
  (
    {
      name,
      type,
      title,
      dateFormat,
      defaultValue,
      borderRadius,
      width,
      disabled = false,
      label,
      required,
      style,
      minimumDate
    }: {
      name: any;
      type: 'date' | 'time';
      title?: any;
      dateFormat?: string;
      defaultValue?: any;
      borderRadius?: string | number;
      width?: string | number;
      disabled?: boolean;
      label?: string;
      required?: boolean;
      style?: ViewStyle;
      minimumDate?: any
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [isVisible, setIsVisible] = useState(false);
    const dateRef = useRef(new Date());
    useEffect(() => {
      field.onChange(defaultValue);
    }, [defaultValue]);

    const onDateChange = (dateTemp: any) => {
      dateRef.current = dateTemp;
    };

    const submit = () => {
      field.onChange(dateRef.current);
      setIsVisible(false);
    };
    return (
      <FormControl
        isInvalid={fieldState.error}
        w={{base: '100%'}}
        style={{...style}}>
        {label && (
          <Typography
            style={{
              fontSize: scale(14),
              marginVertical: 10,
              fontWeight: '500',
              marginTop: 16,
            }}>
            {label}
            {required && (
              <Typography color={"error.500"} style={{fontSize: 18, fontWeight: '500'}}>
                {'*'}
              </Typography>
            )}
          </Typography>
        )}
        <VStack
          space="2"
          width={width ? width : type === 'date' ? '100%' : '48%'}>
          <TouchableOpacity
            activeOpacity={0.9}
            disabled={disabled}
            onPress={() => setIsVisible(true)}>
            <VStack space="2">
              {title && (
                <Text
                  ref={ref}
                  style={{
                    fontSize: scale(14),
                    fontWeight: '500',
                  }}>
                  {title}
                </Text>
              )}
              <Center
                borderWidth="0.5"
                borderRadius={borderRadius ?? globalBorderRadius.input}
                borderColor="gray.500"
                style={{alignItems: 'flex-start', paddingHorizontal: 20}}
                height={scale(40)}>
                <Text>
                  {type === 'date'
                    ? dayjs(field?.value).format(dateFormat ?? 'DD MMM, YYYY')
                    : dayjs(field?.value).format('HH:mm')}
                </Text>
              </Center>
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
              borderRadius={globalBorderRadius.button}
              w="100%"
              alignItems="center">
              <DatePicker
                date={field.value ?? new Date()}
                mode={type === 'date' ? 'date' : 'time'}
                textColor='#222'
                minimumDate={minimumDate || null}
                onDateChange={onDateChange}
              />
              <Button style={{width: '50%'}} onPress={submit}>
                <Text color="white">Submit</Text>
              </Button>
            </VStack>
          </Center>
        </Modal>
        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
