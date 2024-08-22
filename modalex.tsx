import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  isIOS,
  ArrowBackIcon,
  SettingsIcon,
  Layer,
  Typography,
  Button,
  EditIcon,
  IMG,
  CommunityIcon,
  Scrollable,
  Wrappable,
  ListItem,
  useQuery,
  graphqlFetcher,
  wp,
  View,
  useModal,
} from '~/components/elemental';

export default function UserProfile({navigation, route}) {
  const {newModal} = useModal();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginTop: isIOS ? 35 : undefined,
      }}>
      <Button
        onPress={() => {
          newModal({
            closeButton: true,
            Body: ModalBody,
          });
        }}>
        open modal
      </Button>
    </SafeAreaView>
  );
}

function ModalBody({closeModal}) {
  return (
    <View>
      <Typography>hello new modal</Typography>
      <Button onPress={closeModal}>close modal</Button>
    </View>
  );
}
