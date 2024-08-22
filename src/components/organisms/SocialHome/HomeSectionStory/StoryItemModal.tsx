import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Divider,
  EyeSlashIconSet,
  Layer,
  ProfileIconSet,
  Typography,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import MuteModal from '~/components/organisms/SocialHome/PostList/Modals/MuteModal';

const StoryItemModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const [isMuteModalVisible, setIsMuteModalVisible] = useState(false);

  const user = useAuthStore(state => state?.user);
  const isMine = item?.user?.id === user?.id;
  const onMutePress = () => {
    onClose();
    setIsMuteModalVisible(true);
  };
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <VStack
          px="20px"
          space="16px"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              onClose();
            }}>
            <ProfileIconSet color={getColor({color: 'gray.800'})} />
            <Typography
              color={'gray.800'}
              style={{marginLeft: 8, fontWeight: '700'}}
              fontSize="sm">
              View profile
            </Typography>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={onMutePress}>
            <EyeSlashIconSet color={getColor({color: 'gray.800'})} />
            <Typography
              color={'gray.800'}
              style={{marginLeft: 8, fontWeight: '700'}}
              fontSize="sm">
              Mute
            </Typography>
          </TouchableOpacity>
        </VStack>
      </CustomActionSheet>
      <MuteModal
        isVisible={isMuteModalVisible}
        item={item}
        onClose={() => setIsMuteModalVisible(false)}
      />
    </>
  );
};

export default StoryItemModal;

const styles = StyleSheet.create({});
