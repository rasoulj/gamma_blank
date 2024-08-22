import {ViewStyle} from 'react-native';

export interface HorizontalProductsListProps {
  style?: ViewStyle;

  title: string;

  data: Array<any> | null | undefined;

  loading?: boolean;

  testID?: string;

  onClickSeeAll?: () => void;
}
