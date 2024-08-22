import {View, Text, Pressable} from 'react-native';
import React from 'react';
import ActionSheet from '../../atoms/ActionSheet';
import {
  BlockIcon,
  Divider,
  EditIcon,
  HStack,
  ReportIcon,
  Typography,
  getColor,
} from '../../elemental';

export default function OptionsActionSheet({
  hasEdit,
  isOpen,
  onClose,
  onPressReport,
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
          <Pressable style={{width: '100%'}} onPress={onPressReport}>
            <HStack
              space={2}
              mb={4}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              {hasEdit ? (
                <>
                  <EditIcon />
                  <Typography>Edit</Typography>
                </>
              ) : (
                <>
                  <ReportIcon color={'red.600'}/>
                  <Typography color={'red.600'}>Report</Typography>
                </>
              )}
            </HStack>
          </Pressable>
        </View>
      </ActionSheet.Content>
    </ActionSheet>
  );
}
