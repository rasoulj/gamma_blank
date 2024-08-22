import React from 'react';
import {StyleSheet, TouchableOpacity, ViewProps, ViewStyle} from 'react-native';
import Layer from '../Layer';
import Typography from '../Typography';
import {getColor} from '~/utils/helper/theme.methods';
import {TickIconSet} from '~/assets/iconset';

const CustomCheckBox = ({
  label,
  isChecked,
  onToggle,
  labelStyle = undefined,
  checkBoxStyle,
}: {
  label?: string;
  isChecked: boolean;
  onToggle?: any;
  labelStyle?: ViewStyle;
  checkBoxStyle?: ViewStyle;
}) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <Layer style={styles.checkboxContainer}>
        <Layer
          style={{
            ...styles.checkbox,
            backgroundColor: getColor({
              color: isChecked ? 'primary.500' : 'background.500',
            }),
            ...checkBoxStyle,
          }}>
          {isChecked && <TickIconSet width={16} color={'#fff'} />}
        </Layer>
        <Typography style={labelStyle ?? {fontSize: 16, fontWeight: '400'}}>
          {label}
        </Typography>
      </Layer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#9999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderRadius: 1,
  },
  checkSymbol: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CustomCheckBox;
