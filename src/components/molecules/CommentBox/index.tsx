import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import styles from './styles';

export interface CommentBoxProps {
  avatar?: string;
  name: string;
  username?: string;
  comment: string;
  creationDate: string;
  onLike: () => void;
  onReply: () => void;
}

const CommentBox = ({
  avatar,
  name,
  username,
  comment,
  creationDate,
  onLike,
  onReply,
}: CommentBoxProps) => {
  return (
    <View style={styles.Container}>
      {avatar && (
        <View style={styles.AvatarWrapper}>
          <Image
            style={styles.Avatar}
            source={{
              uri: avatar,
            }}
          />
        </View>
      )}
      <View style={styles.ContentWrapper}>
        <View style={styles.CommentWrapper}>
          <View style={styles.Header}>
            <Text style={styles.Name}>{name}</Text>
            <Text style={styles.Username}>{username}</Text>
          </View>
          <Text style={styles.Content}>{comment}</Text>
          <Text style={styles.Date}>{creationDate}</Text>
        </View>
        <View style={styles.LikeWrapper}>
          <Pressable
            onPress={onLike}
            style={{
              marginRight: 5,
            }}>
            <Text style={styles.Like}>Like</Text>
          </Pressable>
          <Text
            style={{
              marginRight: 5,
            }}>
            .
          </Text>
          <Pressable
            onPress={onReply}
            style={{
              marginRight: 5,
            }}>
            <Text style={styles.Like}>Reply</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CommentBox;
