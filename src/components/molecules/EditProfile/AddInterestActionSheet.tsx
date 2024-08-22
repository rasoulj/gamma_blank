import React, {useEffect, useRef, useState} from 'react';
import ActionSheet from '../../atoms/ActionSheet';
import Typography from '../../atoms/Typography';
import Form from '../../atoms/Form';
import {HStack, View} from 'native-base';
import FormTextInput from '../../atoms/FormTextInput';
import {Pressable} from 'react-native';
import SubmitButton from '../../atoms/SubmitButton';
import Button from '../../atoms/Button';
import {useKeyboardVisible} from '~/utils/useKeyboardVisible';
import {ScrollView} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import {print} from '~/utils/methods';

export default function AddInterestActionSheet({
  isOpen,
  onClose,
  setInterests,
  interests,
}) {
  const [forms, setForms] = useState([{text: '', id: 0}]);

  useEffect(() => {
    if (isOpen && interests.length > 0) {
      setForms(interests);
    }
  }, [isOpen, interests]);

  const handleInputChange = (index, value) => {
    setForms(prevForms => {
      const updatedForms = [...prevForms];
      updatedForms[index] = {...updatedForms[index], text: value};
      return updatedForms;
    });
  };

  return (
    <ActionSheet style={{flex: 1}} isOpen={isOpen} onClose={onClose}>
      <ActionSheet.Content
        style={{
          width: '100%',
          backgroundColor: getColor({color: 'background.500'}),
        }}>
        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 16,
            }}>
            <Typography mb={6} alignSelf={'center'} fontWeight={'bold'}>
              Interests
            </Typography>
            <Form>
              {forms?.map((form, index) => (
                <FormTextInput
                  key={index.toString()}
                  mb={4}
                  name={`title${index}`}
                  placeholder="Title"
                  value={form.text}
                  onChangeText={value => handleInputChange(index, value)}
                />
              ))}
              <Pressable
                style={{
                  width: 80,
                }}
                onPress={() => {
                  if (forms?.length < 5) {
                    setForms(prevForms => [
                      ...prevForms,
                      {text: '', id: prevForms?.at(-1)?.id + 1},
                    ]);
                  }
                }}>
                {forms?.length < 5 && (
                  <Typography color={'secondary.500'} fontSize="sm">
                    + Add new
                  </Typography>
                )}
              </Pressable>
              <HStack
                mt={8}
                space={4}
                width="100%"
                justifyContent={'center'}
                alignItems={'center'}>
                <Button onPress={onClose} variant={'outline'} flex={1}>
                  Cancel
                </Button>
                <SubmitButton
                  backgroundColor={'primary.400'}
                  flex={1}
                  onPress={() => {
                    const updatedInterests = forms.filter(
                      form => form.text !== '',
                    );

                    setInterests(prev => [...updatedInterests]);
                    onClose();
                  }}>
                  Save
                </SubmitButton>
              </HStack>
            </Form>
            {useKeyboardVisible() && <View style={{height: 300}} />}
          </View>
        </ScrollView>
      </ActionSheet.Content>
    </ActionSheet>
  );
}
