import React, {FC, useState, useEffect} from 'react';

import {getColor} from '../../elemental/helper';
import {useController} from 'react-hook-form';

import {
  ArrowDownIconSet,
  Typography,
  globalBorderRadius,
  scale,
  FormControl,
} from '../../elemental';

import {getTextColor} from '~/theme';
import {Dropdown as DropDownPicker} from 'react-native-element-dropdown';
import {TextStyle, ViewStyle} from 'react-native';
interface Props {
  data: Array<{label: string; value: string}>;
  name: string;
  defaultValue?: {label: string; value: string};
  placeholder?: string;
  control?: any;
  style?: ViewStyle;
  onChangeValue?: (value: string) => void;
  label?: any;
  labelStyle?: TextStyle;
  required?: boolean;
}

const Dropdown: FC<Props> = ({
  data,
  name,
  defaultValue,
  placeholder,
  style,
  control,
  label,
  labelStyle,
  required,
  ...props
}) => {
  const {field} = useController({name, control});

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
      field?.onChange({value: defaultValue});
    }
  }, [defaultValue]);

  const onItemPress = (item: any): void => {
    setSelected(item);
    field?.onChange({value: item?.value});
    props?.onChangeValue?.(item?.value);
  };

  return (
    <>
      {label && (
        <Typography
          style={{
            fontSize: scale(14),
            marginVertical: 8,
            fontWeight: '500',
            marginTop: 16,
            ...labelStyle,
          }}>
          {label}
          {required && (
            <Typography
              color={'error.500'}
              style={{fontSize: 18, fontWeight: '500'}}>
              {'*'}
            </Typography>
          )}
        </Typography>
      )}
      <DropDownPicker
        placeholder={
          data?.length !== 0
            ? selected?.label || placeholder
            : placeholder || 'There is no data to select'
        }
        data={data}
        activeColor={getColor({color: 'background.500'})}
        style={{
          borderWidth: 1,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: globalBorderRadius?.input,
          width: '100%',
          backgroundColor: getColor({color: 'background.500'}),
          borderColor: getColor({
            color: 'gray.400',
          }),
          height: 51,
          ...(style as object),
        }}
        maxHeight={300}
        labelField="label"
        valueField="value"
        onChange={onItemPress}
        placeholderStyle={{
          color: selected
            ? getTextColor(getColor({color: 'background.500'}))
            : getTextColor(getColor({color: 'background.500'})) + '80',
        }}
        selectedTextStyle={{
          color: getTextColor(getColor({color: 'background.500'})),
        }}
        renderRightIcon={() => (
          <ArrowDownIconSet color={getColor({color: 'gray.400'})} />
        )}
        itemContainerStyle={{
          borderRadius: globalBorderRadius?.input,
        }}
        itemTextStyle={{
          color: getTextColor(getColor({color: 'background.500'})),
        }}
        disable={data?.length === 0}
        containerStyle={{
          backgroundColor: getColor({color: 'background.500'}),
          borderRadius: 15,
          paddingVertical: 4,
        }}
        dropdownPosition="auto"
        selectedTextProps={{numberOfLines: 1}}
        value={selected?.value || field?.value?.value}
        {...props}
      />
    </>
  );
};

export default Dropdown;
