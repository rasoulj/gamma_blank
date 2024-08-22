import React from 'react';
import {DatingSetupInputProp, IDatingInputOption} from '../../types';
import {FormControl, HStack, Pressable} from 'native-base';
import {Typography, VStack} from '~/components';
import {Label} from './label';
import {Controller} from 'react-hook-form';

function SelectOption({
  option,
  onPress,
  selected,
}: {
  option: IDatingInputOption;
  onPress?: VoidFunction;
  selected?: boolean;
}): JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <VStack
        marginRight={2}
        marginBottom={2}
        borderColor={selected ? 'primary.500' : 'gray.300'}
        borderRadius={3}
        borderWidth={1}
        paddingX={6}
        paddingY={2}
        backgroundColor={selected ? 'primary.100' : 'gray.50'}>
        <Typography color={'gray.800'} fontWeight={'500'} fontSize="sm">
          {option?.title ?? option}
        </Typography>
      </VStack>
    </Pressable>
  );
}

export function DatingMultiSelectInput({
  config,
  style,
  control,
  errors,
}: DatingSetupInputProp): JSX.Element {
  const {name, rules} = config;

  return (
    <VStack style={style}>
      <FormControl isRequired={!!rules} isInvalid={name in errors}>
        <Label>{config.title}</Label>
        <Controller
          defaultValue={180}
          name={name}
          rules={rules}
          control={control}
          render={({field: {value, onChange}}) => {
            return (
              <VStack flexWrap={'wrap'}>
                {config.options.map(option => {
                  return (
                    <VStack>
                      <Label>{option.title}</Label>
                      <HStack>
                        {option?.options?.map(item => {
                          console.log({item});
                          const selected = (value ?? []).includes(item);
                          return (
                            <SelectOption
                              onPress={() => {
                                if (selected) {
                                  const index = value.indexOf(item);
                                  if (index >= 0) {
                                    value.splice(index, 1);
                                    onChange(value);
                                  }
                                } else {
                                  onChange([...(value ?? []), item]);
                                }
                              }}
                              selected={selected}
                              option={item}
                              key={item}
                            />
                          );
                        })}
                      </HStack>
                    </VStack>
                  );
                })}
              </VStack>
            );
          }}
        />

        <FormControl.ErrorMessage>
          {errors[name]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
}
