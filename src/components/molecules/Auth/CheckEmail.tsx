import {Button, HStack, ScrollView} from 'native-base';
import React, {Fragment, useState} from 'react';
import {Alert, View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {CheckMailIcon} from '../../elemental';
import useNavigate from '../../elemental/hooks/use_navigate';
import Typography from '../../atoms/Typography';
import styles from './CheckEmail.styles';
import {firebase} from '@react-native-firebase/auth';

export interface CheckEmailProps {}

const CheckEmail = ({}: CheckEmailProps) => {
  const {params}: any = useRoute();
  const {navigateWithName} = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const isConfirmation = params?.item?.confirmation ?? false; //false means we should display reset password caption

  const title = 'Check your Mail';

  const description = isConfirmation
    ? 'We have sent a link to verified your email address.'
    : 'We have sent password recovery instructions to your email.';

  const resendVerification = async () => {
    setIsLoading(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(params?.email, params?.password)
      .then(async res => {
        res.user?.sendEmailVerification();
        setIsLoading(false);
        Alert.alert('Verification email sent. please check your email.');
      })
      .catch(err => {
        Alert.alert(String(err).replace(/\[.*\]/g, '')), setIsLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.Container}>
        <Typography style={styles.HeaderText}>{title}</Typography>
        <Typography style={styles.DescriptionText}>{description}</Typography>
        <View style={styles.FormWrapper}>
          <CheckMailIcon />
        </View>

        {!isConfirmation ? (
          <Button
            variant="link"
            colorScheme="darkBlue"
            onPress={() => navigateWithName('ResetPassword')}
            style={styles.btnTitle}>
            Try another email address
          </Button>
        ) : (
          <Fragment>
            <Button
              onPress={() => navigateWithName('signin')}
              style={styles.loginBTN}
              isLoading={isLoading}>
              Log in
            </Button>
            <Button
              variant="unstyled"
              colorScheme="darkBlue"
              style={styles.btnTitle}
              onPress={() => resendVerification()}>
              <HStack>
                <Typography color={'gray.800'} fontSize="sm">
                  Didn’t receive Email ?{' '}
                </Typography>
                <Typography color={'secondary.500'} fontSize="sm">
                  Try again
                </Typography>
              </HStack>
            </Button>
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
};

export default CheckEmail;
