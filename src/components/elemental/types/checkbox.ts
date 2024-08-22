import { Colors } from './color.type';

export type CheckboxProps = {
    id?: string;
    name?: string;
    value?: string;
    inline?: boolean;
    onChange?: Function;
    colorScheme?: Colors;
    defaultValue?: string[];
    onValueChange?: Function;
    size?: 'lg' | 'md' | 'sm';
    accessibilityLabel?: string;
};
