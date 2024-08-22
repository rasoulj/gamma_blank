import { CSSProperties } from 'react';
import { ViewStyle } from 'react-native';

export type DataType = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};

export type Tab = {
  label: string;
  id: string | number;
};

export type TabsProps = {
  tabs: Tab[];
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  overlay?: boolean;
  style?: CSSProperties;
  tabStyle?: ((isActive: boolean) => CSSProperties) | ViewStyle;
  overlayStyle?: ((data: DataType) => CSSProperties) | CSSProperties;
};
