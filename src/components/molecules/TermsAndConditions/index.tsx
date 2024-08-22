import React from 'react';
import { StyleSheet } from 'react-native';
import TermsConditionsIcon from '~/assets/icons/CustomIcons/TermsConditions.icon';
import { Scrollable, Typography } from '~/components/elemental';

const TermsAndConditions = ({content}: {content?: string}) => {
  return (
    <Scrollable
      style={styles.Scrollable}
      contentContainerStyle={styles.container}>
      <TermsConditionsIcon />
      <Typography style={styles.Typography}>
        {content
          ? content
          : `By using Ecommerce app, you agree to these terms. To use the app, you must be 15 or older and provide accurate registration information. Users are responsible for the accuracy of product listings, and all content must comply with applicable laws and respect others' rights. Ecommerce app reserves the right to suspend or terminate accounts for violations. Your personal information is collected according to our Privacy Policy. We may modify these terms, so please check for updates. Ecommerce app is provided "as is," and we are not liable for any damages. If you have questions, please contact us in support. Using the app implies your acceptance of these terms and conditions.`}
      </Typography>
    </Scrollable>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  Scrollable: {minHeight: 24, flexDirection: 'column'},
  Typography: {
    fontSize: 16, fontWeight: '400', marginVertical: 24
  },
  Typography1: {
    fontWeight: 'bold',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  TabsNavigation: {left: 0, right: 0, bottom: 0, zIndex: 10},
  container: {
    alignItems: 'center', marginVertical: 24
  }
});
