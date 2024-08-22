import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import useAuthStore from '~/stores/authStore';
import {Button, getColor, LoginIconSet} from '../../elemental';
import Typography from '../../atoms/Typography';

const GuestMode = () => {
  const setIsUserLoggedIn = useAuthStore(state => state?.setIsUserLoggedIn);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Typography style={{fontSize: 14, fontWeight: '500'}}>
        Please log in to use the app full features.
      </Typography>
      <Button
        style={{marginBottom: 40, width: 100, marginTop: 46}}
        onPress={() => [setIsUserLoggedIn(false)]}>
        Log in
      </Button>
      {/* <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', margin: 8}}
        onPress={() => [setIsUserLoggedIn(false)]}>
        <LoginIconSet color={getColor({color: 'blue.500'})} />
        <Typography
          color={'blue.500'}
          style={{fontWeight: '700', marginLeft: 10}}>
          Log in
        </Typography>
      </TouchableOpacity> */}
    </View>
  );
};

export default GuestMode;

const styles = StyleSheet.create({});
