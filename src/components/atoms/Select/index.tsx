import React from 'react';
import {Select as Dropdown, ISelectProps, ISelectItemProps} from 'native-base';
import {getColor, globalValiables} from '~/components/elemental';
import {getTextColor} from '~/theme';
import {StyleProp, ViewStyle} from 'react-native';

type ItemProp = {label: string; value: any};
interface IProps extends ISelectProps {
  options?: ItemProp[];
  value?: string;
  onChange?: (value: string) => void;
}
const Select = ({value, onChange, ...props}: IProps) => {
  const {style = {}} = props;

  const {
    width,
    height,
    marginTop,
    backgroundColor,
    marginLeft,
    marginRight,
    marginBottom,
    ...rest
  } = style as IProps;

  globalValiables[props['data-id']] = value;

  return (
    <Dropdown
      selectedValue={value}
      onValueChange={value => {
        globalValiables[props['data-id']] = value;

        onChange?.(value);
      }}
      mt={marginTop}
      ml={marginLeft}
      mr={marginRight}
      mb={marginBottom}
      height={height}
      width={width}
      placeholderTextColor={getTextColor(getColor({color: 'background.100'}))}
      style={rest as StyleProp<ViewStyle>}
      bgColor={getColor({color: 'background.500'})}
      color={getTextColor(getColor({color: 'background.100'}))}
      {...props}>
      {props?.options?.map((item: ItemProp) => (
        <Item bg={'red.100'} label={item.label} value={item.value} />
      ))}
    </Dropdown>
  );
};

const Item = function (props: ISelectItemProps) {
  return <Dropdown.Item {...props} />;
};

export const SelectItem = Item;
export default Select;
