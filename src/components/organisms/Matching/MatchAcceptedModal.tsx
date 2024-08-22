import React from 'react';
import {
  ActionSheet,
  Button,
  HStack,
  Typography,
  User2Icon,
  useNavigate,
  View,
  getColor,
  useAuth,
} from '../../elemental';
import useMatchAcceptedStore from '~/stores/matchAcceptedStore';
import Image from '../../atoms/Image';

export default function MatchAcceptedModal() {
  const {navigateWithName} = useNavigate();
  const {isOpen, setIsOpen, matchAccepted} = useMatchAcceptedStore();
  const {user} = useAuth();

  if (!matchAccepted) return null;

  const {matchingAccepted} = matchAccepted;

  return (
    <ActionSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ActionSheet.Content
        style={{
          backgroundColor: getColor({color: 'background.500'}),
        }}>
        <View justifyContent={'center'} alignItems={'center'} width="100%">
          <HStack space={4} my={4}>
            {matchingAccepted?.targetUser?.photoUrl ? (
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 50,
                }}
                src={matchingAccepted?.targetUser?.photoUrl}
                alt="image"
              />
            ) : (
              <User2Icon />
            )}
            {matchingAccepted?.requestedByUser?.photoUrl ? (
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 50,
                }}
                src={matchingAccepted?.requestedByUser?.photoUrl}
                alt="image"
              />
            ) : (
              <User2Icon />
            )}
          </HStack>
          <Typography fontSize="lg" fontWeight={'bold'}>
            {matchingAccepted?.targetUser?.id === user?.id
              ? matchingAccepted?.requestedByUser?.fullName ||
                matchingAccepted?.requestedByUser?.email ||
                'someone'
              : matchingAccepted?.targetUser?.fullName ||
                matchingAccepted?.targetUser?.email ||
                'someone'}{' '}
            and you are matched
          </Typography>
          <HStack
            mt={8}
            space={4}
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Button
              onPress={() => {
                navigateWithName('match');
                setIsOpen(false);
              }}
              width="45%"
              variant={'outline'}>
              Home
            </Button>
            <Button
              onPress={() => {
                navigateWithName('profile', {
                  item: {
                    id: matchingAccepted?.targetUser?.id,
                  },
                });
                setIsOpen(false);
              }}
              width="45%">
              See Profile
            </Button>
          </HStack>
        </View>
      </ActionSheet.Content>
    </ActionSheet>
  );
}
