import React, {useState} from 'react';
import {
  BlockIcon,
  Box,
  Button,
  HStack,
  LoadIndicator,
  MoreIconSet,
  Pressable,
  ReportIcon,
  VStack,
  ZStack,
  useDisclose,
  useNavigate,
  useToast,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {DatingUser} from '../../DatingHome/models/user';
import {DatingUserCard} from '../../DatingHome/views/DatingUserCard';
import {DatingMatch} from '../../DatingHome/views/DatingMatch';
import {StyleSheet} from 'react-native';
import {ActionsMenu, CommandType} from './ActionsMenu';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useUpdateMatch} from '~/components/organisms/Matching/hooks';

import ReportListModal from '~/components/molecules/ReportModal';
import {UnHeartIcon} from '~/assets/icons/dating';
import {useQueryClient} from 'react-query';
import {useBlockUserhMutation, useGetMatches} from '../hooks';
import {getDatingUserFromAnswers} from '../../DatingHome/hooks/DatingHome.hook';
import useAuthStore from '~/stores/authStore';

function Unmatch(): JSX.Element {
  return <UnHeartIcon />;
}

function ActionCommands({
  type,
  user,
  matchId,
}: {
  type: number;
  user: DatingUser;
  matchId: number;
}): JSX.Element {
  const {toast} = useToast();
  const {goBack} = useNavigation();
  const {navigateWithName} = useNavigate();

  const labels =
    type === 1 ? ['Not Now', 'Match'] : ['Scheduling', 'Say Hello'];

  const matchingDisclose = useDisclose(false);
  const queryCLient = useQueryClient();

  const {mutate: updateMatch, isLoading: updateMatchIsLoading} =
    useUpdateMatch();

  const onMatchPress = () => {
    updateMatch(
      {input: {matchStatus: 'ACCEPTED', id: matchId}},
      {
        onSuccess: (data: any) => {
          const isSuccess =
            data?.match_updateMatch?.status?.value === 'Success' ||
            data?.match_updateMatch?.status?.value === 'AlreadyExists';
          if (isSuccess) {
            matchingDisclose.onOpen();
            queryCLient.invalidateQueries(['match_getMatches'], {exact: false});
            queryCLient.invalidateQueries(['match_getSimilarUsers'], {
              exact: false,
            });
          } else {
            toast({
              message: data?.match_updateMatch?.status?.value,
              type: 'error',
            });
          }
        },
        onError: () => {
          toast({message: 'Something went wrong', type: 'error'});
        },
      },
    );
  };

  const onOK = () => {
    if (type === 1) {
      onMatchPress();
    } else {
      navigateWithName('chat', {
        item: {id: user?.id, fullName: user?.name, photoUrl: user?.avatar?.[0]},
        isProfile: true,
        goBack: true,
        isDatingProfile: true,
      });
    }
  };

  const onNotOK = () => {
    if (type === 1) {
      goBack();
    } else {
      navigateWithName('datingScheduling', {
        user: {
          ...user,
          fullName: user?.name,
          photoUrl: user?.avatar?.[0],
          id: user?.id,
        },
      });
    }
  };

  return (
    <HStack h="60" alignItems="flex-end">
      <Box flex={1}>
        <Button onPress={onNotOK} borderWidth={2} variant={'outline'}>
          {labels[0]}
        </Button>
      </Box>
      <Box w={2} />
      <Box flex={1}>
        <Button onPress={onOK} isLoading={updateMatchIsLoading}>
          {labels[1]}
        </Button>
      </Box>

      <DatingMatch user={user} disclose={matchingDisclose} />
    </HStack>
  );
}

