import * as React from 'react';
import { Colors } from './color.type';

export type SelectProps = {
    color?: Colors;
    search?: boolean;
    isDisabled?: boolean;
    isMultiple?: boolean;
    placeholder?: string;
    onChange?: Function;
    selectedValue?: string;
    onValueChange?: Function;
    children?: React.ReactNode;
    options?: { label; value }[];
    placeholderTextColor?: string;
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
};
