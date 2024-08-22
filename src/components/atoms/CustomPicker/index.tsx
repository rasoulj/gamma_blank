import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from 'react-native';
import {
  FormControl,
  HStack,
  Box,
  Divider,
  VStack,
  Text,
  FlatList,
} from 'native-base';

import {useController} from 'react-hook-form';
import Typography from '../Typography';
import {getColor} from '~/utils/helper/theme.methods';
import {ArrowDownIconSet, ArrowUpIconSet} from '~/assets/iconset';

interface dropDownPositionType {
  top: number | undefined;
  bottom: number | undefined;
}

export default React.forwardRef(
  (
    {
      name,
      data,
      label,
      title,
      placeholder,
      required,
      height = '7',
      width,
      right,
      left,
      position,
      maxHeight = 300,
      textStyle = styles.title,
      textColor = getColor({colors: 'gray.800'}),
      formState,
      validation = false,
      valueKey = 'value',
      titleKey = 'title',
      isHorizontal,
      disabled,
      ...props
    }: {
      name: any;
      data: any;
      label?: string;
      title?: string;
      required?: boolean;
      placeholder?: string;
      height?: number | string;
      position?:
        | 'absolute'
        | 'relative'
        | '-moz-initial'
        | '-webkit-sticky'
        | 'fixed'
        | 'inherit'
        | 'revert'
        | 'revert-layer'
        | 'static'
        | 'sticky'
        | 'unset';
      width?: number;
      right?: number | string;
      left?: number | string;
      maxHeight?: number;
      textStyle?: any;
      textColor?: any;
      formState?: any;
      validation?: boolean;
      valueKey?: string;
      titleKey?: string;
      isHorizontal?: boolean;
      disabled?: boolean;
    },
    ref: any,
  ) => {
    const DropdownButton = useRef();
    const {height: screenHeight} = useWindowDimensions();
    const {field, fieldState} = useController({name});

    const isDirty = formState?.isDirty;

    const [visible, setVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] =
      useState<dropDownPositionType>({
        top: undefined,
        bottom: undefined,
      });

    const onPressHandler = () => {
      visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
      DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
        if (screenHeight - (py + h) > maxHeight) {
          setDropdownPosition({
            top: py + 8 + h,
            bottom: undefined,
          });
        } else if (py > maxHeight) {
          setDropdownPosition({
            top: undefined,
            bottom: screenHeight - py + 30 - h / 2,
          });
        } else {
          setDropdownPosition({
            top: 0,
            bottom: undefined,
          });
        }
      });
      setVisible(true);
    };

    const getName = (value: string) => {
      const item = data.find(
        (element: any) => element?.[valueKey]?.toString() === value?.toString(),
      );
      return item?.[titleKey];
    };

    const itemOnPress = (item: any) => {
      setVisible(false);
      field.onChange?.(item?.[valueKey]);
      props?.onChangeValue?.(item?.value);
    };

    const borderColor = field.value?.toString()
      ? getColor({color: 'primary.500'})
      : fieldState.error
      ? getColor({color: 'error.500'})
      : !validation
      ? getColor({color: 'gray.400'})
      : isDirty
      ? getColor({color: 'primary.500'})
      : getColor({color: 'primary.500'});

    const renderItem = ({item, index}: {item: any; index: number}) => {
      const isEnable = item?.[valueKey]?.toString() === field.value?.toString();
      return (
        <Box key={index + 1} borderRadius={10}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => itemOnPress(item)}>
            <VStack px="4" py="3">
              {item?.[titleKey] && (
                <Text
                  style={textStyle}
                  color={
                    isEnable
                      ? getColor({color: 'primary.500'})
                      : getColor({color: 'gray.800'})
                  }>
                  {item?.[titleKey]}
                </Text>
              )}
            </VStack>
          </TouchableOpacity>
          {index + 1 < data?.length && (
            <Divider bg={getColor({color: 'gray.400'})} />
          )}
        </Box>
      );
    };

    return (
      <FormControl
        isInvalid={fieldState.error}
        w={{base: '100%'}}
        mb={isHorizontal ? 4 : undefined}>
        <Box>
          {title && (
            <Typography
              fontSize="md"
              fontWeight={'500'}
              color={'gray.800'}
              mb={'1'}
              mt={'4'}>
              {title}
              {required && (
                <Typography color={'error.500'} style={styles.star}>
                  *
                </Typography>
              )}
            </Typography>
          )}
          <TouchableOpacity
            disabled={disabled}
            ref={DropdownButton}
            activeOpacity={0.9}
            onPress={onPressHandler}>
            <HStack
              borderRadius="md"
              borderWidth="0.5"
              h={height}
              px="4"
              height={45}
              bg={getColor({color: 'background.500'})}
              alignItems="center"
              borderColor={borderColor}>
              <Text
                flex={1}
                numberOfLines={1}
                color={
                  field.value?.toString()
                    ? textColor
                    : getColor({color: 'gray.400'})
                }
                style={textStyle}>
                {field.value?.toString()
                  ? getName(field.value?.toString())
                  : !visible
                  ? label
                    ? label
                    : placeholder
                  : placeholder}
              </Text>
              {visible ? (
                <ArrowUpIconSet color={getColor({color: 'gray.400'})} />
              ) : (
                <ArrowDownIconSet color={getColor({color: 'gray.400'})} />
              )}
            </HStack>
          </TouchableOpacity>
        </Box>
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}>
            <Box
              top={dropdownPosition?.top}
              bottom={dropdownPosition?.bottom}
              maxHeight={maxHeight}
              position="absolute"
              w="100%">
              <VStack
                bg={getColor({color: 'background.500'})}
                w={width}
                right={right}
                left={left}
                position={position}
                mx="4"
                borderRadius="10"
                borderColor={getColor({color: 'gray.400'})}
                borderWidth="1">
                {data?.length > 0 ? (
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => `dropDownItem${index}`}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <Box>
                    <Typography px="2" py="4">
                      No Results
                    </Typography>
                  </Box>
                )}
              </VStack>
            </Box>
          </TouchableOpacity>
        </Modal>
        {fieldState?.error?.message && (
          <FormControl.HelperText type="error">
            {' '}
            {fieldState?.error?.message}
          </FormControl.HelperText>
        )}

        {isHorizontal && !fieldState.error && (
          <FormControl.HelperText fontSize={13} mt="0">
            {''}
          </FormControl.HelperText>
        )}
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 14,
  },

  star: {fontSize: 18, fontWeight: '500'},
});
