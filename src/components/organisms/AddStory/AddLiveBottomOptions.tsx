import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image} from '~/components';
import {WaveIcon} from '~/assets';

export default function AddLiveBottomOptions({
  onStartPress,
}: {
  onStartPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onStartPress} activeOpacity={0.8}>
        <View style={styles.outterCircle}>
          <View style={styles.innerCircle}>
            <Image source={WaveIcon} style={styles.waveIcon} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 18,
  },
  outterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    marginHorizontal: 32,
  },
  innerCircle: {
    backgroundColor: 'white',
    width: 56,
    height: 56,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveIcon: {width: 35, height: 25},
});
