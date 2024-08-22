import {HStack} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import {ApsyInAppLogo} from '~/assets';
import {FilterIconSet, Image, Pressable, scale} from '~/components/elemental';
import {model} from '~/data/model';

export function FilterIconButton({
  onPress,
}: {
  onPress: VoidFunction;
}): JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <FilterIconSet />
    </Pressable>
  );
}

export function DatingHomeHeader({onPressFilter}) {
  return (
    <HStack h={10} justifyContent="space-between">
      {model?.metaData?.logo ? (
        <View style={styles.logo}>
          <Image
            resizeMode="cover"
            style={styles.img}
            src={model?.metaData?.logo}
          />
        </View>
      ) : (
        <WithLocalSvg
          width={scale(70)}
          height={scale(70) * 0.26}
          asset={ApsyInAppLogo}
        />
      )}
      <FilterIconButton onPress={onPressFilter} />
    </HStack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: scale(70),
    height: scale(70) * 0.26,
  },

  img: {
    width: undefined,
    aspectRatio: 1,
    height: scale(70) * 0.26,
  },
});
