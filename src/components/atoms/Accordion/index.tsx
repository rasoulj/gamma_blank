import React, {memo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import ArrowDownSolid from '~/assets/iconset/Arrow/arrow-down-solid';
import ArrowUpSolid from '~/assets/iconset/Arrow/arrow-up-solid';
import {getColor} from '~/utils/helper/theme.methods';

function AccordionView({title, children}) {
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, i, isActive) => {
    return (
      <View style={styles.headerView}>
        <Text style={[styles.headerText]}>{section.title}</Text>
        {isActive ? (
          <ArrowUpSolid color={getColor({color: 'gray.800'})} />
        ) : (
          <ArrowDownSolid color={getColor({color: 'gray.800'})} />
        )}
      </View>
    );
  };

  const renderContent = section => {
    return <View>{section?.children}</View>;
  };

  const updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={[{title, children}]}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
      underlayColor={getColor({color: 'background.500'})}
    />
  );
}

export default memo(AccordionView);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },

  headerView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 16,
  },
});
