import React, {useState} from 'react';
import {
  View,
  Typography as Text,
  Input,
  Button,
  useNavigate,
  useToast,
  useRoute,
  Typography,
} from '~/components/elemental';
import {KeyboardAvoidingView, ScrollView} from 'native-base';
import {Platform, ViewStyle} from 'react-native';
import styles from './ResetPass.styles';

import auth from '@react-native-firebase/auth';
import {ResetPasswordIcon} from '~/assets';

export interface ResetPassProps {
  title: string;
  description: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  style?: ViewStyle;
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}

const ResetPass = ({
  title = 'Reset Your Password',
  description = 'Enter your email and we’ll send you a link to reset your password.',
  style = {},
  preAction,
  postAction,
}: ResetPassProps) => {
  const route: any = useRoute();
  console.log(route?.params?.item?.email);

  const {navigateWithName} = useNavigate();
  const {toast} = useToast();
  const [email, setEmail] = useState(route?.params?.item?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    const result = await preAction?.(email);
    if (result === false) {
      return;
    }
    setIsLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(user => {
        console.log(user);
        setTimeout(() => {
          navigateWithName('checkemail');
        }, 1000);
        setIsLoading(false);
        postAction?.(email);
      })
      .catch(function (e) {
        setIsLoading(false);
        console.log(e);
        if (String(e).includes('[auth/user-not-found]')) {
          toast({message: 'Error: User not found'});
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={[styles.Container, style]}>
        <Text fontWeight="bold" fontSize="xl" style={styles.title}>
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <ResetPasswordIcon />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 20}
          style={styles.content}>
          <Typography style={{fontSize: 16, fontWeight: '500'}}>
            Email
          </Typography>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            marginY={1}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Button
            isLoading={isLoading}
            variant="solid"
            marginY={3}
            onPress={() => onSubmit()}>
            Continue
          </Button>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ResetPass;
