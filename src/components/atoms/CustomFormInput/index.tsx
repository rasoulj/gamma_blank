import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {Platform, ViewStyle, StyleSheet} from 'react-native';
import {
  FormControl,
  getColor,
  Input,
  Typography,
  globalBorderRadius,
  EyeIconSet,
  EyeSlashIconSet,
  Divider,
} from '~/components';
import {scale} from '~/components/elemental';

export default React.forwardRef(
  (
    {
      name,
      placeholder,
      type,
      keyboardType,
      label,
      required = false,
      textArea,
      disabled = false,
      style,
      control,
      maxLength,
      showCharCounter,
      securePassword,
      unit,
      onFocus,
      multiline = false,
      onChangeText,
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
      textArea?: boolean;
      icon?: string;
      disabled?: boolean;
      labelColor?: string;
      style?: ViewStyle;
      control?: any;
      maxLength?: number;
      showCharCounter?: boolean;
      securePassword?: boolean;
      unit?: string;
      onFocus?: () => void;
      multiline?: boolean;
      onChangeText?: () => void;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name, control});

    const [showPassword, setShowPassword] = useState(
      securePassword ? false : true,
    );

    return (
      <FormControl
        isInvalid={fieldState.error}
        w={{base: '100%'}}
        style={style}>
        {label && (
          <Typography style={styles.label}>
            {label}
            {unit && (
              <Typography color={'gray.400'} style={styles.unitTypography}>
                {' '}
                {unit}
              </Typography>
            )}
            {required && (
              <Typography color={'error.500'} fontWeight={'500'} fontSize="lg">
                *
              </Typography>
            )}
          </Typography>
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
          multiline={multiline ? multiline : textArea ? true : false}
          value={field?.value?.toString()}
          onChangeText={text => {
            field.onChange(text);
            onChangeText?.();
          }}
          onFocus={onFocus}
          {...(type === 'password' && {
            InputRightElement: !showPassword ? (
              <EyeIconSet
                color={'gray.500'}
                onPress={() => {
                  setShowPassword(true);
                }}
                style={styles.eyeIcon}
              />
            ) : (
              <EyeSlashIconSet
                color={'gray.500'}
                onPress={() => {
                  setShowPassword(false);
                }}
                style={styles.eyeIcon}
              />
            ),
          })}
          selectionColor={getColor('primary.500')}
          backgroundColor={
            disabled ? getColor({color: 'background.500'}) : undefined
          }
          onBlur={field.onBlur}
          multi={textArea}
          maxLength={maxLength}
          paddingTop={textArea ? 2 : 0}
          minHeight={textArea ? 100 : 50}
          maxHeight={multiline ? 80 : textArea ? 100 : 50}
          borderRadius={
            style?.borderRadius > -1
              ? style?.borderRadius
              : textArea
              ? globalBorderRadius.input
              : globalBorderRadius.input
          }
          fontSize={scale(12)}
          zIndex={2}
          borderColor={
            style?.borderColor
              ? style?.borderColor
              : getColor({color: 'gray.400'})
          }
          style={[
            styles.input,
            {
              textAlignVertical: textArea ? 'top' : 'center',
              borderRadius:
                style?.borderRadius > -1
                  ? style?.borderRadius
                  : globalBorderRadius.input,
            },
            Platform.OS === 'ios' && {height: 45},
          ]}
          color={disabled ? getColor({color: 'gray.400'}) : undefined}
          autoCapitalize={'sentences'}
        />
        {showCharCounter && maxLength && (
          <>
            <Typography
              fontSize="xs"
              color={field?.value?.length >= maxLength ? 'red.400' : 'gray.400'}
              position={'absolute'}
              bottom={2.5}
              right={2}>
              {field?.value?.length || 0}/{maxLength}
            </Typography>
            <Divider bottom={2} w="95%" alignSelf={'center'} />
          </>
        )}
        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  eyeIcon: {
    marginRight: 8,
  },

  unitTypography: {
    fontSize: 12,
    fontWeight: '400',
  },

  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
    marginTop: 16,
  },

  input: {
    flex: 1,
    zIndex: 4,
    borderWidth: 1,
    paddingHorizontal: 15,
    opacity: 1,
  },
});
