import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useController} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import styles from './styles';

import {
  Button,
  scale,
  VStack,
  Center,
  Text,
  Input,
  getColor,
  isDark,
  Typography,
  Layer,
} from '~/components/elemental';

export default React.forwardRef(
  (
    {
      name,
      type,
      title,
      date,
      setDate,
    }: {
      name: any;
      type: 'date' | 'time';
      title: any;
      date: any;
      setDate: any;
    },
    ref: any,
  ) => {
    // const {field} = useController({name});
    const [isVisible, setIsVisible] = useState(false);
    const [isSelected, setSelected] = useState(false);
    // useEffect(() => {
    //   field.onChange(new Date());
    // }, [name]);

    const onDateChange = (dateTemp: any) => {
      setDate(dateTemp);
    };

    const submit = () => {
      setIsVisible(false);
    };

    return (
      <>
        <VStack
          space="2"
          style={
            {
              // marginBottom: 10,
            }
          }>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setIsVisible(true), setSelected(true);
            }}>
            <VStack space="2">
              <Layer>
                <Typography
                  ref={ref}
                  style={{
                    fontSize: scale(14),
                    fontWeight: 'normal',
                  }}>
                  Expiry Date
                </Typography>
              </Layer>
              <Center
                borderWidth="0.5"
                borderRadius="full"
                borderColor="gray.400"
                style={{
                  alignItems: 'flex-start',
                  paddingHorizontal: 20,
                }}
                height={scale(45)}>
                <Text
                  color="gray.700"
                  style={{
                    fontSize: 16,
                    color: isSelected
                      ? isDark
                        ? getColor({color: 'gray.100'})
                        : getColor({color: 'gray.900'})
                      : getColor({color: 'gray.500'}),
                  }}>
                  {dayjs(date).format('MM/YY')}
                </Text>
              </Center>
            </VStack>
          </TouchableOpacity>
        </VStack>

        <Modal
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false), setSelected(true);
          }}>
          <Center flex={1}>
            <VStack
              bg="white"
              space="5"
              justifyContent="center"
              py="5"
              borderRadius="2xl"
              w="100%"
              alignItems="center">
              <DatePicker
                date={date}
                mode={type === 'date' ? 'date' : 'time'}
                onDateChange={onDateChange}
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
