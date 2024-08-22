import {capitalize} from 'lodash';
import {useController, useForm} from 'react-hook-form';
import {StyleSheet, ViewStyle} from 'react-native';
import {
  DropDown,
  FormControl,
  Typography,
  print,
  scale,
} from '~/components/elemental';

type Props = {
  data: Array<{label: string; value: string}>;
  style?: ViewStyle;
  name: string;
  label: string;
  required?: boolean;
  control?: any;
};

export default function CustomDropdown({
  data,
  style,
  name,
  label,
  required = false,
  control,
}: Props) {
  const {fieldState, field} = useController({name, control});

  return (
    <FormControl style={style}>
      <Typography fontSize="sm" marginY={2} fontWeight="500">
        {label}
        {required && <Typography>{'   *'}</Typography>}
      </Typography>
      <DropDown
        style={styles.dropDown}
        control={control}
        data={data}
        name={name}
      />
      <FormControl.ErrorMessage>
        {fieldState.error?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

const styles = StyleSheet.create({
  dropDown: {height: 50},
});
