import {View} from 'react-native';
import React, {useState} from 'react';
import ActionSheet from '../../atoms/ActionSheet';
import {
  Button,
  Form,
  FormTextArea,
  HStack,
  SubmitButton,
  Typography,
  getColor,
} from '../../elemental';

export default function ReportActionSheet({
  isOpen,
  onClose,
  onPressReport,
  isLoading,
}) {
  const [report, setReport] = useState('');
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
          }}>
          <Typography alignSelf={'center'} mb={4}>
            Report
          </Typography>
          <Form>
            <FormTextArea
              borderRadius={10}
              onChangeText={e => setReport(e)}
              mb={6}
              name="report"
              placeholder="Write here ..."
            />
            <HStack
              space={4}
              width={'100%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Button onPress={onClose} flex={1} variant={'outline'}>
                Cancel
              </Button>
              <SubmitButton
                isLoading={isLoading}
                flex={1}
                backgroundColor={'red.600'}
                onPress={() => onPressReport(report)}>
                Report
              </SubmitButton>
            </HStack>
          </Form>
        </View>
      </ActionSheet.Content>
    </ActionSheet>
  );
}
