import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MessageSupport from './MessageSupport';
import FullSupport from './FullSupport';

type SupportProps = {
  email: string;
  image?: any;
  description?: string;
  type?: 'full' | 'message';
  phoneNumber?: string;
  availableChatTime?: string;
  availableTelephoneTime?: string;
};
const Support = ({
  image,
  description,
  email,
  type,
  phoneNumber,
  availableChatTime,
  availableTelephoneTime,
}: SupportProps) => {
  return (
    <View>
      {type === 'full' ? (
        <FullSupport
          phoneNumber={phoneNumber}
          image={image}
          availableChatTime={availableChatTime}
          availableTelephoneTime={availableTelephoneTime}
        />
      ) : (
        <MessageSupport image={image} description={description} email={email} />
      )}
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({});
