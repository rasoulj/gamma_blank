import {yupResolver} from '@hookform/resolvers/yup';
import {ScrollView} from 'native-base';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import * as yup from 'yup';
import SupportIcon from '~/assets/icons/CustomIcons/Support.icon';
import {
  Button,
  CustomFormInput,
  Image,
  Layer,
  Typography,
  deviceWidth,
  useNavigate,
  useToast,
} from '~/components/elemental';
import {useSupportEmail} from './hook';

type SupportProps = {
  email: string;
  image?: any;
  description?: string;
};

const schema = yup.object().shape({
  toEmailAddress: yup.string(),
  subject: yup.string().required('Required'),
  plainTextContent: yup.string().required('Required'),
});

export default function MessageSupport({
  image,
  description,
  email,
}: SupportProps) {
  const {navigateWithName} = useNavigate();

  const {toast} = useToast();

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      colors: [],
      price: 1,
    },
  });
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = methods;

  const initialSupportProps = {
    image:
      'https://apsygammastorage.blob.core.windows.net/images/jCx1MmN7kp.jpg',
    description:
      'Please write your problem here and send it to us, we will respond as soon as possible.',
  };

  const {mutate, isLoading} = useSupportEmail();
  function submitForm(values) {
    const input = {
      toEmailAddress: email,
      subject: values?.subject,
      plainTextContent: values?.plainTextContent,
      htmlContent: values?.plainTextContent,
    };
    mutate(input, {
      onSuccess(data) {
        toast({message: 'Message send!'});
        navigateWithName('Settings');
      },
      onError(error) {
        console.log({error});
        toast({message: error.toString()});
      },
    });
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <FormProvider {...methods}>
          <Layer style={styles.imageContainer}>
            {image ? (
              <Image
                src={
                  typeof image === 'string' ? image : initialSupportProps?.image
                }
                style={styles.image}
              />
            ) : (
              <SupportIcon />
            )}
            <Typography fontSize="sm">
              {description ? description : initialSupportProps?.description}
            </Typography>
          </Layer>

          <Layer style={styles.inputs}>
            <CustomFormInput
              {...register('subject')}
              placeholder="Title"
              label="Title"
            />

            <CustomFormInput
              {...register('plainTextContent')}
              placeholder="Write something ..."
              label="Your Message"
              textArea
            />

            <Button
              isLoading={isLoading}
              style={{marginTop: 30, bottom: 10}}
              onPress={handleSubmit(submitForm)}>
              Send
            </Button>
          </Layer>
        </FormProvider>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  image: {
    width: deviceWidth * 0.7,
    height: deviceWidth * 0.7,
    resizeMode: 'contain',
    marginTop: 30,
    marginBottom: 10,
  },
  inputs: {marginHorizontal: 5, marginTop: 10, flex: 1},
});
