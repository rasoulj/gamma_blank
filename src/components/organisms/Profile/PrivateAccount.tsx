import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrivateAccountIcon} from '~/assets';
import {Typography} from '~/components/elemental';

const PrivateAccount = () => {
  return (
    <View style={styles.container}>
      <PrivateAccountIcon />
      <Typography
        fontSize="md"
        fontWeight="600"
        color="gray.800"
        marginY="10px">
        This Account is Private
      </Typography>
      <Typography fontSize="sm" fontWeight="500" color="gray.800">
        Follow this account to see their photos and videos.
      </Typography>
    </View>
  );
};

export default PrivateAccount;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
});
