// import {Actionsheet, HStack, Text} from 'native-base';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ChevronDown} from '~/assets';
import {Actionsheet, HStack, Text} from '~/components/elemental';
import theme from '~/theme';

const backgroundColor = theme?.components?.Select?.colorScheme?.default;
const color = theme?.components?.Select?.color?.default;
const borderRadius = theme?.components?.Select?.borderRadius?.default;
const borderColor = theme?.components?.Select?.borderColor?.default;
const borderWidth = theme?.components?.Select?.borderWidths?.default;

const SelectDate = React.forwardRef(
  ({name, placeholder}: {name: any; placeholder: string}, props: any) => {
    const {field, fieldState} = useController({name});
    const [date, setDate] = useState(new Date());
    const [visible, setVisible] = useState(false);

    const openModal = () => {
      setVisible(true);
    };

    const onDateChange = (dateTemp: any) => {
      field.onChange(dateTemp);
      setDate(dateTemp);
    };

    const onClose = () => {
      setVisible(false);
    };

    return (
      <>
        <TouchableOpacity activeOpacity={0.7} onPress={openModal}>
          <HStack
            borderRadius={borderRadius}
            borderColor={borderColor}
            borderWidth={borderWidth}
            height={9}
            w="100%"
            px="2"
            py="2"
            space="2"
            justifyContent="space-between"
            alignItems="center"
            bg={backgroundColor}>
            <Text flex={1} fontSize="14px" color={color}>
              {dayjs(field?.value).format('YYYY-MM-DD') ?? placeholder}
            </Text>
            <ChevronDown color={color} />
          </HStack>
        </TouchableOpacity>

        <Actionsheet isOpen={visible} onClose={onClose}>
          <Actionsheet.Content bg="#FFFFFF">
            <DatePicker date={date} mode="date" onDateChange={onDateChange} />
          </Actionsheet.Content>
        </Actionsheet>
      </>
    );
  },
);

export default SelectDate;
