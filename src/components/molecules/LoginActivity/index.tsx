import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Typography} from '~/components/elemental';
import LoginActivityItem from './LoginActivityItem';

const LoginActivity = () => {
    const renderItem= () => {
        return(
            <LoginActivityItem />
        )
    }
  return (
    <View>
      <Typography
        style={{
          marginVertical: 8,
          fontSize: 14,
          fontWeight: '500',
          textAlign: 'left',
        }}>
        You are currently logged in on these devices:
      </Typography>
      <FlatList data={[1,2,3]} renderItem={renderItem}/>
    </View>
  );
};

export default LoginActivity;

const styles = StyleSheet.create({});
