import {Actionsheet, Button, HStack, VStack} from 'native-base';
import {Pressable, StyleSheet} from 'react-native';
import {CloseIconSet, MoreIconSet} from '~/assets/iconset';
import {
  Box,
  Center,
  Image,
  Typography,
  deviceHeight,
  deviceWidth,
  getColor,
  useNavigate,
} from '~/components';
import {DatingUser} from '../models/user';
import useAuthStore from '~/stores/authStore';
import {useDatingSetup} from '../../DatingSetup/hooks/dating.hook';
import {getDatingUserFromAnswersMap} from '../hooks/DatingHome.hook';
import {FilledHeartIcon} from '~/assets/icons/dating';

function CustomCloseIcon() {
  return (
    <Center borderRadius={80} w={30} h={30} backgroundColor="gray.400">
      <CloseIconSet width={24} height={24} color={'#fff'} />
    </Center>
  );
}

function MatchHeader({onClose}): JSX.Element {
  return (
    <HStack
      px={4}
      justifyContent="space-between"
      alignItems="center"
      w={'100%'}>
      <Pressable onPress={onClose}>
        <CustomCloseIcon />
      </Pressable>
      <Typography fontSize="lg" fontWeight={700} color="gray.800">
        Congratulations
      </Typography>

      <MoreIconSet style={styles.rotate90} />
    </HStack>
  );
}

function CustomImage({source, right = false}): JSX.Element {
  const ms = right ? styles.rightImage : styles.leftImage;
  return (
    <Box h="2/3" style={[styles.imageBox, ms]}>
      <Image resizeMode="stretch" style={styles.image} source={source} />
    </Box>
  );
}

function Hearts({right = false}): JSX.Element {
  return (
    <VStack justifyContent="center" alignItems="center" w="100%" h="100%">
      <FilledHeartIcon rotation={right ? 0 : -30} />
      <FilledHeartIcon size={80} rotation={right ? -30 : 0} />
    </VStack>
  );
}

function Banner(): JSX.Element {
  return (
    <Box
      px={10}
      py={3}
      bgColor="error.500"
      borderRadius={16}
      position="absolute"
      top={220}
      style={styles.rotate76}
      left={deviceWidth / 2 - 100}>
      <Typography color="gray.50" fontWeight={500} fontSize="xl">
        It’s a Match
      </Typography>

      <Box position="absolute" top={-15} left={-7}>
        <FilledHeartIcon
          color={getColor({color: 'error.100'})}
          rotation={-22.6}
        />
      </Box>
    </Box>
  );
}

function MatchedPanel({
  user,
  myself,
}: {
  user: DatingUser;
  myself: DatingUser;
}): JSX.Element {
  return (
    <HStack w="100%" justifyContent="space-between" p={4} position="relative">
      <VStack w="48%" h={deviceHeight / 2}>
        <CustomImage source={{uri: myself.avatar[0]}} />
        <Box h="1/3">
          <Hearts />
        </Box>
      </VStack>

      <VStack w="48%">
        <Box h="1/3">
          <Hearts right />
        </Box>
        <CustomImage right source={{uri: user?.avatar?.[0]}} />
      </VStack>
      <Banner />
    </HStack>
  );
}

function T3({children}): JSX.Element {
  return (
    <Typography
      py={4}
      textAlign="center"
      lineHeight={19}
      fontWeight={400}
      color="gray.500"
      fontSize="sm">
      {children}
    </Typography>
  );
}

function T1({children}): JSX.Element {
  return (
    <Typography fontWeight={400} fontSize="xl">
      {children}
    </Typography>
  );
}

function T2({children}): JSX.Element {
  return (
    <Typography fontWeight={600} fontSize="2xl" color="error.500">
      {children}
    </Typography>
  );
}

function MatchedName({user}: {user: DatingUser}): JSX.Element {
  return (
    <VStack alignItems="center" w="100%">
      <T1>You have matched with</T1>
      <HStack alignItems="center">
        <T1>With </T1>
        <T2>{user.name}</T2>
      </HStack>
      <T3>Take your chance and have a talk!</T3>
    </VStack>
  );
}

export function DatingMatch({
  disclose: {isOpen, onClose},
  user,
}: {
  disclose: any;
  user: DatingUser;
}): JSX.Element {
  const {answersMap} = useDatingSetup();
  const {navigateWithName} = useNavigate();
  const auth = useAuthStore();
  const myself = getDatingUserFromAnswersMap(answersMap, auth);

  const onSayHelloPress = () => {
    onClose();

    navigateWithName('Chat', {
      item: {id: user?.id, fullName: user?.name, photoUrl: user?.avatar?.[0]},
      isProfile: true,
      goBack: true,
      isDatingProfile: true,
    });
  };

  const onSchedulingPress = () => {
    onClose();
    navigateWithName('datingScheduling', {
      user: {
        ...user,
        fullName: user?.name,
        photoUrl: user?.avatar?.[0],
        id: user?.id,
      },
    });
  };

  return (
    <Actionsheet hideDragIndicator={false} isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content alignItems="flex-start">
        <MatchHeader onClose={onClose} />
        <MatchedPanel user={user} myself={myself} />
        <MatchedName user={user} />

        <HStack px={6}>
          <Box w="1/2" pr={2}>
            <Button
              borderRadius={10}
              fontSize={'md'}
              fontWeight={600}
              borderWidth={2}
              borderColor={'primary.500'}
              w="100%"
              onPress={onSchedulingPress}
              variant={'outline'}>
              Scheduling
            </Button>
          </Box>
          <Box w="1/2" pl={2}>
            <Button
              borderRadius={10}
              fontSize={'md'}
              fontWeight={600}
              onPress={onSayHelloPress}
              borderWidth={2}
              borderColor={'primary.500'}
              w="100%">
              Say Hello
            </Button>
          </Box>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },

  rightImage: {
    borderStartStartRadius: 0,
  },

  leftImage: {
    borderEndEndRadius: 0,
  },

  image: {
    height: '100%',
    borderRadius: 10,
  },

  rotate90: {
    transform: [{rotate: '90deg'}],
  },

  rotate76: {transform: [{rotate: '-7.63deg'}]},
});