export function UserDetailView() {
  const {onClose, onOpen, isOpen} = useDisclose();
  const user = useAuthStore(state => state?.user);

  const [isLoading, setLoading] = useState(false);

  const {goBack} = useNavigation();
  const {toast} = useToast();
  const queryClient = useQueryClient();

  const {params} = useRoute();
  const matchId = params?.matchId;

  const {data} = useGetMatches({where: {id: {eq: matchId}}});

  const currentMatch = data?.pages?.[0];
  const currentUser =
    currentMatch?.targetUserId === user?.id
      ? currentMatch?.requestedByUser
      : currentMatch?.targetUser;
  const matchedUser = currentUser
    ? getDatingUserFromAnswers(currentUser, undefined)
    : params?.user;

  const type = currentMatch
    ? currentMatch?.matchStatus === 'ACCEPTED'
      ? 0
      : 1
    : params?.type;

  const commandDisclose = useDisclose(false);

  const commands =
    type === 0
      ? [
          {id: 1, label: 'Report', icon: <ReportIcon color="error.500" />},
          {id: 2, label: 'Block', icon: <BlockIcon color="error.500" />},
          {id: 3, label: 'Unmatch', icon: <Unmatch />},
        ]
      : [
          {id: 1, label: 'Report', icon: <ReportIcon color="error.500" />},
          {id: 4, label: 'Reject', icon: <Unmatch />},
        ];

  const u = matchedUser as DatingUser;

  useHeader({
    title: {children: u.name, fontSize: 'lg', fontWeight: 'bold'},
    hasBack: true,
    icons: (
      <Pressable onPress={commandDisclose.onOpen}>
        <MoreIconSet style={styles.rotate90} />
      </Pressable>
    ),
  });

  const {mutate: updateMutate, isLoading: updateMatchIsLoading} =
    useUpdateMatch();
  const onUnMatch = () => {
    updateMutate(
      {input: {id: matchId, matchStatus: 'REJECTED'}},
      {
        onSuccess: data => {
          queryClient.invalidateQueries(['match_getMatches'], {exact: false});
          queryClient.invalidateQueries(['match_getSimilarUsers'], {
            exact: false,
          });
          if (data?.match_updateMatch?.status?.code === 1) {
            toast({
              message: u.name + ' has been rejected successfully.',
              type: 'success',
              timeout: 5000,
            });
            goBack();
          } else {
            toast({
              message: data?.match_updateMatch?.status?.value,
              type: 'error',
              timeout: 5000,
            });
            goBack();
          }
        },
        onError: () => {
          toast({
            message: 'Something went wrong',
            type: 'error',
            timeout: 5000,
          });
          goBack();
        },
      },
    );
  };

  const {mutate: blockMutate, isLoading: blockIsLoading} =
    useBlockUserhMutation();
  const onBlock = () => {
    blockMutate(
      {input: {blockedUserId: requestedUser?.id}},
      {
        onSuccess: data => {
          if (data?.blockUser_block?.status?.code === 1) {
            toast({message: 'Blocked successfully', type: 'success'});
            queryClient.invalidateQueries(['match_getMatches'], {exact: false});
            queryClient.invalidateQueries(['match_getSimilarUsers'], {
              exact: false,
            });
            goBack();
          } else
            toast({
              message: data?.blockUser_block?.status?.value,
              type: 'error',
            });
        },
        onError: () => toast({message: 'Something went wrong', type: 'error'}),
      },
    );
  };

  const otherCommands = (command: CommandType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        message: u.name + ' has been ' + command.label + 'ed successfully.',
        type: 'success',
        timeout: 5000,
      });
      goBack();
    }, 2000);
  };

  const onCommand = (command: CommandType) => {
    const {id} = command;

    commandDisclose.onClose();

    switch (id) {
      case 1:
        onOpen();
        break;
      case 2:
        onBlock();
        break;
      case 3:
      case 4:
        onUnMatch();
        break;
      default:
        otherCommands(command);
    }
  };

  return (
    <VStack flex={1}>
      <VStack h="100%">
        <ZStack h="100%" w="100%">
          {(isLoading || updateMatchIsLoading || blockIsLoading) && (
            <LoadIndicator />
          )}
          <DatingUserCard like={undefined} disLike={undefined} user={u} />
          <ActionCommands user={matchedUser} type={type} matchId={matchId} />
        </ZStack>
      </VStack>

      <ActionsMenu
        disclose={commandDisclose}
        onCommand={onCommand}
        commands={commands}
      />

      <ReportListModal
        targetEntityName="user"
        item={matchedUser}
        isVisible={isOpen}
        onClose={onClose}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  rotate90: {
    transform: [{rotate: '90deg'}],
  },
});
