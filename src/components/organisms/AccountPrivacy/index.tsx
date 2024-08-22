import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {
  CustomFormSwitch,
  HStack,
  LoadIndicator,
  Typography,
  useGetCurrentUser,
} from '~/components';
import {useUpdateUser} from '~/components/molecules/settings/hook';

const AccountPrivacy = () => {
  const {data, refetch, isLoading: currentUserLoading} = useGetCurrentUser();
  const currentUser = data?.user_getCurrentUser?.result;
  useEffect(() => {
    setValue('switchValue', currentUser?.isPrivateAccount ?? false);
  }, [currentUser]);
  const methods = useForm<Record<string, any>, object>({
    mode: 'onChange',
  });
  const {setValue} = methods;
  const {mutate, isLoading} = useUpdateUser();
  const setSwitchValue = value => {
    const userInput = {...currentUser, isPrivateAccount: value};
    delete userInput?.id;
    mutate(
      {userId: currentUser?.id, userInput},
      {
        onSuccess: data => {
          if (data?.user_updateUser?.status?.code === 1) {
            refetch();
          } else {
            setValue('switchValue', !value);
          }
        },
        onError: () => setValue('switchValue', !value),
      },
    );
  };

  return (
    <View>
      {(isLoading || currentUserLoading) && <LoadIndicator />}
      <FormProvider {...methods}>
        <HStack justifyContent="space-between" alignItems="center">
          <Typography fontWeight="500" fontSize="md" color="gray.800">
            Private account
          </Typography>
          <CustomFormSwitch name="switchValue" onValueChange={setSwitchValue} />
        </HStack>
        <Typography
          marginY={'24px'}
          color="gray.500"
          fontSize="sm"
          fontWeight="400">
          When your account is public, your profile and posts can be seen by
          anyone, on or off Instagram, even if they don't havean Instagram
          account When your account is private, only the followers you approve
          can see what you share, including your photos or videos on hashtag and
          location pages, and your followers and following lists. Learn more
        </Typography>
      </FormProvider>
    </View>
  );
};

export default AccountPrivacy;
