import React from 'react';
import {Image, Text, View} from 'react-native';

import styles from './ChatProfile.style';

export interface ChatProfileProps {
  className?: string;
  avatar: string;
  username: string;
  description: string;
  active?: boolean;
  lastActiveTime?: string;
}

const ChatProfile = ({
  className,
  username,
  description,
  avatar,
  active = false,
  lastActiveTime,
}: ChatProfileProps) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Wrapper}>
        {avatar && (
          <View style={styles.AvatarWrapper}>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.AvatarImage}
            />
          </View>
        )}
        <View style={styles.NameWrapper}>
          <Text style={styles.Username}>{username}</Text>
          <Text style={styles.Description}>{description}</Text>
        </View>
      </View>
      <Text style={styles.LastActiveTime}>{lastActiveTime ?? 'recently'}</Text>
    </View>
  );
};

export default ChatProfile;
