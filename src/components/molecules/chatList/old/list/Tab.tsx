import React from 'react';
import {Text, useWindowDimensions} from 'react-native';
import {
  TabView,
  Route,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';

export interface TabProps {
  routes: Route[];
  renderer: (
    props: SceneRendererProps & {
      route: Route;
    },
  ) => React.ReactNode;
}

const Tab = ({routes, renderer}: TabProps) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  console.log('layout.width', layout.width);
  return (
    <TabView
      style={{
        height: '100%',
        width: '100%',
      }}
      renderTabBar={props => (
        <TabBar
          contentContainerStyle={{
            backgroundColor: '#fff',
          }}
          activeColor={'#1DE9B6'}
          inactiveColor={'#1F1F1F'}
          indicatorStyle={{
            backgroundColor: '#1DE9B6',
          }}
          renderLabel={({route, color}) => (
            <Text
              style={{
                color: color,
                fontSize: 17,
                fontWeight: '600',
              }}>
              {route.title}
            </Text>
          )}
          {...props}
        />
      )}
      navigationState={{index, routes}}
      renderScene={renderer}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default Tab;
