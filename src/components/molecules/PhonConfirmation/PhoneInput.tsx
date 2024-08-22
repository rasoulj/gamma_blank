import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';

const PhoneInput = ({
  phoneNumber,
  country,
  setPhoneNumber,
}: {
  phoneNumber: string;
  country: any;
  setPhoneNumber: () => void;
}) => {
  return (
    <View style={[styles.ButtonCountry, {justifyContent: 'flex-start'}]}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: '100%',
        }}>
        <Text style={{color: 'black'}}>
          {country?.callingCode?.[0] ? '+' + country?.callingCode?.[0] : '+33'}
        </Text>
        <View
          style={{
            height: '50%',
            width: 2,
            marginLeft: 10,
            backgroundColor: 'black',
          }}
        />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Phone number"
        placeholderTextColor={'gray'}
        maxLength={12}
        keyboardType="numbers-and-punctuation"
        value={phoneNumber}
        onChangeText={txt => setPhoneNumber?.(txt)}
      />
    </View>
  );
};

export default PhoneInput;
