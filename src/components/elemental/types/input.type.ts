import { Colors } from './color.type';
import { HTMLInputTypeAttribute } from 'react';
import { TypographyProps } from './typography.type';

export type hintPropsType = { text: string } & TypographyProps;

export type InputProps = {
    name?: string;
    value?: any;
    color?: Colors;
    label?: string;
    onBlur?: Function;
    className?: string;
    onFocus?: Function;
    onChange?: Function;
    isInvalid?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isFullWidth?: boolean;
    onValueChange?: Function;
    hintProps?: hintPropsType;
    type?: HTMLInputTypeAttribute;
    size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    variant?: 'outline' | 'filled' | 'underlined' | 'unstyled' | 'rounded';
};
