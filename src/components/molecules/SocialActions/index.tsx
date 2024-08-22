import React from 'react';
import {Card, HeartIcon, CommentsIcon, ShareIcon, Typography} from '../../elemental';
import share, {ShareOptions} from 'react-native-share';
import {useNavigation} from '@react-navigation/native';

export default function SocialActions({
  isLiked,
  shareOptions,
  onPress,
  item,
}: {
  isLiked: boolean;
  item: any;
  shareOptions: ShareOptions;
  onPress?: (item: any) => void;
}) {
  const navigation = useNavigation();

  return (
    <Card style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Card
        style={{flexDirection: 'row', alignItems: 'center', gap: 2}}
        onPress={() => onPress?.(item)}>
        <HeartIcon isLiked={isLiked} />
        <Typography>Like</Typography>
      </Card>
      <Card
        style={{flexDirection: 'row', alignItems: 'center', gap: 2}}
        onPress={() => {
          navigation.navigate('SocialActionCommentsScreen', {id: item?.id});
        }}>
        <CommentsIcon />
        <Typography>Comments</Typography>
      </Card>
      <Card
        style={{flexDirection: 'row', alignItems: 'center', gap: 2}}
        onPress={() => {
          try {
            share.open(shareOptions);
          } catch {
            console.log('share error');
          }
        }}>
        <ShareIcon />
        <Typography>Share</Typography>
      </Card>
    </Card>
  );
}
