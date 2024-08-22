import React from 'react';
import {
  ArrowRightIconSet,
  Avatar,
  EditIconSet,
  HStack,
  Layer,
  Pressable,
  Typography,
  VStack,
  ZStack,
  getColor,
  isDark,
  useDisclose,
  useNavigate,
} from '~/components';

import {StyleSheet} from 'react-native';

import * as Progress from 'react-native-progress';
import {useDatingSetup} from '../DatingSetup/hooks/dating.hook';
import LogOutModal from '../../molecules/settings/Modals/LogOutModal';
import {
  calcDatingSetupProgress,
  calcPercent,
  getDatingUserFromAnswersMap,
} from '../DatingHome/hooks/DatingHome.hook';
import {DatingUser} from '../DatingHome/models/user';
import useAuthStore from '~/stores/authStore';
import useHeader from '~/components/elemental/hooks/use_header';

function Percent({progress}): JSX.Element {
  return (
    <HStack
      left={6}
      position="absolute"
      bottom={-14}
      borderWidth={'3'}
      borderColor={'gray.50'}
      borderRadius={'20'}
      alignItems="center"
      justifyContent="center"
      w="12"
      h="7"
      bg={getColor({color: 'primary.500'})}>
      <Typography
        fontWeight="500"
        fontSize="xs"
        color="gray.50"
        lineHeight="lg">
        {calcPercent(progress)}%
      </Typography>
    </HStack>
  );
}

function DatingProfileAvatar({datingUser}: {datingUser: DatingUser}) {
  const progress = calcDatingSetupProgress(datingUser);

  return (
    <ZStack w={'35%'} h={100}>
      <Avatar size={'xl'} m={1} source={{uri: datingUser.avatar[0]}} />

      <Progress.Circle
        borderWidth={0}
        thickness={4}
        strokeCap="round"
        color={getColor({color: 'gray.300'})}
        size={104}
        progress={1}
      />

      <Progress.Circle
        borderWidth={0}
        thickness={4}
        strokeCap="round"
        color={getColor({color: 'primary.500'})}
        style={styles.rotate180}
        size={104}
        progress={progress}
      />

      <Percent progress={progress} />
    </ZStack>
  );
}

function ProfileCard({datingUser}: {datingUser: DatingUser}) {
  const {navigateWithName} = useNavigate();
  const editProfile = () => navigateWithName('DatingEditProfile');

  return (
    <HStack
      justifyContent="space-between"
      borderRadius={8}
      w={'100%'}
      bg={'white'}
      p={'4'}
      pb={'6'}
      shadow={'1'}>
      <HStack alignItems="center">
        <DatingProfileAvatar datingUser={datingUser} />

        <VStack w="60%">
          <Typography fontSize="md" fontWeight={'600'} lineHeight={'xl'}>
            {datingUser.name}, {datingUser.age}
          </Typography>
          <Typography fontSize="sm" fontWeight={'400'} lineHeight={'xl'}>
            {datingUser.email}
          </Typography>
        </VStack>
      </HStack>
      <Pressable>
        <EditIconSet onPress={editProfile} />
      </Pressable>
    </HStack>
  );
}

function MenuItem({onPress, label, noLoading = false}) {
  return (
    <Pressable onPress={onPress}>
      <Layer style={styles.item}>
        <Typography>{label}</Typography>
        {!noLoading && (
          <ArrowRightIconSet color={getColor({color: 'gray.800'})} />
        )}
      </Layer>
    </Pressable>
  );
}

const items = [
  {label: 'Account Setting', path: 'AccountSetting'},
  {label: 'Terms & Conditions', path: 'terms'},
  {label: 'Help & Support', path: 'support'},
  {label: 'Logout'},
];

function MenuCard() {
  const dis = useDisclose();
  const {navigateWithName} = useNavigate();

  const onPress = ({path}: {path?: string}) => {
    if (!path) {
      dis.onOpen();
    } else {
      navigateWithName(path);
    }
  };

  return (
    <VStack bg="background.700" mt={8} px={4} borderRadius={8} shadow={1}>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          label={item.label}
          noLoading={!item.path}
          onPress={() => onPress(item)}
        />
      ))}

      <LogOutModal isVisible={dis.isOpen} onClose={dis.onClose} />
    </VStack>
  );
}

export function DatingProfile() {
  const {answersMap} = useDatingSetup();
  const user = useAuthStore(state => state.user);

  const {} = useHeader({hidden: true});

  const datingUser = getDatingUserFromAnswersMap(answersMap, user);

  return (
    <VStack>
      <ProfileCard datingUser={datingUser} />
      <MenuCard />
    </VStack>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomColor: isDark()
      ? getColor({color: 'gray.500'})
      : getColor({color: 'gray.300'}),
    borderBottomWidth: 0.5,
    backgroundColor: getColor({color: 'background.700'}),
  },

  rotate180: {transform: [{rotate: '180deg'}]},
});
