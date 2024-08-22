import {ScrollView} from 'native-base';
import React from 'react';
import {Pressable, View} from 'react-native';

import ChatProfile, {ChatProfileProps} from '../ChatProfile';
import styles from './AllChats.style';

export interface AllChatsProps {
  className?: string;
  members: ChatProfileProps[];
  onClick: (index: number) => void;
}
const AllChats = ({className, members, onClick}: AllChatsProps) => {
  return (
    <ScrollView>
      <View style={styles.Container}>
        {members.map((profile, index) => (
          <Pressable
            style={styles.ItemContainer}
            onPress={() => onClick(index)}
            key={index}>
            <ChatProfile {...profile} key={index} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllChats;
