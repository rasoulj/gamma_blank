import React, {useEffect, useState} from 'react';
import {useController} from 'react-hook-form';
import {Platform, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '~/theme';
import {CloseIcon, FormControl, HStack, View, verticalScale} from '../../elemental';
import {scale, Input, Text} from '../../elemental';

export default React.forwardRef(
  (
    {
      name,
      placeholder,
      type,
      keyboardType,
      label,
      required = false,
      color = 'black',
      textArea = false,
      icon,
      disabled = false,
    }: {
      name: any;
      placeholder?: string;
      type?: string;
      keyboardType?:
        | 'default'
        | 'email-address'
        | 'numeric'
        | 'phone-pad'
        | 'number-pad'
        | 'decimal-pad'
        | 'visible-password'
        | 'ascii-capable'
        | 'numbers-and-punctuation'
        | 'url'
        | 'name-phone-pad'
        | 'twitter'
        | 'web-search'
        | undefined;
      backgroundColor?: string;
      label?: string;
      required?: boolean;
      color?: string;
      textArea?: boolean;
      icon?: string;
      disabled?: boolean;
      labelColor?: string;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [showPassword, setShowPassword] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
      if (type === 'password') {
        setShowPassword(false);
      } else {
        setShowPassword(true);
      }
    }, [type]);

    const onSubmitEditing = () => {
      let temp = field.value;
      temp.push(text);
      field.onChange(temp);
      setText('');
    };

    console.log('sadsad', field.value);

    const removeItem = i => {
      const remainingArr = field.value.filter((element, index) => index != i);

      field.onChange(remainingArr);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        {label && (
          <Text
            style={{
              fontSize: scale(14),
              marginVertical: 10,
              fontWeight: '500',
            }}>
            {label}
            {required && <Text>{'   *'}</Text>}
          </Text>
        )}

        <Input
          ref={ref}
          editable={!disabled}
          numberOfLines={textArea ? 4 : 1}
          textAlignVertical={textArea ? 'top' : 'center'}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          keyboardType={keyboardType}
          multiline={textArea ? true : false}
          value={text}
          onChangeText={setText}
          onBlur={field.onBlur}
          onSubmitEditing={onSubmitEditing}
          style={[
            {
              flex: 1,
              fontSize: scale(12),
              textAlignVertical: textArea ? 'top' : 'center',
              color: color,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 20,
              paddingHorizontal: 15,
              width: '100%',
            },
            textArea && {
              minHeight: 100,
              marginBottom: 60,
              borderRadius: 30,
              paddingTop: 10,
            },
            Platform.OS === 'ios' && {height: 45},
          ]}
        />

        <View style={styles.flexWrap}>
          {field?.value?.map((element: string, elementIndex: number) => {
            return (
              <HStack
                key={elementIndex}
                alignItems="center"
                justifyContent="center"
                bg={theme.colors.green[200]}
                space="4"
                mr="2"
                py={'3'}
                mb="4"
                px="6"
                borderRadius={'3xl'}>
                <TouchableOpacity
                  onPress={() => removeItem?.(elementIndex)}
                  activeOpacity={0.7}>
                  <CloseIcon color="red" />
                </TouchableOpacity>
                <Text>#{element}</Text>
              </HStack>
            );
          })}
        </View>

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
    paddingBottom: 10,
  },
});
