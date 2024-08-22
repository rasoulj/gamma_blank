import React, {useState} from 'react';
import {Platform, UIManager, ViewStyle, LayoutAnimation} from 'react-native';
import RelativeLayout from '../RelativeLayout';
import Switch from '../Switch';
import Typography from '../Typography';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface IProps {
  title: string;
  style?: ViewStyle;
  children: any;
}

export default function Expandable({title, style, children, ...props}: IProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsActive(prev => !prev);
  };

  return (
    <>
      <RelativeLayout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...style,
        }}
        {...props}>
        <Typography fontWeight={'bold'}>{title}</Typography>
        <Switch
          value={isActive}
          trackColor={{
            true: getColor({color: 'primary.500', theme}),
          }}
          onValueChange={onToggle}
        />
      </RelativeLayout>
      {isActive ? children : null}
    </>
  );
}
