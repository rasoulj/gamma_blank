import React, {useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {firebase} from '@react-native-firebase/auth';
import {ScrollView} from 'native-base';
import {useForm} from 'react-hook-form';
import {Alert, Platform, TouchableOpacity, View, ViewStyle} from 'react-native';
import * as yup from 'yup';
import {AppleIcon, Facebook2Icon, Google2Icon, GradientIcon} from '~/assets';
import {
  Button,
  Checkbox,
  CustomFormInput,
  Layer,
  Typography as Text,
  Typography,
  useNavigate,
} from '~/components/elemental';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import {
  onAppleButtonPress,
  onFacebookButtonPress,
  onGoogleButtonPress,
} from '~/utils/SocialAuthentication';
import useAuth from '../../elemental/hooks/useAuth';
import styles from './Signin.styles';
import mustHaveGuestMode from '~/utils/mustHaveGuestMode';
import CustomCheckBox from '~/components/atoms/CustomCheckBox';
export interface SingInProps {
  title: string;
  description: string;
  onClickCreateAccount?: () => void;
  style?: ViewStyle;
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}

const authConfig = model?.metaData?.configs?.authConfig;
const {email, phone} = authConfig?.confirmation || {};
const {apple, facebook, google} = authConfig?.social || {};
const confirmationWith = email ? 'email' : phone ? 'phone' : 'none';

const schema = yup.object().shape({
  email:
    confirmationWith !== 'phone'
      ? yup.string().email().required('Required')
      : yup.string(),
  phoneNumber:
    confirmationWith === 'phone'
      ? yup.string().required('Required')
      : yup.string(),
  password:
    confirmationWith === 'phone'
      ? yup.string()
      : yup.string().required('Required').min(6).max(32),
});

const guestMode = mustHaveGuestMode();
const SingIn = ({
  title = 'Log in',
  description = `Welcome to your app! Use your email or phone number to Log in.`,
  onClickCreateAccount,
  style = {},
  preAction,
  postAction,
}: SingInProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const {navigateWithName} = useNavigate();
  const {login, isLoginLoading, refetch} = useAuth();
  const rememberMe = useAuthStore(state => state.rememberMe);
  const setRememberMe = useAuthStore(state => state.setRememberMe);
  const rememberData = useAuthStore(state => state.rememberData);
  const setRememberData = useAuthStore(state => state.setRememberData);
  const setToken = useAuthStore(state => state.setToken);
  const setIsUserLoggedIn = useAuthStore(state => state.setIsUserLoggedIn);
  const setIsIntroVisited = useAuthStore(state => state?.setIsIntroVisited);
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      email: rememberData?.email,
      phoneNumber: rememberData?.phoneNumber,
      password: rememberData?.password,
    },
  });

  const {handleSubmit, register, control, getValues} = methods;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.Container, style]}>
        <Typography style={styles.screenTitle}>{title}</Typography>
        <Typography style={styles.screenDesc}>{description}</Typography>
        <View style={styles.FormWrapper}>
          {confirmationWith !== 'phone' && (
            <CustomFormInput
              {...register('email')}
              placeholder="Email"
              label="Email"
              control={control}
            />
          )}
          {confirmationWith === 'phone' && (
            <CustomFormInput
              {...register('phoneNumber')}
              placeholder="Phone number (+1...)"
              keyboardType="phone-pad"
              label="Phone number"
              control={control}
            />
          )}
          {confirmationWith !== 'phone' && (
            <CustomFormInput
              {...register('password')}
              placeholder="Password"
              securePassword
              type="password"
              label="Password"
              control={control}
            />
          )}
          {confirmationWith === 'phone' && confirm && (
            <CustomFormInput
              {...register('code')}
              placeholder="Confirmation Code"
              keyboardType="number-pad"
              label="Confirmation Code"
              control={control}
            />
          )}
          <Layer style={styles.rowLayer}>
            <Layer style={styles.rowView}>
              <CustomCheckBox
                label={'Remember me'}
                isChecked={rememberMe}
                onToggle={() => setRememberMe(!rememberMe)}
              />
            </Layer>
            {confirmationWith !== 'phone' && (
              <Button
                variant="link"
                marginRight={-2}
                alignSelf="flex-end"
                colorScheme="darkBlue"
                onPress={() =>
                  navigateWithName('reset password', {
                    item: {email: getValues('email')},
                  })
                }>
                Forgot Password?
              </Button>
            )}
          </Layer>

          <Button
            variant="solid"
            style={styles.btnHeight}
            isLoading={isLoginLoading || isLoading}
            marginTop={6}
            onPress={
              confirm ? handleSubmit(confirmCode) : handleSubmit(onSubmit)
            }>
            {confirm ? 'Confirm' : 'Log in'}
          </Button>
          {guestMode && (
            <TouchableOpacity
              onPress={() => {
                setIsUserLoggedIn(true);
                setIsIntroVisited(true);
              }}>
              <Typography color={'secondary.500'} style={styles.guestMode}>
                Enter as a guest
              </Typography>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.ExtraWrapper}>
          {(apple || facebook || google) && (
            <View style={styles.socialView}>
              <GradientIcon width={206} height={3} />
              <Typography color={'gray.500'} style={{marginHorizontal: 10}}>
                Or continue with
              </Typography>
              <GradientIcon
                width={206}
                height={3}
                style={styles.gradientIcon}
              />
            </View>
          )}

          <View style={styles.socialIcons}>
            {google && renderGoogleLogin()}
            {Platform?.OS === 'ios' && apple && renderAppleLogin()}
            {facebook && renderFacebookLogin()}
          </View>

          <View style={styles.CreateAccountWrapper}>
            <Text style={styles.CreateAccount}>New user?</Text>
            <Button
              variant="link"
              colorScheme="darkBlue"
              onPress={() => {
                navigateWithName('sign up');
                onClickCreateAccount?.();
              }}>
              <Typography color={'secondary.500'} style={styles.signup}>
                Create an account
              </Typography>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  async function onSubmit(data: any) {
    const result = await preAction?.(data);

    if (result === false) return false;

    if (confirmationWith === 'email') {
      setIsLoading(true);

      await firebase
        .auth()
        .signInWithEmailAndPassword(data?.email, data?.password)
        .then(async res => {
          const token = await res.user.getIdToken();
          setToken(token);
          if (rememberMe) {
            setRememberData({email: data?.email, password: data?.password});
          } else {
            setRememberData(null);
          }

          res?.user?.emailVerified
            ? refetch()
            : Alert.alert(
                'Your email has not been verified',
                'Send email verification?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => setIsLoading(false),
                  },
                  {
                    text: 'Send',
                    onPress: () => [
                      res.user?.sendEmailVerification(),
                      setIsLoading(false),
                    ],
                  },
                ],
              );
        })
        .catch(err => {
          Alert.alert(String(err).replace(/\[.*\]/g, '')), setIsLoading(false);
        });
    }

    if (confirmationWith === 'phone') {
      setIsLoading(true);

      const verifyPhoneNumber = await firebase
        .auth()
        .signInWithPhoneNumber(data?.phoneNumber)
        .then(a => {
          setConfirm(a);
          if (rememberMe) {
            setRememberData({phoneNumber: data?.phoneNumber});
          } else {
            setRememberData(null);
          }
          setIsLoading(false);
        })
        .catch(err => {
          Alert.alert(String(err?.message).replace(/\[.*\]/g, ''));
          setIsLoading(false);
        });
    }

    if (confirmationWith === 'none') {
      login({email: data?.email, password: data?.password}).then(() => {
        postAction?.(data);
      });
    }
  }

  function renderGoogleLogin() {
    return (
      <TouchableOpacity
        onPress={() => handleSocialLogin(onGoogleButtonPress)}
        style={[
          styles.socialButton,
          {
            backgroundColor: '#fff',
            borderColor: '#E6E6E6',
            borderWidth: 1,
          },
        ]}>
        <Google2Icon />
      </TouchableOpacity>
    );
  }

  function renderAppleLogin() {
    return (
      <TouchableOpacity
        onPress={() => handleSocialLogin(onAppleButtonPress)}
        style={[
          styles.socialButton,
          {
            backgroundColor: '#24242B',
            borderColor: '#24242B',
            borderWidth: 1,
          },
        ]}>
        <AppleIcon />
      </TouchableOpacity>
    );
  }

  function renderFacebookLogin() {
    return (
      <TouchableOpacity
        onPress={() => handleSocialLogin(onFacebookButtonPress)}
        style={[
          styles.socialButton,
          {
            backgroundColor: '#3975EB',
            borderColor: '#3975EB',
            borderWidth: 1,
          },
        ]}>
        <Facebook2Icon />
      </TouchableOpacity>
    );
  }

  function handleSocialLogin(fn: Function) {
    setIsLoading(true);

    fn()
      .then(res => res.user.getIdToken().then(loginWithSocialMedia))
      .catch(err => [setIsLoading(false)]);
  }

  async function loginWithSocialMedia(token: string) {
    setToken(token);
    setIsLoading(false);
    refetch();
  }

  async function confirmCode(data) {
    try {
      const res = await confirm.confirm(data?.code);
      if (res) {
        const token = await firebase.auth().currentUser.getIdToken();
        setToken(token);
        refetch();
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      Alert.alert('Invalid code.');
    }
  }
};

export default SingIn;
