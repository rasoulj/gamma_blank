import React, {Fragment, useEffect, useState} from 'react';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useQueryClient} from 'react-query';

import {useNavigation} from '@react-navigation/native';
import {
  Typography,
  useToast,
  verticalScale,
  SelectImage,
  CustomFormInput,
  SubmitButton,
  getColor,
  CloseIconSet,
  LoadIndicator,
  VStack,
  Input,
} from '~/components/elemental';

import useAuthStore from '~/stores/authStore';
import {
  Accordion,
  AddIconSet,
  MinusIcon,
  UploadFile,
  View,
  scale,
  useAuth,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {useUpdateProfile} from '~/components/molecules/EditProfile/hooks';
import {TouchableOpacity} from 'react-native';
import {
  useUpdateCertificate,
  useUpdateSpecialties,
} from '../../CourseList/hook';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';
import {useGetUserCertificates} from '../../CourseList/hook';
import {useGetUserSpecialties} from '../../CourseList/hook';
import {
  validateFacebookUrl,
  validateInstagramUrl,
  validateLinkedInUrl,
  validateYouTubeUrl,
} from '~/utils/helper';

const schema = yup.object().shape({
  fullName: yup.string().required('Required'),
  specialities: yup.array().required('Required'),
  about: yup.string().required('Required'),
  profession: yup.string().required('Required'),
  instagramLink: yup
    .string()
    .test(function (value) {
      if (!value) return true;
      return validateInstagramUrl(value);
    })
    .nullable(true),
  facebookLink: yup
    .string()
    .test(function (value) {
      if (!value) return true;
      return validateFacebookUrl(value);
    })
    .nullable(true),
  youtubeLink: yup
    .string()
    .test(function (value) {
      if (!value) return true;
      return validateYouTubeUrl(value);
    })
    .nullable(true),
  linkedinLink: yup
    .string()
    .test(function (value) {
      if (!value) return true;
      return validateLinkedInUrl(value);
    })
    .nullable(true),
  certificates: yup.array().required('Required'),
  photoUrl: yup.string(),
});

const EducatorEditProfile = ({
  edit = true,
  buttonText,
}: {
  edit: any;
  buttonText?: string;
}) => {
  const isIntroVisited = useAuthStore(state => state?.isIntroVisited);

  const [text, setText] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState(0);

  const setUser = useAuthStore(state => state?.setUser);
  const userDate = useAuthStore(state => state?.user);

  const {mutateAsync: updateProfile, isLoading: isLoadingProfile} =
    useUpdateProfile();

  const {mutate: updateSpecialties} = useUpdateSpecialties();

  const {mutate: updateCertificate} = useUpdateCertificate();

  const {data} = useGetUserCertificates({
    userId: userDate?.id,
  });
  const {data: specialtiesData} = useGetUserSpecialties({
    userId: userDate?.id,
  });

  const navigate = useNavigation();
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const {user, isLoading}: any = useAuth();
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    values: {
      fullName: user?.fullName,
      streetAddress: user?.streetAddress,
      unitNumber: user?.unitNumber,
      city: user?.city,
      state: user?.state,
      zipCode: user?.zipCode,
      age: user?.age,
      location: user?.location,
      about: user?.about,
      photoUrl: user?.photoUrl || '',
      username: user?.username,
      profession: user?.profession,
      instagramLink: JSON.parse(user?.socialLinks ?? '[]')[0],
      facebookLink: JSON.parse(user?.socialLinks ?? '[]')[1],
      youtubeLink: JSON.parse(user?.socialLinks ?? '[]')[3],
      linkedinLink: JSON.parse(user?.socialLinks ?? '[]')[2],
      certificates: data?.pages?.map(item => item?.url),
      specialities: specialtiesData?.pages?.map(item => item?.title),
    },
    mode: 'onChange',
  });
  const {handleSubmit, register, setValue, control, formState} = methods;

  const {} = useHeader({
    title: {children: 'Edit Profile', fontSize: 'lg', fontWeight: 'bold'},
    hasBack: true,
  });

  useEffect(() => {
    if (user) {
      setValue('fullName', user?.fullName),
        setValue('about', user?.about),
        setValue('photoUrl', user?.photoUrl || ''),
        setValue('username', user?.username),
        setValue('profession', user?.profession),
        setValue(
          'instagramLink',
          JSON.parse(user?.socialLinks ?? '[]')[0] ?? '',
        ),
        setValue(
          'facebookLink',
          JSON.parse(user?.socialLinks ?? '[]')[1] ?? '',
        ),
        setValue('youtubeLink', JSON.parse(user?.socialLinks ?? '[]')[3] ?? ''),
        setValue(
          'linkedinLink',
          JSON.parse(user?.socialLinks ?? '[]')[2] ?? '',
        ),
        setValue(
          'certificates',
          data?.pages?.map(item => item?.url).filter(url => url),
        ),
        setValue(
          'specialities',
          specialtiesData?.pages?.map(item => item?.title),
        );
    }
  }, []);

  const addKeyword = () => {
    setSpecialities([...specialities, text]);
    setValue('specialities', [...specialities, text]);
    setText('');
  };

  const removeKetword = t => {
    setSpecialities([...specialities.filter(item => item !== t)]);
    setValue('specialities', [...specialities.filter(item => item !== t)]);
  };

  useEffect(() => {
    setYearsOfExperience(user?.yearsOfExperience ?? 0);
    setSpecialities(specialtiesData?.pages?.map(item => item?.title));
  }, [user, specialtiesData]);

  const isDisable = !(specialities?.length !== 0 && formState.isValid);

  return (
    <Fragment>
      {isLoading && <LoadIndicator />}
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          contentContainerStyle={styles.mb}
          showsVerticalScrollIndicator={false}>
          <VStack space={'2'}>
            {String(edit) === 'true' && (
              <SelectImage
                title={'Edit Photo'}
                type="profile"
                id={user?.id}
                {...register('photoUrl')}
              />
            )}
            <Accordion title={'About'}>
              <CustomFormInput
                {...register('fullName')}
                placeholder="Full Name"
                label="Full Name"
                required
              />
              <CustomFormInput
                {...register('about')}
                placeholder="Tell us about yourself..."
                label="About"
                maxLength={300}
                showCharCounter={true}
                textArea={true}
                required
              />
            </Accordion>
            <Accordion title={'Profession'}>
              <CustomFormInput
                {...register('profession')}
                placeholder="Ex: Designer"
                label="Profession"
                required
              />

              <Typography style={styles.label}>
                Years of Experience
                <Typography
                  color={'error.500'}
                  fontWeight={'500'}
                  fontSize="lg">
                  *
                </Typography>
              </Typography>

              <VStack style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => {
                    if (yearsOfExperience !== 0) {
                      setYearsOfExperience(yearsOfExperience - 1);
                    }
                  }}>
                  <MinusIcon
                    color={getColor({
                      color: 'gray.400',
                    })}
                  />
                </TouchableOpacity>
                <VStack flex={1} mx="2">
                  <Input
                    value={yearsOfExperience?.toString()}
                    onChangeText={t => setYearsOfExperience(Number(t))}
                    p="4"
                    size="2xl"
                    placeholder="0"
                    variant="outline"
                    borderRadius="lg"
                    keyboardType="number-pad"
                    textAlign={'center'}
                    width={'full'}
                  />
                </VStack>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setYearsOfExperience(yearsOfExperience + 1)}>
                  <AddIconSet
                    color={getColor({
                      color: 'gray.400',
                    })}
                  />
                </TouchableOpacity>
              </VStack>

              <Typography style={styles.label}>
                Specialities
                <Typography
                  color={'error.500'}
                  fontWeight={'500'}
                  fontSize="lg">
                  {'*'}
                </Typography>
              </Typography>
              <Input
                value={text}
                placeholder="Ex: # Researcher"
                onChangeText={t =>
                  setText(t.startsWith('#') ? t : '#'.concat(t))
                }
                returnKeyType="done"
                onSubmitEditing={() => addKeyword()}
              />

              <View style={styles.wrapView}>
                {specialities?.map((item: any) => {
                  return (
                    <TouchableOpacity
                      key={item?.id}
                      style={styles.keywordContainer}>
                      <CloseIconSet onPress={() => removeKetword(item)} />
                      <Typography numberOfLines={1}>{item}</Typography>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Accordion>
            <Accordion title={'Social Links'}>
              <CustomFormInput
                {...register('instagramLink')}
                placeholder="Ex: https://www.instagram.com/"
                label="Instagram Link"
              />
              <CustomFormInput
                {...register('facebookLink')}
                placeholder="Ex: https://www.facebook.com/"
                label="Faceebook Link"
              />
              <CustomFormInput
                {...register('linkedinLink')}
                placeholder="Ex: https://www.linkedin.com/"
                label="LinkedIn Link"
              />
              <CustomFormInput
                {...register('youtubeLink')}
                placeholder="Ex: https://www.youtube.com/"
                label="YouTube Link"
              />
            </Accordion>
            <Accordion title={'Certificates'}>
              <UploadFile
                name={'certificates'}
                multiple
                control={control}
                title="Upload Certificate"
                type="image"
              />
            </Accordion>
          </VStack>
        </CustomKeyboardAwareScrollView>
        <SubmitButton
          isLoading={isLoadingProfile}
          disabled={isDisable}
          style={isDisable ? styles.bgBtn : styles.btn}
          _text={isDisable ? styles.txtBtn : {}}
          onPress={handleSubmit(submitForm)}>
          {buttonText ?? isIntroVisited ? 'Save' : 'Next'}
        </SubmitButton>
      </FormProvider>
    </Fragment>
  );

  async function submitForm(formData: any) {
    const input = {
      userId: user?.id,
      userInput: {
        yearsOfExperience: yearsOfExperience,
        userRole: 'educator',
        socialLinks: JSON.stringify([
          formData?.instagramLink ?? '',
          formData?.facebookLink ?? '',
          formData?.linkedinLink ?? '',
          formData?.youtubeLink ?? '',
        ]),
        ...formData,
      },
    };

    delete input?.userInput?.email;
    delete input?.userInput?.specialities;
    delete input?.userInput?.certificates;
    delete input?.userInput?.instagramLink;
    delete input?.userInput?.facebookLink;
    delete input?.userInput?.youtubeLink;
    delete input?.userInput?.linkedinLink;

    updateSpecialties(
      {input: formData?.specialities},
      {
        onSuccess(d) {
          if (d?.specialty_updateSpecialties?.value === 'Success') {
            queryClient.invalidateQueries(['getUserSpecialties']);
          }
        },
      },
    );

    const certif = formData?.certificates
      .map(url => ({url}))
      .filter(url => url);

    updateCertificate(
      {input: certif},
      {
        onSuccess(d) {
          if (d?.certificate_updateCertificates?.value === 'Success') {
            queryClient.invalidateQueries(['getUserCertificates']);
          }
        },
      },
    );

    await updateProfile(input, {
      onSuccess(data) {
        if (data?.user_updateUser?.status?.code === 1) {
          setUser(data?.user_updateUser?.result);
          queryClient.invalidateQueries(['getUsers']);
        }
      },
    });

    toast({
      message: 'Update success!',
      type: 'success',
      containerStyle: styles.toastPosition,
      style: styles.toast,
    });

    queryClient.invalidateQueries(['current_user']);
    queryClient.invalidateQueries(['user_getUsers'], {exact: false});

    navigate.goBack();
  }
};

export default EducatorEditProfile;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 0,
    flex: 1,
  },

  btn: {
    backgroundColor: getColor({color: 'primary.500'}),
    height: verticalScale(40),
    marginTop: verticalScale(10),
    bottom: 5,
  },

  margin: {marginTop: 20},

  mTop: {marginTop: 10},

  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  counterButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'gray.400'}),
  },

  label: {
    fontSize: scale(14),
    marginBottom: 4,
    fontWeight: '500',
    marginTop: 16,
  },

  wrapView: {flexDirection: 'row', flexWrap: 'wrap'},

  keywordContainer: {
    flexDirection: 'row',
    marginRight: 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor({color: 'primary.100'}),
  },

  mb: {paddingBottom: 100},

  txtBtn: {color: getColor({color: 'gray.500'})},

  bgBtn: {
    backgroundColor: getColor({color: 'primary.200'}),
    height: verticalScale(40),
    marginTop: verticalScale(10),
    bottom: 5,
  },

  toastPosition: {
    top: 55,
  },

  toast: {
    backgroundColor: getColor({color: 'success.100'}),
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
