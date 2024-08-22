import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {
  ActionSheet,
  BlockIcon,
  DeleteIcon,
  Divider,
  EditIcon,
  EditIconSet,
  HStack,
  ReportIcon,
  TrashIconSet,
  Typography,
  getColor,
} from '../../../elemental';

export default function OptionsActionSheet({
  hasEdit,
  isOpen,
  onClose,
  onPressEdit,
  onPressDelete,
}) {
  return (
    <ActionSheet {...{isOpen, onClose}}>
      <ActionSheet.Content
        style={{
          width: '100%',
          backgroundColor: getColor({color: 'background.500'}),
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 16,
            alignItems: 'flex-start',
          }}>
          <Pressable style={{width: '100%'}} onPress={onPressEdit}>
            <HStack
              space={2}
              m={3}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              <>
                <EditIconSet />
                <Typography style={{fontSize: 14, fontWeight: '700'}}>
                  Edit
                </Typography>
              </>
            </HStack>
          </Pressable>
          <Divider />
          <Pressable style={{width: '100%'}} onPress={onPressDelete}>
            <HStack
              space={2}
              m={3}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              <>
                <TrashIconSet color={'red.600'} />
                <Typography
                  color={'red.600'}
                  style={{fontSize: 14, fontWeight: '700'}}>
                  Delete
                </Typography>
              </>
            </HStack>
          </Pressable>
        </View>
      </ActionSheet.Content>
    </ActionSheet>
  );
}
