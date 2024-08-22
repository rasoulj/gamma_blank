import React from 'react';
import {DatingUser} from '../models/user';
import {StyleSheet, ViewStyle} from 'react-native';
import {
  CloseIconSet,
  HeartIconSet,
  LocationIconSet,
  PeopleIconSet,
  Typography,
  VStack,
  getColor,
  Image,
  Box,
  Circle,
  HStack,
} from '~/components/elemental';
import Animated from 'react-native-reanimated';

function Heart({style}: {style: any}) {
  return (
    <Animated.View style={style}>
      <Circle
        borderWidth={4}
        borderColor="primary.500"
        size="xl"
        backgroundColor={'white'}
        style={[styles.like]}>
        <HeartIconSet
          width={50}
          height={50}
          fill={getColor({color: 'primary.500'})}
          color="primary"
        />
      </Circle>
    </Animated.View>
  );
}

function DisHeart({style}: {style: any}) {
  return (
    <Animated.View style={style}>
      <Circle
        borderWidth={4}
        borderColor={'error.500'}
        size="xl"
        backgroundColor={'white'}
        style={styles.dislike}>
        <Circle backgroundColor={'error.500'}>
          <CloseIconSet width={50} height={50} fill={'#fff'} color="#fff" />
        </Circle>
      </Circle>
    </Animated.View>
  );
}

function UserCard({
  user,
  style,
}: {
  user: DatingUser;
  style?: ViewStyle;
}): JSX.Element {
  return (
    <VStack style={style ?? {}}>
      <HStack>
        <HStack backgroundColor="white" px={4} py={1} borderRadius={16}>
          <PeopleIconSet />
          <Typography pl={2} fontSize="sm">
            {user?.why}
          </Typography>
        </HStack>
      </HStack>

      <HStack alignItems="center">
        <Typography
          marginRight={2}
          fontWeight="600"
          py={2}
          fontSize="2xl"
          color="#fff">
          {user?.name}, {user?.age}
        </Typography>
      </HStack>

      <HStack alignItems="center" alignContent="center">
        <LocationIconSet color="gray.300" width={16} />
        <Typography fontSize="xs" color="gray.300" marginLeft={1}>
          {user?.address}
        </Typography>
      </HStack>
    </VStack>
  );
}

export function DatingUserCard({
  style,
  user,
  like,
  disLike,
}: {
  user: DatingUser;
  style?: ViewStyle;
  like: any;
  disLike: any;
}): JSX.Element {
  return (
    <Box style={[style, styles.imageBox]}>
      <Image
        resizeMode="cover"
        key={user?.address}
        style={styles.image}
        source={{uri: user?.avatar?.[0]}}
      />
      <UserCard user={user} style={styles.userCard} />

      <Heart style={like} />
      <DisHeart style={disLike} />
    </Box>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    height: '100%',
    borderRadius: 10,
  },

  userCard: {
    position: 'absolute',
    zIndex: 100,
    bottom: 30,
    left: 30,
  },

  like: {
    position: 'absolute',
    zIndex: 100,
    top: 100,
    left: 20,
  },

  dislike: {
    position: 'absolute',
    zIndex: 100,
    top: 100,
    left: 220,
  },

  badge: {
    width: 32,
    height: 32,
  },

  flex1: {
    flex: 1,
  },
});
