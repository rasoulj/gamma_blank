import { Colors } from './color.type';

export type ButtonProps = {
    fab?: boolean;
    children?: any;
    _text?: boolean;
    onClick?: Function;
    _pressed?: Function;
    isLoading?: boolean;
    isDisabled?: boolean;
    colorScheme?: Colors;
    isLoadingText?: string;
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
    spinnerPlacement?: 'start' | 'end';
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    variant?: 'solid' | 'subtle' | 'outline' | 'link' | 'ghost' | 'unstyled';
};
