import React, {useCallback, useEffect, useState} from 'react';
import AddInterestActionSheet from './AddInterestActionSheet';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Pressable, StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useQueryClient} from 'react-query';
import {useUpdateProfile} from './hooks';
import {
  useCreateInterest,
  useGetInterest,
} from '../../organisms/Matching/hooks';
import {useNavigation} from '@react-navigation/native';
import {
  Scrollable,
  Typography,
  useToast,
  verticalScale,
  SelectImage,
  CustomFormInput,
  SubmitButton,
  getColor,
  HStack,
  CloseIconSet,
  useNavigate,
  CustomDropdown,
  LoadIndicator,
  VStack,
} from '~/components/elemental';

import useAuthStore from '~/stores/authStore';
import {CustomFormSwitch, useAuth} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import profileStore from '~/stores/profileStore';

const usernameRegExp = /^[a-zA-Z0-9_-]+$/;
const schema = yup.object().shape({
  fullName: yup.string().required('Required'),
  username: yup
    .string()
    .max(20, 'Maximum length allowed is 20 characters')
    .matches(
      usernameRegExp,
      'Username can only contain alphanumeric characters, dashes and underscores',
    )
    .transform((o, c) => (o === '' ? null : c))
    .nullable(),
});

export default function EditProfile({
  edit = true,
  age = false,
  about = false,
  address = false,
  gender = false,
  location = false,
  username = false,
  email = true,
  phone = false,
  interests,
  genderDisplaySwitch = false,
  contactDisplaySwitch = false,
  buttonText,
  postAction,
}: {
  edit: any;
  age: any;
  about: any;
  address: any;
  gender: any;
  location: any;
  username: any;
  email: any;
  phone: any;
  interests?: boolean;
  genderDisplaySwitch?: boolean;
  contactDisplaySwitch?: boolean;
  buttonText?: string;
  postAction?: (values?: any) => boolean;
}) {
  const profileConfigs = profileStore(state => state.profileConfigs);
  const isIntroVisited = useAuthStore(state => state?.isIntroVisited);

  const isSocialModel = isElementInModel('SocialHome');

  const setUser = useAuthStore(state => state?.setUser);
  const {navigateWithName} = useNavigate();
  const {mutateAsync: updateProfile, isLoading: isLoadingProfile} =
    useUpdateProfile();
  const navigate = useNavigation(),
    {toast} = useToast(),
    queryClient = useQueryClient(),
    {user, isLoading, refetch}: any = useAuth(),
    [isOpenModal, setIsOpenModal] = useState(false),
    [interestHolder, setInterestHolder] = useState([]),
    {interests: inters} = useGetInterest({enabled: interests}),
    methods = useForm<Record<string, any>, object>({
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
        gender: {
          value: user?.gender,
          label:
            user?.gender == 'FEMAIL'
              ? 'Female'
              : user?.gender === 'MALE'
              ? 'Male'
              : undefined,
        },
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        displayGender: user?.displayGender,
        displayContactInfo: user?.displayContactInfo,
        username: user?.username,
      },
      mode: 'onChange',
    }),
    {handleSubmit, register, setValue} = methods,
    interestsData = interestHolder.length !== 0 ? interestHolder : inters,
    {mutate: createInterest} = useCreateInterest();
  const setInters = useCallback(() => {
    setInterestHolder(inters);
  }, []);

  useEffect(() => {
    if (inters.length !== 0) {
      setInters();
    }
  }, [inters]);

  useEffect(() => {
    const key = ['match_get_users_interest', {enabled: true}];
    queryClient.invalidateQueries(key);
  }, []);

  const {} = useHeader({
    title: {children: 'Edit Profile', fontSize: 'lg', fontWeight: 'bold'},
    hasBack: true,
  });

  return (
    <>
      {isLoading && <LoadIndicator />}
      <FormProvider {...methods}>
        <Scrollable
          data-id="from-scroll"
          data-name="Scrollable"
          contentContainerStyle={{paddingBottom: 15}}
          style={styles?.container}>
          <VStack space="4">
            {String(edit) === 'true' && (
              <SelectImage
                title={'Edit Photo'}
                type="profile"
                id={user?.id}
                {...register('photoUrl')}
              />
            )}
            <CustomFormInput
              {...register('fullName')}
              placeholder="Full Name"
              label="Full Name"
            />
            {((String(username) === 'true' &&
              !isElementInModel('EducationHome')) ||
              isSocialModel) && (
              <CustomFormInput
                {...register('username')}
                placeholder="sara_snow"
                label="Username"
              />
            )}
            {((String(about) === 'true' &&
              !isElementInModel('EducationHome')) ||
              (isSocialModel && profileConfigs?.about)) && (
              <CustomFormInput
                {...register('about')}
                placeholder="Text More About You"
                label="About"
                maxLength={140}
                showCharCounter={true}
                textArea={true}
              />
            )}
            {(String(gender) === 'true' ||
              (isSocialModel && profileConfigs?.gender)) && (
              <>
                <CustomDropdown
                  {...register('gender')}
                  data={[
                    {label: 'Female', value: 'FEMALE'},
                    {label: 'Male', value: 'MALE'},
                  ]}
                  label="Gender"
                />
                {(genderDisplaySwitch || isSocialModel) && (
                  <CustomFormSwitch
                    label="Display gender in profile"
                    name="displayGender"
                  />
                )}
              </>
            )}
            {String(age) === 'true' &&
              !isElementInModel('EducationHome') &&
              !isSocialModel && (
                <CustomFormInput
                  {...register('age')}
                  placeholder="Age"
                  label="Age"
                />
              )}
            {String(location) === 'true' && !isSocialModel && (
              <CustomFormInput
                {...register('location')}
                placeholder="City"
                label="Location"
              />
            )}
            {String(address) === 'true' && !isSocialModel && (
              <>
                <CustomFormInput
                  {...register('streetAddress')}
                  placeholder="Street Address"
                  label="Street Address"
                />
                <CustomFormInput
                  {...register('unitNumber')}
                  placeholder="Unit Number"
                  label="Unit Number"
                  style={styles.mTop}
                />
                <CustomFormInput
                  {...register('city')}
                  placeholder="City"
                  label="City"
                  style={styles.mTop}
                />
                <CustomFormInput
                  {...register('state')}
                  placeholder="State"
                  label="State"
                  style={styles.mTop}
                />
                <CustomFormInput
                  {...register('zipCode')}
                  placeholder="Zip Code"
                  label="Zip Code"
                  style={styles.mTop}
                />
              </>
            )}
            {String(interests) === 'true' && (
              <>
                <HStack
                  style={styles.margin}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Typography>
                    Interests{' '}
                    <Typography fontWeight={'200'}>(up to 5)</Typography>
                  </Typography>
                  <Pressable onPress={() => setIsOpenModal(true)}>
                    <Typography color={'secondary.500'} fontSize="sm">
                      + Add new
                    </Typography>
                  </Pressable>
                </HStack>
                <HStack flexWrap={'wrap'} space={2} mt={4}>
                  {interestsData?.map((item, index) => (
                    <HStack
                      key={index.toString()}
                      alignItems={'center'}
                      px={2}
                      py={1}
                      mt={1}
                      borderRadius={10}
                      backgroundColor={'primary.100'}>
                      <Pressable onPress={() => onDeleteInterest(index)}>
                        <CloseIconSet
                          color={'gray.800'}
                          width={25}
                          height={25}
                        />
                      </Pressable>
                      <Typography color={'gray.800'} fontSize="sm">
                        {item?.text}
                      </Typography>
                    </HStack>
                  ))}
                </HStack>
              </>
            )}

            <VStack space="4">
              {((String(email) === 'true' && String(phone) === 'true') ||
                (isSocialModel && profileConfigs?.contactOption)) && (
                <Typography fontSize="lg" fontWeight="500">
                  Contact option
                </Typography>
              )}
              {((String(email) === 'true' && !isSocialModel) ||
                (isSocialModel && profileConfigs?.contactOption)) && (
                <CustomFormInput
                  {...register('email')}
                  placeholder="amir@gmail.com"
                  label="Email"
                  disabled
                />
              )}
              {((String(phone) === 'true' && !isSocialModel) ||
                (isSocialModel && profileConfigs?.contactOption)) && (
                <CustomFormInput
                  {...register('phoneNumber')}
                  placeholder="+19199771101"
                  label="Phone"
                />
              )}
              {(contactDisplaySwitch ||
                (isSocialModel && profileConfigs?.contactOption)) && (
                <CustomFormSwitch
                  name="displayContactInfo"
                  label="Display contact info"
                />
              )}
            </VStack>
          </VStack>
        </Scrollable>
        <SubmitButton
          isLoading={isLoadingProfile}
          style={styles.btn}
          onPress={handleSubmit(submitForm)}>
          {buttonText ?? (isIntroVisited || isSocialModel) ? 'Save' : 'Next'}
        </SubmitButton>
      </FormProvider>
      <AddInterestActionSheet
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        setInterests={setInterestHolder}
        interests={interestsData}
      />
    </>
  );

  async function submitForm(formData: any) {
    const input = {
      userId: user?.id,
      userInput: {
        ...formData,
        gender: formData?.gender?.value,
        age: Number(formData?.age),
      },
    };

    const key = ['match_get_users_interest', {enabled: true}];
    const inter = interestsData.map(item => item.text);

    if (inter.length !== 0 && !isSocialModel) {
      await createInterest({interests: inter});

      queryClient.invalidateQueries(key);
    }
    delete input?.userInput?.email;
    await updateProfile(input, {
      onSuccess(data) {
        if (data?.user_updateUser?.status?.code === 1) {
          setUser(data?.user_updateUser?.result);
        }
      },
    });

    if (!isElementInModel('EducationHome')) {
      refetch();
    }
    toast({message: 'Update success!', type: 'success'});

    queryClient.invalidateQueries(['getShoppingCards']);
    queryClient.invalidateQueries(['current_user']);
    queryClient.invalidateQueries(['user_getUsers'], {exact: false});

    if (isElementInModel('EducationHome') || isSocialModel) {
      navigate.goBack();
      return;
    } else if (isIntroVisited) {
      navigateWithName('setting');
    } else {
      navigateWithName('Matching');
    }
    if (!isElementInModel('EducationHome')) {
      postAction?.(formData);
    }
  }

  function onDeleteInterest(index) {
    setInterestHolder(prev => {
      prev.splice(index, 1);

      return [...prev];
    });
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 0,
    flex: 1,
  },
  btn: {
    backgroundColor: getColor({color: 'primary.500'}),
    height: verticalScale(40),
    marginTop: verticalScale(30),
    bottom: 5,
  },
  margin: {marginTop: 20},
  mTop: {marginTop: 10},
});
