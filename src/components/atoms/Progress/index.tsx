import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {Typography, getColor} from '~/components/elemental';

const Progress = ({
  progress = 0,
  parentColor = getColor({color: 'primary.200'}),
  presentColor = getColor({color: 'primary.500'}),
  title = '',
  hidePercent,
  style,
  textStyle,
  containerStyle,
}: {
  progress: any;
  parentColor?: string;
  presentColor?: string;
  title?: string;
  hidePercent?: boolean;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.progressBarContainer, containerStyle]}>
        <View
          style={[
            styles.presentProgressBar,
            {width: `${clampedProgress}%`, backgroundColor: presentColor},
          ]}
        />
        <View
          style={[styles.parentProgressBar, {backgroundColor: parentColor}]}
        />
      </View>
      {!hidePercent && (
        <Typography
          style={{...styles.text, ...textStyle}}
          fontWeight={'400'}
          fontSize="xs"
          color={'gray.800'}>
          {title}
          {clampedProgress}%
        </Typography>
      )}
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    flex:1

  },
  progressBarContainer: {
    width:"90%",
    height: 4,
    flexDirection: 'row',
    borderRadius: 100,
    
  },
  parentProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: getColor({color: 'primary.200'}),
    borderRadius: 100,
    
  },
  presentProgressBar: {
    height: 4,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
    
  },
  text: {
    marginLeft: 10,
  },
});
