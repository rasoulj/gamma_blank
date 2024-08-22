import React, {useEffect} from 'react';
import {View} from 'native-base';
import {Image} from 'react-native';
import Typography from '../../atoms/Typography';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image from '../../../../icon.png';
import apsy from './apsy.png';
import {deviceWidth} from '../../elemental';

export default function SplashScreen({appName, target, initialPages}) {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const isInit = await AsyncStorage.getItem('initialized');
      await AsyncStorage.setItem('initialized', 'true');
      navigation.navigate(isInit ? target : initialPages, undefined);
    }, 1000);
  }, [target, initialPages]);

  return (
    <View style={{flex: 1, backgroundColor: '#1de9b6', alignItems: 'center'}}>
      <View style={{height: 50}} />
      <Image
        source={image}
        style={{
          marginTop: 40,
          flex: 1,
          resizeMode: 'contain',
          width: deviceWidth - 100,
          margin: 'auto',
        }}
      />
      <Typography style={{color: 'white', marginTop: 20}}>{appName}</Typography>
      <View style={{flex: 1}} />
      <Typography style={{color: 'white', marginBottom: 10}}>
        Designed & Developed by
      </Typography>
      <Image
        source={apsy}
        style={{
          marginBottom: 20,
          resizeMode: 'contain',
          width: 200,
          margin: 'auto',
        }}
      />
    </View>
  );
}
