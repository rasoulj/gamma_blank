import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMG, User2Icon, Layer, Typography} from '../../../elemental';

const ContactItem = ({item}) => {
  return (
    <Layer style={{flexDirection: 'row', alignItems: 'center', padding: 8}}>
      {item?.photoUrl ? (
        <IMG
          src={item?.photoUrl}
          style={{
            width: 54,
            height: 54,
            borderRadius: 50,
          }}
          alt="profile"
        />
      ) : (
        <User2Icon width={54} height={54} />
      )}
      <Typography style={{fontSize: 16, fontWeight: '500', marginLeft: 8}}>
        {item?.fullName}
      </Typography>
    </Layer>
  );
};

export default ContactItem;

const styles = StyleSheet.create({});
