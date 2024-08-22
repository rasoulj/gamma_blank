import {View, Text, Modal, SafeAreaView} from 'react-native';
import React from 'react';
import Typography from '../../atoms/Typography';
import {BlockIcon, Button, Success2Icon, getColor} from '../../elemental';

export default function ReportModal({visible, onRequestClose, type}) {
  return (
    <Modal transparent={true} animationType={'slide'} visible={visible}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#21212180',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: getColor({color: 'background.500'}),
            borderRadius: 15,
          }}>
          <>
            <Success2Icon style={{marginTop: 48}} />
            <Typography fontWeight={'bold'} color={'#39DA2C'} my={4}>
              Report Submitted!
            </Typography>
            <Typography color={'gray.500'} fontWeight={'600'}>
              Thanks for letting us know.
            </Typography>
          </>
          <Button
            onPress={onRequestClose}
            borderRadius={12}
            mt={4}
            mb={10}
            width="40%">
            Done
          </Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
