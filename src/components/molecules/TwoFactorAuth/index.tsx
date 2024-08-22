import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  ArrowRightIconSet,
  Layer,
  Switch,
  Typography,
  useNavigate,
} from '~/components/elemental';
import ChangePhoneNumber from './ChangePhoneNumber';

const TwoFactorAuth = () => {
  const {navigateWithName} = useNavigate();
  const [status, setStatus] = useState('');

  return (
    <Layer style={{flex: 1}}>
      <Typography>You must confirm the SMS code when entering.</Typography>
      {status === 'setPhone' ? (
        <ChangePhoneNumber />
      ) : (
        <>
          <Layer
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
            }}>
            <Layer>
              <Typography style={{fontSize: 16, fontWeight: '500'}}>
                Text message(SMS)
              </Typography>
              <Typography
                color={'gray.500'}
                style={{fontSize: 14, fontWeight: '500', marginTop: 8}}>
                We’ll send a code to **** *** **01{' '}
              </Typography>
            </Layer>
            <Switch />
          </Layer>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
            }}
            onPress={() => setStatus('setPhone')}>
            <Layer>
              <Typography style={{fontSize: 16, fontWeight: '500'}}>
                Change phone number
              </Typography>
              <Typography
                color={'gray.500'}
                style={{fontSize: 14, fontWeight: '500', marginTop: 8}}>
                we can send login codes to a different number
              </Typography>
            </Layer>
            <ArrowRightIconSet />
          </TouchableOpacity>
        </>
      )}
    </Layer>
  );
};

export default TwoFactorAuth;

const styles = StyleSheet.create({});
