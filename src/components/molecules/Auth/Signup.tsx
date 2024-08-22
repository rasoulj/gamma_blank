import {yupResolver} from '@hookform/resolvers/yup';
import {firebase} from '@react-native-firebase/auth';
import {Checkbox, ScrollView} from 'native-base';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Platform, TouchableOpacity, View, ViewStyle} from 'react-native';
import * as yup from 'yup';
import {AppleIcon, Facebook2Icon, Google2Icon, GradientIcon} from '~/assets';
import {
  Button,
  CustomFormInput,
  Header,
  MatchAccount,
  Typography as Text,
  Typography,
  VStack,
  useNavigate,
  useToast,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import {
  onAppleButtonPress,
  onFacebookButtonPress,
  onGoogleButtonPress,
} from '~/utils/SocialAuthentication';
import {model} from '../../../data/model';
import useAuth from '../../elemental/hooks/useAuth';
import EditProfile from '../EditProfile';
import styles from './Signup.styles';
export interface SingUpProps {
  title: string;
  description: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onClickTerms?: () => void;
  onClickSignIn?: () => void;
  gql?: string;
  inputs?: Array<{name: string; placeholder: string}>;
  style: ViewStyle;
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
  matching?: boolean;
  fullProfile?: boolean;
  securePassword?: boolean;
}

let DEFAULT_AUTH_CONFIG = {
  isConfig: true,
  confirmation: {
    email: false,
    phone: false,
  },
  social: {
    apple: true,
    google: true,
    facebook: true,
  },
  fields: [],
  terms: true,
}

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const confirmationWith = model?.metaData?.configs?.authConfig?.confirmation
  ?.email
  ? 'email'
  : model?.metaData?.configs?.authConfig?.confirmation?.phone
  ? 'phone'
  : 'none';

enum Screen {
  SignUp = 'SignUp',
  AddProfile = 'AddProfile',
  MatchAccount = 'MatchAccount',
}

const SingUp = ({
  title = 'Create Account',
  description = 'Please create account to continue.',
  onSuccess,
  onError,
  onClickTerms,
  onClickSignIn,
  gql,
  inputs = [
    {name: 'fullName', placeholder: 'Name'},
    {name: 'email', placeholder: 'Email'},
    {name: 'password', placeholder: 'Password'},
  ],
  style = {},
  preAction,
  postAction,
  matching,
  fullProfile,
}: SingUpProps) => {
  const [screen, setScreen] = useState(Screen.AddProfile);

  switch (screen) {
    case Screen.SignUp: {
      return (
        <CustomSignUp
          {...{
            title,
            description,
            inputs,
            style,
            preAction,
            postAction,
            onClickSignIn,
            onClickTerms,
            onError,
            onSuccess: () => setScreen(Screen.AddProfile),
          }}
        />
      );
    }
    case Screen.AddProfile: {
      if (fullProfile) {
        return (
          <>
            <Header title="Add Profile" />
            <EditProfile age about interest hasNextButton />
          </>
        );
      } else {
        setScreen(Screen.SignUp);
      }
    }
    case Screen.MatchAccount: {
      if (matching) {
        return <MatchAccount />;
      }
      break;
    }
    default:
      return (
        <CustomSignUp
          {...{
            title,
            description,
            inputs,
            style,
            preAction,
            postAction,
            onClickSignIn,
            onClickTerms,
            onError,
            onSuccess,
          }}
        />
      );
  }
};

export default SingUp;

function CustomSignUp({
  title,
  description,
  onSuccess,
  onError,
  onClickTerms,
  onClickSignIn,
  gql,
  inputs,
  style,
  preAction,
  postAction,
  securePassword = true,
}: SingUpProps) {
  const schema = yup.object().shape({
    email:
      confirmationWith !== 'phone'
        ? yup.string().email().required('Required')
        : yup.string().email(),
    phoneNumber:
      confirmationWith === 'phone'
        ? yup.string().required('Required')
        : yup.string(),
    password:
      confirmationWith === 'phone'
        ? yup.string()
        : securePassword
        ? yup
            .string()
            .matches(passwordRules, {
              message:
                'Password must contain atleast 8 charachters At least one upper case At least one lower case',
            })
            .required('Required')
        : yup.string().required('Required').min(6).max(32),

    fullName: yup.string(),
  });
  const setToken = useAuthStore(state => state?.setToken);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const {navigateWithName} = useNavigate();
  const {signUp, isSignUpLoading, signUpUser, refetch} = useAuth();

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    register,
    formState: {errors},
    control,
  } = methods;

  let AuthModel = model?.metaData?.configs?.authConfig || DEFAULT_AUTH_CONFIG
  const LoginWithSocialMedia = (token, email, fullName) => {
    setToken(token);
    setIsLoading(false);
    
    signUp({email, fullName, firebaseToken: token}).then(() => refetch());
  };
  const onSubmit = async (data: any) => {
    if (!acceptTerms) {
      Alert.alert('Info', 'Please accept terms and conditions', [{text: 'OK'}]);
      return;
    }
    const result = await preAction?.(data);
    if (result === false) {
      return;
    }
    setIsLoading(true);

    if (confirmationWith === 'email') {
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
          res.user.emailVerified
            ? Alert.alert('User already exist')
            : res.user.sendEmailVerification();
          setIsLoading(false);
        })
        .catch(async err => {
          if (String(err).includes('user-not-found')) {
            const response = await firebase
              .auth()
              .createUserWithEmailAndPassword(data.email, data.password)
              .then(async res => {
                res.user.sendEmailVerification();
                const token = await res?.user?.getIdToken();
                setToken(token);
                signUpUser({
                  fullName: data?.fullName,
                  phoneNumber: data?.phoneNumber,
                });
                setIsLoading(false);
              })
              .then(() => {
                navigateWithName('checkemail', {
                  item: {confirmation: true},
                  email: data.email,
                  password: data.password,
                });
                setIsLoading(false);
              })
              .catch(error => {
                Alert.alert(String(error.message).replace(/\[.*\]/g, ''));
                setIsLoading(false);
              });
          } else {
            Alert.alert(String(err).replace(/\[.*\]/g, ''));
            setIsLoading(false);
          }
        });
    }
    if (confirmationWith === 'phone') {
      const verifyPhoneNumber = await firebase
        .auth()
        .signInWithPhoneNumber(data?.phoneNumber)
        .then(a => {
          setConfirm(a);
          setIsLoading(false);
        })
        .catch(err => {
          Alert.alert(String(err?.message).replace(/\[.*\]/g, ''));
          setIsLoading(false);
        });
    }
    if (confirmationWith === 'none') {
      signUp({
        email: data?.email,
        password: data?.password,
        fullName: data?.fullName,
        phoneNumber: data?.phoneNumber,
      }).then(() => {
        postAction?.(data);
        setIsLoading(false);
      });
    }
  };

  async function confirmCode(data) {
    try {
      if (!acceptTerms) {
        Alert.alert('Info', 'Please accept terms and conditions', [
          {text: 'OK'},
        ]);
        return;
      }
      const res = await confirm.confirm(data?.code);
      if (res) {
        const token = await firebase.auth().currentUser.getIdToken();
        setToken(token);
        signUpUser({fullName: data?.fullName, phoneNumber: data?.phoneNumber});
      }
    } catch (error) {
      Alert.alert('Invalid code.');
    }
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
      <View style={[styles.Container]}>
        <Typography style={styles.ContainerText}>{title}</Typography>
        <Typography style={styles.containerDescription}>
          {description}
        </Typography>
        <VStack style={styles.FormWrapper}>
          {AuthModel?.fields?.filter(item => item === 'name') && (
            <CustomFormInput
              {...register('fullName')}
              placeholder="Name"
              label="Name"
              control={control}
            />
          )}
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
              disabled={confirm}
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
          {AuthModel?.terms && (
            <View style={styles.ExtraWrapper}>
              <Checkbox
                accessibilityLabel="user"
                isChecked={acceptTerms}
                onChange={isSelected => setAcceptTerms(isSelected)}
              />
              <Typography style={styles.iAgreeText}>I agree to the </Typography>
              <Button
                variant="link"
                marginY={1}
                ml="-10px"
                onPress={() => navigateWithName('term')}
                colorScheme="darkBlue">
                Terms & Conditions
              </Button>
            </View>
          )}

          <Button
            variant="solid"
            marginY={2}
            h={49}
            bgColor={
              AuthModel?.terms && !acceptTerms ? 'gray.300' : 'primary.500'
            }
            isLoading={isSignUpLoading || isLoading}
            disabled={AuthModel?.terms && !acceptTerms}
            onPress={
              confirm ? handleSubmit(confirmCode) : handleSubmit(onSubmit)
            }>
            {confirm ? 'Confirm' : 'Create account'}
          </Button>
        </VStack>
        <View style={styles.flex} />
        <>
          {(AuthModel?.social?.apple ||
            AuthModel?.social?.facebook ||
            AuthModel?.social?.google) && (
            <View style={styles.orContinue}>
              <GradientIcon width={206} height={3} />
              <Typography color={'gray.500'} style={styles.orContinueText}>
                Or continue with
              </Typography>
              <GradientIcon
                width={206}
                height={3}
                style={styles.gradiantIcon}
              />
            </View>
          )}
          <View style={styles.socialContainer}>
            {AuthModel?.social?.google && (
              <TouchableOpacity
                onPress={() => [
                  setIsLoading(true),
                  onGoogleButtonPress()
                    .then(res =>
                      res.user
                        .getIdToken()
                        .then(token =>
                          LoginWithSocialMedia(
                            token,
                            res?.additionalUserInfo?.profile?.email,
                            res?.additionalUserInfo?.profile?.name,
                          ),
                        ),
                    )
                    .catch(err => [setIsLoading(false)]),
                ]}
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
            )}
            {Platform?.OS === 'ios' && AuthModel?.social?.apple && (
              <TouchableOpacity
                onPress={() => [
                  setIsLoading(true),
                  onAppleButtonPress()
                    .then(res =>
                      res.user
                        .getIdToken()
                        .then(token =>
                          LoginWithSocialMedia(
                            token,
                            res?.additionalUserInfo?.profile?.email,
                            res?.additionalUserInfo?.profile?.name,
                          ),
                        ),
                    )
                    .catch(err => [setIsLoading(false)]),
                ]}
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
            )}
            {AuthModel?.social?.facebook && (
              <TouchableOpacity
                onPress={() => [
                  setIsLoading(true),
                  onFacebookButtonPress()
                    .then(res =>
                      res.user
                        .getIdToken()
                        .then(token =>
                          LoginWithSocialMedia(
                            token,
                            res?.additionalUserInfo?.profile?.email,
                            res?.additionalUserInfo?.profile?.name,
                          ),
                        ),
                    )
                    .catch(err => [setIsLoading(false)]),
                ]}
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
            )}
          </View>
        </>
        <View style={styles.CreateAccountWrapper}>
          <Text style={styles.CreateAccount}>Already have an account?</Text>
          <Button
            variant="link"
            colorScheme="darkBlue"
            onPress={() => {
              navigateWithName('sign in');
              onClickSignIn?.();
            }}>
            <Typography color={'secondary.500'} style={styles.loginText}>
              Log in
            </Typography>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
