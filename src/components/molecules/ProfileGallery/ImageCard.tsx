import {Center} from 'native-base';
import React, {useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '~/theme';
import {scale} from '../../elemental';
export default function ImageCard({
  onPress,
  source,
  error = false,
  disabled = false,
}: {
  onPress?: any;
  source?: any;
  error?: any;
  disabled?: boolean;
}) {
  const iconColor = theme.colors.green[800];
  const bg = theme.colors.green[200];
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      {...{disabled}}
      style={[
        {
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bg,
          // borderRadius: 8,
        },
        error && {
          borderColor: 'red',
          borderWidth: 1,
        },
      ]}>
      {isLoading ? (
        <Center position="absolute" width="100%" height="100%">
          <ActivityIndicator color={iconColor} size="small" />
        </Center>
      ) : null}
      {source ? (
        <Image
          source={{uri: source}}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          style={{width: '100%', height: '100%', borderRadius: 8}}
        />
      ) : (
        <Center>
          <AntDesign name="plus" size={scale(30)} color={iconColor} />
        </Center>
      )}
    </TouchableOpacity>
  );
}
