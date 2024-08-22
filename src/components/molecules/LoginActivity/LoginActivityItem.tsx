import React from 'react';
import {StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Button, Layer, Typography, getColor} from '~/components/elemental';

const LoginActivityItem = () => {
  const deviceName = DeviceInfo.getModel();
  console.log(deviceName);

  return (
    <Layer style={styles.shadowContainer}>
      <Typography style={{fontSize: 16, fontWeight: '600'}}>
        {deviceName}
      </Typography>
      <Typography color={'gray.500'} style={{fontSize: 12, fontWeight: '500'}}>
        Gunzenhausen, Germany.
      </Typography>
      <Typography color={'gray.500'} style={{fontSize: 12, fontWeight: '500'}}>
        Last login :{' '}
        <Typography
          color={'secondary.500'}
          style={{fontSize: 12, fontWeight: '500'}}>
          {' '}
          Today
        </Typography>
      </Typography>
      <Typography color={"green.500"} style={{fontSize: 12, fontWeight: '500'}}>
        This device
      </Typography>
      <Button
        color={'error.500'}
        style={{borderColor: getColor({color: 'error.500'}), marginVertical: 8}}
        variant={'outline'}>
        Log out
      </Button>
    </Layer>
  );
};

export default LoginActivityItem;

const styles = StyleSheet.create({
  shadowContainer: {
    padding: 16,
    backgroundColor: getColor({color: 'background.500'}),
    shadowColor: '#0002',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation:5,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 12,
  },
});
