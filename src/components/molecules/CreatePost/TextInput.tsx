import React, {useEffect, useState} from 'react';
import {useController} from 'react-hook-form';
import {Platform} from 'react-native';
import {FormControl, getColor} from '../../elemental';
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
    useEffect(() => {
      if (type === 'password') {
        setShowPassword(false);
      } else {
        setShowPassword(true);
      }
    }, [type]);

    return (
      <FormControl w={{base: '100%'}}>
        {label && (
          <Text
            style={{
              fontSize: scale(14),
              marginVertical: 10,
              fontWeight: '500',
            }}>
            {label}
            {/* {required && <Text>{'   *'}</Text>} */}
          </Text>
        )}

        <Input
          ref={ref}
          editable={!disabled}
          numberOfLines={textArea ? 4 : 1}
          textAlignVertical={textArea ? 'top' : 'center'}
          placeholder={placeholder}
          placeholderTextColor={getColor({color: 'gray.500'})}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          keyboardType={keyboardType}
          multiline={textArea ? true : false}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
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

        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
