import React, {useState} from 'react';
import {get, useController, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ColorPicker} from 'react-native-color-picker';
import Modal from 'react-native-modal';
import ModalContainer from '~/components/atoms/ModalContainer';
import theme, {getTextColor} from '~/theme';
import {
  Center,
  CloseIcon,
  FormControl,
  HStack,
  scale,
  Text,
  verticalScale,
  View,
  Layer,
  Select,
  Button,
  getColor,
  Typography,
  DropDown,
  CustomFormInput,
  Input,
} from '../../elemental';
import CustomActionSheet from '../CustomActionSheet';

export default React.forwardRef(
  (
    {
      name,
      label,
      required = false,
    }: {
      name: any;
      label?: string;
      required?: boolean;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [color, setColor] = useState('');
    const [colorText, setColorText] = useState('');
    const [colorData, setColorData] = useState([
      {label: 'Red', value: 'red'},
      {label: 'Green', value: 'green'},
      {label: 'Yellow', value: 'yellow'},
      {label: 'Blue', value: 'blue'},
      {label: 'Gold', value: 'Gold'},
    ]);

    const {control} = useForm();
    const toggleModal = () => {
      setIsVisible(true);
    };

    const removeItem = i => {
      const remainingArr = field.value.filter((element, index) => index != i);

      field.onChange(remainingArr);
    };

    const addColor = () => {
      setColorData([...colorData, {label: colorText, value: colorText}]);
      setIsVisibleModal(false);
      setIsVisible(true)
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        {label && (
          <Text
            ref={ref}
            style={{
              fontSize: scale(14),
              marginVertical: 10,
              fontWeight: '500',
            }}>
            {label}

            {required && <Text>{'   *'}</Text>}
          </Text>
        )}
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography
            style={{
              fontSize: scale(14),
              fontWeight: '500',
            }}>
            Colors
          </Typography>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Typography style={{color: getColor({color: 'secondary.500'})}}>
              + Add new
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.flexWrap}>
          {field?.value?.map((element: string, elementIndex: number) => {
            return (
              <HStack
                key={elementIndex}
                alignItems="center"
                justifyContent="center"
                bg={getColor({color: 'gray.50'})}
                space="2"
                mr="2"
                py={'3'}
                mb="4"
                px="6"
                borderRadius={'3xl'}>
                <TouchableOpacity
                  onPress={() => removeItem?.(elementIndex)}
                  activeOpacity={0.7}>
                  <CloseIcon
                    width={12}
                    color={getColor({color: 'primary.400'})}
                  />
                </TouchableOpacity>
                <Typography
                  style={{
                    fontWeight: '700',
                    fontSize: 17,
                    textTransform: 'capitalize',
                  }}
                  color={getColor({color: 'primary.400'})}>
                  {element.value}
                </Typography>
              </HStack>
            );
          })}
        </View>
        <ModalContainer
          title="Add color"
          isVisible={isVisibleModal}
          backgroundColor={getColor({color: 'background.500'})}
          onClose={() => setIsVisibleModal(false)}>
          <Input
            onChangeText={setColorText}
            style={{width: '100%', marginTop: 15}}
          />
          <Layer
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <Button
              onPress={() => setIsVisibleModal(false)}
              style={{flex: 1, marginRight: 10}}
              variant="outline">
              Cancel
            </Button>
            <Button onPress={() => addColor()} style={{flex: 1}}>
              Save
            </Button>
          </Layer>
        </ModalContainer>
        <CustomActionSheet
          isVisible={isVisible}
          backgroundColor={getColor({color: 'background.500'})}
          onClose={() => setIsVisible(false)}>
          <Layer style={{margin: 20, zIndex: 3}}>
            <DropDown
              name={name}
              data={colorData}
              onChangeValue={color => setColor(color)}
              label={label}
              control={control}
            />
            <TouchableOpacity
              onPress={() => [setIsVisible(false), setIsVisibleModal(true)]}
              style={{marginTop: 10}}>
              <Typography style={{color: getColor({color: 'secondary.500'})}}>
                + Add color
              </Typography>
            </TouchableOpacity>
            <Layer
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Button
                variant="outline"
                style={{
                  flex: 1,
                  marginRight: 10,
                  borderWidth: 2,
                  borderColor: getColor({color: 'primary.400'}),
                  backgroundColor: getColor({color: 'background.500'}),
                  marginTop: 20,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => setIsVisible(false)}>
                <Typography
                  color={getColor({color: 'primary.400'})}
                  fontWeight={'700'}>
                  Cancel
                </Typography>
              </Button>
              <Button
                disabled={!color}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  marginTop: 20,
                  borderWidth: 2,
                  borderColor: color
                    ? getColor({color: 'primary.500'})
                    : getColor({color: 'gray.500'}),
                  backgroundColor: color
                    ? getColor({color: 'primary.500'})
                    : getColor({color: 'gray.500'}),
                }}
                onPress={() => {
                  let remainingArr = field.value.filter(
                    (element, index) => element?.value != color,
                  );
                  remainingArr?.push({
                    key: 'colors',
                    value: color,
                    sectionId: 7,
                    itemId: 0,
                  });
                  field.onChange(remainingArr);
                  setIsVisible(false)
                }}>
                Save
              </Button>
            </Layer>
          </Layer>
        </CustomActionSheet>

        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
});
