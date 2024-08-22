import {yupResolver} from '@hookform/resolvers/yup';
import {firebase} from '@react-native-firebase/auth';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import {
  Button,
  CloseIconSet,
  CustomFormInput,
  Layer,
  TickIconSet,
  Typography,
  getColor,
  useNavigate,
  useToast,
} from '~/components';
import useAuthStore from '~/stores/authStore';
import {useUpdateUser} from './hook';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const ChangePassword = ({}: {}) => {
  const {toast} = useToast();
  const {navigateWithName} = useNavigate();
  const localUser = useAuthStore(state => state?.user);
  const setUser = useAuthStore(state => state?.setUser);
  const schema = yup.object().shape({
    currentPassword: yup.string().required('Required'),
    newPassword: yup
      .string()
      .matches(passwordRules, {
        message: 'Please create a stronger password',
      })
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, control, watch} = methods;
  const {mutate, isLoading} = useUpdateUser();

  const currentPassword = watch('newPassword');
  const handleUpdatePassword = async data => {
    const userData = {
      invited: true,
      updatePassword: false,
    };
    const userInput = {
      data: JSON?.stringify(userData),
    };
    try {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        data?.currentPassword,
      );

      await user.reauthenticateWithCredential(credential);
      await user
        .updatePassword(data?.newPassword)
        .then(() => {
          mutate(
            {userId: localUser?.id, userInput},
            {
              onSuccess(data) {
                console.log('data', data);

                if (data?.user_updateUser?.status?.code === 1) {
                  setUser({...localUser, UpdatePassword: false});
                  navigateWithName('setting');
                  toast({message: 'Password changed successfully.'});
                }
              },
            },
          );
        })
        .catch(err => {
          toast({message: err});
        });
    } catch (error) {
      toast({message: error.message});
    }
  };

  const validatePassword = value => {
    const Min6Regex = /^.{6,}$/;
    const isMin6Password = Min6Regex.test(value);
    // const upperAndLowerCaseRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]+$/;
    // const isupperAndLowerCase = upperAndLowerCaseRegex.test(value);
    const SpecialRegex = /^(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
    const isHaveSpecialPassword = SpecialRegex.test(value);

    return [
      {
        label: '6 charachters',
        description: 'At least 6 charachters',
        isValid: value ? isMin6Password : null,
      },
      {
        label: 'Special Charachters',
        description: 'Use of Special Charachters: !@#$%^&*()_+',
        isValid: value ? isHaveSpecialPassword : null,
      },
    ];
  };

  return (
    <View style={styles.container}>
      <Typography style={styles.title}>
        Your password must be at least 6 characters and should include a
        combination of numbers, letters and special characters (!@#$%)
      </Typography>
      <CustomFormInput
        {...register('currentPassword')}
        placeholder="Current Password"
        type="password"
        label="Current Password"
        securePassword={true}
        control={control}
      />
      <CustomFormInput
        {...register('newPassword')}
        placeholder="New Password"
        type="password"
        label="New Password"
        securePassword={true}
        control={control}
      />
      <CustomFormInput
        {...register('confirmPassword')}
        type="password"
        placeholder="Re-type new password"
        label="Re-type new password"
        securePassword={true}
        control={control}
      />
      <Layer style={styles.mt}>
        {validatePassword(currentPassword).map(item => {
          return (
            <Layer style={styles.rowView}>
              <Layer
                style={[
                  styles.content,
                  {
                    backgroundColor: getColor({
                      color:
                        item.isValid === null
                          ? 'gray.300'
                          : item.isValid
                          ? 'green.500'
                          : 'error.500',
                    }),
                  },
                ]}>
                {item.isValid ? (
                  <TickIconSet color={'#fff'} width={16} height={16} />
                ) : (
                  <CloseIconSet color={'#fff'} width={16} height={16} />
                )}
              </Layer>
              <Typography
                numberOfLines={1}
                fontSize="sm"
                fontWeight={'500'}
                color={
                  item.isValid === null
                    ? 'gray.300'
                    : item.isValid
                    ? 'green.500'
                    : 'error.500'
                }
                flex={1}>
                {item.description}
              </Typography>
            </Layer>
          );
        })}
      </Layer>
      <Button
        isLoading={isLoading}
        style={styles.btn}
        onPress={handleSubmit(handleUpdatePassword)}>
        Change password
      </Button>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  title: {
    marginVertical: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
  container: {flex: 1},
  mt: {marginTop: 16},
  btn: {width: '100%', position: 'absolute', bottom: 10},
  rowView: {flexDirection: 'row', alignItems: 'center'},
  content: {
    padding: 3,
    borderRadius: 100,
    marginVertical: 4,
    marginHorizontal: 8,
  },
});
