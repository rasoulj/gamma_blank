import React from 'react';
import type {ImageSourcePropType} from 'react-native';
import {Image, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
type Props = React.ComponentProps<typeof TouchableOpacity> & {
  source: ImageSourcePropType;
  onPress: () => void;
  isSelected: boolean;
};

export const Tooth = ({
  source,
  onPress,
  style,
  isSelected,
  ...otherProps
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View alignItems={'center'} style={style} {...otherProps}>
        <Image
          alt={'tooth'}
          resizeMode="contain"
          tintColor={isSelected ? '#BBBABA' : null}
          width={30}
          height={30}
          source={source}
        />
      </View>
    </TouchableOpacity>
  );
};
