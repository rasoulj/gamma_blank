import {VStack, HStack, Circle, FormControl} from 'native-base';
import {scale} from 'react-native-size-matters';
import {HeartIcon} from '~/assets';
import {RadioButton, Typography} from '~/components';
import {DatingSetupInputProp, IDatingInputOption} from '../../types';
import {Label} from './label';
import {Controller} from 'react-hook-form';
import {Pressable} from 'react-native';
import * as Element from '~/components/elemental';

export function DatingSelectInput({
  config,
  control,
  errors,
  style,
}: DatingSetupInputProp): JSX.Element {
  const {title, options, name, rules} = config;

  return (
    <VStack style={style}>
      <FormControl isRequired={!!rules} isInvalid={name in errors}>
        <Label>{title}</Label>
        <Controller
          rules={rules}
          name={name}
          control={control}
          render={p => (
            <>
              {options.map(option => (
                <SelectOption
                  onPress={() => p.field.onChange(option.value)}
                  selected={p.field.value === option.value}
                  key={option.value}
                  option={option}
                />
              ))}
            </>
          )}
        />

        <FormControl.ErrorMessage>
          {errors[name]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
}

const DeSelectIcon = () => (
  <Circle
    borderColor="gray.300"
    borderWidth="2"
    width={scale(24)}
    height={scale(24)}
    bg={'white'}
  />
);

function SelectOption({
  option,
  selected,
  onPress,
}: {
  option: IDatingInputOption;
  selected: boolean;
  onPress: VoidFunction;
}): JSX.Element {
  const MyIcon = Element[option?.icon ?? 'HeartIcon'];

  return (
    <Pressable onPress={onPress}>
      <HStack
        borderWidth={1}
        marginY={3}
        padding={5}
        borderRadius={4}
        backgroundColor={selected ? 'primary.100' : 'gray.50'}
        borderColor={selected ? 'primary.500' : 'gray.300'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <VStack flex={1}>
          <MyIcon />
        </VStack>

        <VStack flex={10} marginLeft={2}>
          <Typography fontSize="xl" fontWeight={'500'}>
            {option.title}
          </Typography>
          {!!option.subtitle && (
            <Typography fontWeight={'100'}>{option.subtitle}</Typography>
          )}
        </VStack>

        <VStack flex={1}>
          <RadioButton
            checked={selected}
            deSelectIcon={
              <Pressable onPress={onPress}>
                <DeSelectIcon />
              </Pressable>
            }
          />
        </VStack>
      </HStack>
    </Pressable>
  );
}
