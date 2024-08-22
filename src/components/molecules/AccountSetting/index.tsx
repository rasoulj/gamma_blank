import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {
  Layer,
  RightIcon,
  Typography,
  getColor,
  isDark,
  useNavigate,
} from '~/components/elemental';
import DeleteConfirmatonModal from './Modals/DeleteConfirmation';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import LogOutModal from '../settings/Modals/LogOutModal';

const AccountSetting = () => {
  const {navigateWithName} = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const AccountSettingItems = !isElementInModel('Stories')
    ? [
        {label: 'Change password', path: 'changepassword'},
        {
          label: 'Delete Account',
          path: 'Delete Account',
          onPress: () => setIsDeleteModalVisible(true),
        }
      ]
    : [
        {label: 'Change password', path: 'changepassword'},
        {label: 'Account privacy', path: 'Account privacy'},
        {label: 'Blocked users', path: 'BlockedUsers'},
        {label: 'Hide story from', path: 'HideStory'},
        {
          label: 'Delete Account',
          path: 'Delete Account',
          onPress: () => setIsDeleteModalVisible(true),
        },
      ];
  return (
    <View>
      {AccountSettingItems.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() =>
            item?.onPress
              ? item?.onPress()
              : navigateWithName(item.path || item.label?.toLowerCase?.())
          }>
          <Layer key={index} style={styles.item}>
            <Typography fontSize="md" color="gray.800" fontWeight={'500'}>
              {item.label}
            </Typography>
            <RightIcon height="20" color="gray.800" />
          </Layer>
        </TouchableWithoutFeedback>
      ))}
      <DeleteConfirmatonModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />

      <LogOutModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomColor: isDark()
      ? getColor({color: 'gray.500'})
      : getColor({color: 'gray.300'}),
    borderBottomWidth: 0.5,
  },
});
