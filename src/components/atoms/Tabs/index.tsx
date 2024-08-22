import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getColor} from '../../elemental/helper';
import Typography from '../Typography';
import {deviceWidth} from '~/utils/methods';
import {isDark, theme} from '../../elemental';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
export type Tab = {
  label: string;
  id: string;
  component: React.ReactElement;
};

interface IProps {
  tabs: Tab[];
  activeTab: string;
  overlay?: boolean;
  style?: any;
  tabStyle?: any;
  overlayStyle?: any;
  activeColor?: string;
  inactiveColor?: string;
}

const Tab = createMaterialTopTabNavigator();

export default function Tabs({
  tabs,
  activeTab,
  activeColor,
  inactiveColor,
  style,
  tabStyle,
  overlayStyle = {},
}: IProps) {
  const bgColor =
    getColor({color: tabStyle?.backgroundColor, theme}) || 'transparent';
  const [tab, setTab] = React.useState(activeTab);

  function MyTabBar({state, descriptors, navigation, position}) {
    return (
      <View style={styles.tabContainer}>
        {tabs?.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                width: deviceWidth / tabs.length,
                borderBottomColor:
                  state.index === index
                    ? getColor({color: 'primary.500'})
                    : getColor({color: 'gray.300'}),
                borderBottomWidth: 2,
                paddingBottom: 15,
              }}
              onPress={() => [navigation.navigate(item?.id), setTab(item?.id)]}>
              <Typography
                color={
                  state.index === index
                    ? getColor({color: 'primary.500'})
                    : isDark()
                    ? getColor({color: 'gray.500'})
                    : getColor({color: 'gray.800'})
                }
                style={{
                  textAlign: 'center',
                  fontWeight: state.index === index ? 'bold' : '600',
                }}>
                {item?.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      sceneContainerStyle={{
        backgroundColor: bgColor,
      }}
      screenOptions={{
        lazy: true,
      }}
      initialLayout={{width: deviceWidth}}
      initialRouteName={activeTab}>
      {tabs?.map(tab => (
        <Tab.Screen key={tab.id} name={tab.id.toString()}>
          {() => tab.component}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
