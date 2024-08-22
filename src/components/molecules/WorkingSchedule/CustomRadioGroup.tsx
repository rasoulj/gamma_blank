import React from 'react';
import {HStack, Box, VStack, FormControl} from 'native-base';
import {useController} from 'react-hook-form';
import {RadioButton, Typography} from '~/components';
import {FlatList} from 'react-native';
import {deviceWidth, scale} from '../../elemental';
interface Props {
  data: Array<{label: string; value: string; extraComponent?: JSX.Element}>;
  name: string;
  label?: string;
  onChangeValue?: (item: any) => void;
  height?: number | string;
}
export default React.forwardRef(
  ({name, data, label, onChangeValue, height = scale(50)}: Props, ref: any) => {
    const {field, fieldState} = useController({name});
    const onChange = async (item: any) => {
      field.onChange(item?.value);
      onChangeValue?.(item);
    };
    const renderItem = ({item, index}: {item: any; index: number}) => {
      const isChecked = field?.value === item?.value;
      return (
        <HStack alignItems="center" height={height} overflow="hidden">
          <RadioButton
            checked={isChecked}
            label={item?.label}
            width={deviceWidth * 0.4}
            onPress={() => {
              onChange(item);
            }}
          />
          {item?.extraComponent && item?.extraComponent}
        </HStack>
      );
    };
    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <VStack space="2">
          {label && <Typography>{label}</Typography>}
          <VStack
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            w="100%">
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item?.value}_${index}`}
            />
          </VStack>
        </VStack>
        <FormControl.ErrorMessage mt="0">
          {fieldState?.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
