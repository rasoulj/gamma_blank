import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {Typography} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';

const CustomTabBar = ({scrollY, HeaderHeight, isListGliding, props}) => {
  const renderLabel = ({route, focused}) => {
    return (
      <Typography
        fontWeight="500"
        style={[styles.label]}
        fontSize="sm"
        lineHeight={'19'}
        color={focused ? 'primary.500' : 'gray.500'}>
        {route.title}
      </Typography>
    );
  };

  const y = scrollY.interpolate({
    inputRange: [0, HeaderHeight],
    outputRange: [HeaderHeight, 0],
    extrapolate: 'clamp',
  });

  const onTabPress = ({preventDefault}) => {
    if (isListGliding.current) {
      preventDefault();
    }
  };

  return (
    <Animated.View style={[styles.tabBar, {transform: [{translateY: y}]}]}>
      <TabBar
        {...props}
        onTabPress={onTabPress}
        style={styles.tab}
        renderLabel={renderLabel}
        indicatorStyle={styles.indicator}
      />
    </Animated.View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  label: {fontSize: 16},
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    height: 48,
    backgroundColor: getColor({color: 'background.500'}),
  },
  indicator: {backgroundColor: getColor({color: 'primary.500'})},
  tabBar: {
    top: 0,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
});
