import React from 'react';
import Typography from '../Typography';
import {BackIcon, HStack} from '~/components/elemental';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import useHeader, {
  HeaderObserver,
} from '~/components/elemental/hooks/use_header';

export type HeaderProps = {
  hasBack?: string | boolean;
  title?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  onClickBack?: () => void;
  localNavigate?: () => void;
};

function Header({
  hasBack = 'true',
  title,
  style = {},
  children = undefined,
  onClickBack = undefined,
  localNavigate,
  ...props
}: Partial<HeaderProps>) {
  const navigation = useNavigation();
  const route = useRoute();
  const state = useHeader();

  const {
    title: titleProps,
    hasBack: headerHasBack = true,
    icons,
    logo,
    hasTitle = true,
    component,
    hidden,
  } = state[route.name] || {hasTitle: true, hasBack: true};

  if (typeof children === 'string') children = null;

  if (hidden) return null;

  return (
    <HStack
      style={{
        height: 60,
        zIndex: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 0,
        ...style,
      }}
      {...props}>
      {logo ? (
        <View style={styles.absoluteView}>{logo}</View>
      ) : hasBack !== 'false' && headerHasBack ? (
        <BackIcon
          style={styles.absoluteView}
          onPress={() => {
            HeaderObserver.state?.[route.name]?.onBack?.();

            if (typeof onClickBack === 'function') {
              onClickBack();
              return;
            }

            if (
              !HeaderObserver.state?.[route.name]?.onBack &&
              navigation.canGoBack()
            ) {
              navigation.goBack();
            }

            if (typeof (localNavigate as any)?.goBack === 'function') {
              (localNavigate as any).goBack();
              return;
            }
          }}
        />
      ) : (
        <View />
      )}
      {component
        ? component
        : hasTitle &&
          (titleProps ? (
            <Typography {...titleProps} mx="5" numberOfLines={1} />
          ) : (
            <Typography style={styles.title} numberOfLines={1}>
              {title}
            </Typography>
          ))}
      <View style={styles.children}>{icons || children}</View>
    </HStack>
  );
}

export default Header;

const styles = StyleSheet.create({
  absoluteView: {position: 'absolute', left: 0},

  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginHorizontal: 16,
  },

  children: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    top: 20,
    right: 0,
  },
});
