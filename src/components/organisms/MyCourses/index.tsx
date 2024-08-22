import React, {useMemo} from 'react';
import {Typography, getColor} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import styles from './styles';
import InProgressCourses from './InProgressCourses';
import CompletedCourses from './CompletedCourses';
import BookmarkedCourses from './BookmarkedCourses';

const MyCourses = () => {
  const logo = useMemo(
    () => (
      <Typography fontWeight={'700'} fontSize="2xl">
        My Courses
      </Typography>
    ),
    [],
  );

  const {} = useHeader({
    hasBack: false,
    hasTitle: false,
    logo,
  });

  const TabBarComponent = React.useCallback(
    props => (
      <MaterialTabBar
        {...props}
        activeColor={getColor({color: 'primary.500'})}
        inactiveColor={getColor({color: 'gray.400'})}
        indicatorStyle={styles.indicator}
        contentContainerStyle={styles.tabContent}
        labelStyle={styles.tabLabel}
        scrollEnabled
      />
    ),
    [],
  );

  return (
    <Tabs.Container
      headerContainerStyle={styles.tabContainer}
      lazy
      renderTabBar={TabBarComponent}>
      <Tabs.Tab name="InProgress" label="In Progress">
        <InProgressCourses />
      </Tabs.Tab>
      <Tabs.Tab name="Completed" label="Completed">
        <CompletedCourses />
      </Tabs.Tab>
      <Tabs.Tab name="Bookmark" label="Bookmark">
        <BookmarkedCourses />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default MyCourses;
