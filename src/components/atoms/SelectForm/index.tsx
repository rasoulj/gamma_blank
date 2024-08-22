import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  ISelectProps,
  Actionsheet,
  FlatList,
  Divider,
  Text,
  HStack,
  Center,
} from 'native-base';

import {useController} from 'react-hook-form';
import {TickIcon, ChevronDown} from '~/assets';
import theme from '~/theme';
import {getColor} from '../../elemental/helper';
const borderColor = theme?.components?.Select?.borderColor?.default;
const borderWidth = theme?.components?.Select?.borderWidths?.default;
const backgroundColor = theme?.components?.Select?.colorScheme?.default;
const borderRadius = theme?.components?.Select?.borderRadius?.default;
const color = theme?.components?.Select?.color?.default;
const SelectForm = React.forwardRef(
  (
    {
      name,
      options,
      placeholder,
      multiple,
    }: {
      name: any;
      options: any;
      placeholder: string;
      multiple: 'true' | 'false';
    },
    ref: any,
  ) => {
    const [items, setItems] = useState([]);
    const {field, fieldState} = useController({name});

    const [visible, setVisible] = useState(false);
    console.log(multiple);
    const openModal = () => {
      setVisible(true);
    };

    const itemOnPress = (item: any) => {
      if (multiple === 'true') {
        setItems(prev => {
          const index = prev?.findIndex(i => i.value === item?.value);
          if (index !== -1) {
            prev.splice(index, 1);
            return [...prev];
          } else {
            return [...prev, item];
          }
        });
      } else {
        setItems([item]);
        setVisible(false);
      }
    };

    useEffect(() => {
      if (multiple === 'true' && !visible) {
        const getValues = items?.map(item => {
          return item.value;
        });
        field.onChange(getValues);
      } else if ((multiple === 'false' || multiple === undefined) && !visible) {
        field.onChange(items?.[0]);
      }
    }, [visible]);

    const onClose = () => {
      setVisible(false);
    };

    const itemSeparatorComponent = () => <Divider my="8px" />;

    const renderItem = ({item}: {item: any}) => {
      const isActive = items.findIndex(i => i?.value === item?.value) !== -1;

      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => itemOnPress(item)}>
          <HStack
            bgColor={backgroundColor}
            px="8px"
            alignItems="center"
            w="100%">
            <Text color={color} fontSize="15px" flex={1}>
              {item?.label}
            </Text>
            <Center
              width={8}
              height={8}
              borderWidth="1px"
              borderColor={isActive ? '#006194' : '#D8D8D8'}
              rounded="full">
              {isActive && <TickIcon color={color} width={18} height={18} />}
            </Center>
          </HStack>
        </TouchableOpacity>
      );
    };

    return (
      <>
        <TouchableOpacity activeOpacity={0.7} onPress={openModal}>
          <HStack
            borderRadius={borderRadius}
            borderColor={getColor({color: borderColor || 'gray.400'})}
            borderWidth={borderWidth}
            height={12}
            mt={3}
            w="100%"
            px="2"
            py="2"
            space="2"
            justifyContent="space-between"
            alignItems="center"
            bg={backgroundColor}>
            {field?.value?.label ? (
              <Text flex={1} fontSize="14px" color={getColor({color: color})}>
                {field?.value?.label}
              </Text>
            ) : (
              <Text
                flex={1}
                fontSize="14px"
                style={{paddingLeft: 8}}
                color={getColor({color: color || 'gray.400'})}>
                {placeholder}
              </Text>
            )}

            <ChevronDown color={getColor({color: color || 'gray.400'})} />
          </HStack>
        </TouchableOpacity>
        <Actionsheet isOpen={visible} onClose={onClose}>
          <Actionsheet.Content bg={backgroundColor}>
            <FlatList
              w="100%"
              data={options ?? []}
              keyExtractor={(_, idx) => `key${idx}`}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={itemSeparatorComponent}
              renderItem={renderItem}
            />
          </Actionsheet.Content>
        </Actionsheet>
      </>
    );
  },
);

// const Item = function (props: ISelectItemProps) {
//   return <Dropdown.Item {...props} />;
// };

//const SelectItem = withMeasure<ISelectItemProps>(Item);
//export {SelectItem};
export default SelectForm;
