import React from 'react';
import {useQueryClient} from 'react-query';
import {
  Button,
  Form,
  HStack,
  Typography,
  getColor,
  CustomFormInput,
  useKeyboard,
  Layer,
  deviceHeight,
  ScrollView,
} from '~/components/elemental';
import {getTextColor} from '~/theme';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';

import {useCreateQuestion} from '~/components/organisms/CourseList/hook';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  hasReview?: boolean;
  itemName?: string;
  id: number;
  hasTitle?: boolean;
  targetName: 'Event' | 'Product' | 'Post' | 'Content' | 'Service' | 'course';
}

const schema = yup.object().shape({
  question: yup.string(),
});

export default function AskQuestionModal({
  isOpen,
  onClose,
  hasReview,
  id,
}: IProps) {
  const queryClient = useQueryClient();
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const {handleSubmit, register, reset, control} = methods;

  const {keyboardHeight, keyboardVisible} = useKeyboard();

  const {mutate, isLoading} = useCreateQuestion();

  const onSubmit = data => {
    mutate(
      {lessonTopicId: id, question: data?.question},
      {
        onSuccess(data) {
          reset();
          queryClient.invalidateQueries('getCourses');
          onClose?.();
        },
      },
    );
  };

  return (
    <CustomActionSheet isVisible={isOpen} onClose={onClose}>
      <ScrollView
        contentContainerStyle={styles.container}
        maxHeight={deviceHeight / 2.9}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} accessible={false}>
          <Typography
            color={getTextColor(getColor({color: 'background.500'}))}
            style={styles.titleSheet}>
            Ask a Question
          </Typography>

          <Form style={styles.inputView}>
            {hasReview && (
              <Layer keyboardAvoidingView behavior="position">
                <CustomFormInput
                  {...register('question')}
                  required
                  control={control}
                  name={'question'}
                  placeholder="Input Text Here"
                  label="Write Your Question"
                  keyboardType="default"
                  textArea
                />
              </Layer>
            )}

            <HStack
              mt={8}
              space={4}
              width={'100%'}
              marginBottom={keyboardVisible ? keyboardHeight : 0}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Button
                onPress={onClose}
                style={styles.btn}
                _text={{lineHeight: 15}}
                variant={'outline'}>
                <Typography color={'primary.500'} style={styles.submitTxt}>
                  Maybe Later
                </Typography>
              </Button>
              <Button
                isLoading={isLoading}
                onPress={handleSubmit(onSubmit)}
                _text={{lineHeight: 16}}
                style={styles.btn}>
                <Typography color={'#fff'} style={styles.submitTxt}>
                  Submit
                </Typography>
              </Button>
            </HStack>
          </Form>
        </TouchableOpacity>
      </ScrollView>
    </CustomActionSheet>
  );
}

const styles = StyleSheet.create({
  submitTxt: {fontSize: 14, fontWeight: '700', lineHeight: 16},
  btn: {
    flex: 1,
    height: 36,
  },
  inputView: {
    width: '100%',
    marginVertical: 16,
  },
  titleSheet: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
});
