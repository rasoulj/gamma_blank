import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Typography, deviceHeight} from '~/components';
import {EmptyHomeSvg} from '~/assets';

const EmptyState = () => {
  return (
    <ScrollView contentContainerStyle={styles.emptyContainer}>
      <View>
        <EmptyHomeSvg height={deviceHeight * 0.26} />
      </View>
      <Typography
        fontWeight="600"
        fontSize="lg"
        color="gray.800"
        marginBottom={4}
        textAlign="center"
        marginTop={6}>
        Looks like no one has shared anything yet!
      </Typography>
      <Typography
        fontWeight="400"
        fontSize="sm"
        color="gray.800"
        marginBottom={4}
        textAlign="center">
        {`The world is waiting for your stories.`}
      </Typography>
      <View style={styles.footerView} />
    </ScrollView>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  footerView: {height: 150},
});
