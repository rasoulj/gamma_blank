import React from 'react';
import {Linking, Pressable} from 'react-native';
import Typography from '../../atoms/Typography';
import {Link} from 'native-base';

function URL({url, children, ...props}) {
  return (
    <Link
      _text={{
        color: 'secondary.500',
      }}
      onPress={() => Linking.openURL(url)}>
      {children}
    </Link>
  );
}

export default URL;
