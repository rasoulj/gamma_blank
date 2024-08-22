import {Colors} from './color.type';

// import type { ITextProps } from 'native-base/src/components/primitives/Text/types';

// export type TypographyProps1 = Omit<
//     ITextProps,
//     'children' | 'fontSize' | 'accessibilityIgnoresInvertColors'
// > & {
//     children?: string;
//     fontSize?:
//         | '2xs'
//         | 'xs'
//         | 'sm'
//         | 'md'
//         | 'lg'
//         | 'xl'
//         | '2xl'
//         | '3xl'
//         | '4xl'
//         | '5xl'
//         | '6xl'
//         | '7xl'
//         | '8xl'
//         | '9xl';
// };

export type TypographyProps = {
  // color?: Colors;
  color?: string;
  children?: string;
  fontSize?:
    | '2xs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  letterSpacing?: 'sm' | 'xs' | 'md' | 'xl' | 'lg' | '2xl';
  lineHeight?: 'sm' | 'xs' | 'md' | 'xl' | '3xl' | '5xl' | 'lg' | '4xl' | '2xl';
  fontWeight?:
    | 'bold'
    | 'thin'
    | 'black'
    | 'light'
    | 'medium'
    | 'normal'
    | 'hairline'
    | 'semibold'
    | 'extrabold'
    | 'extraBlack';
  // font?: any;
  // sub?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  // highlight?: boolean;
  // strikeThrough?: boolean;
  alignment?: 'center' | 'right' | 'left';
};
