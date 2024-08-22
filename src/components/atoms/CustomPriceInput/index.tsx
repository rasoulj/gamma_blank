import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { ArrowBackIcon, FormControl, getColor, globalBorderRadius, Input, Layer, scale, Text } from '../../elemental';

export default React.forwardRef(
  (
    {
      name,
      placeholder,
      type,
      keyboardType,
      label,
      required = false,
      color,
      textArea,
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

        <Layer
          style={{
            justifyContent: 'space-between',
          }}>
          <Input
            ref={ref}
            editable={!disabled}
            textAlignVertical={textArea ? 'top' : 'center'}
            placeholder={placeholder}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            keyboardType={'numeric'}
            borderRadius={globalBorderRadius.input}
            multiline={textArea ? true : false}
            value={String(field.value)}
            onChangeText={text => field.onChange(String(text))}
            onBlur={field.onBlur}
            multi={textArea}
            style={[
              {
                flex: 1,
                borderWidth: 0,
                width: 100,
                justifyContent: 'space-between',
                fontSize: scale(12),
                textAlignVertical: textArea ? 'top' : 'center',
                color: color,
              },
            ]}
          />
          <Layer style={{position: 'absolute', right: 20, top: 3}}>
            <ArrowBackIcon
              type="icon"
              width={10}
              parent="Header"
              name="ArrowRightIcon"
              color={"#888"}
              transform={[{rotate: '90deg'}]}
              onPress={() => field.onChange(Number(field.value) + 1)}
            />
            <ArrowBackIcon
              type="icon"
              width={10}
              parent="Header"
              name="ArrowRightIcon"
              color={"#888"}
              transform={[{rotate: '270deg'}]}
              onPress={() =>
                field.value > 0 ? field.onChange(Number(field.value) - 1) : 0
              }
            />
          </Layer>
        </Layer>

        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
