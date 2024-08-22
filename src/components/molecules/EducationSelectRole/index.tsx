import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  HStack,
  Layer,
  Pressable,
  Screen,
  Typography,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import User3Icon from '~/assets/icons/user3icon';
import {useUpdateUser} from '../SelectRole/hook';
import FemaleIcon from '~/assets/icons/FemaleUser.icon';
import {useNavigation} from '@react-navigation/native';

const EducationSelectRole = () => {
  const {navigateWithName} = useNavigate();
  const navigation = useNavigation<any>();
  const {mutate, isLoading} = useUpdateUser();
  const user = useAuthStore(state => state?.user);
  const setUser = useAuthStore(state => state?.setUser);
  const setIsIntroVisited = useAuthStore(state => state?.setIsIntroVisited);

  const [selectedRole, setSelectedRole] = useState(null);

  const changeRole = () => {
    const userInput = {
      ...user,
      userRole: selectedRole,
      introSeen: selectedRole === 'educator' ? true : false,
    };
    delete userInput?.id;
    mutate(
      {userId: user?.id, userInput},
      {
        onSuccess(data) {
          setUser(data?.user_updateUser?.result);
          if (
            selectedRole === 'educator' ||
            JSON.parse(
              data?.user_updateUser?.result?.favoriteCategories ?? '[]',
            )?.length >= 3
          ) {
            setIsIntroVisited(true);
            navigation.navigate('EducationHome');
          } else {
            navigateWithName('InterestsScreen', {
              isFirst: true,
              multiSelect: true,
              entity: 'educationCategories',
            });
          }
        },
      },
    );
  };
  return (
    <Screen isLoading={isLoading}>
      <Layer style={styles.txtContainer}>
        <Typography style={styles.title}>Who are you?</Typography>
        <Typography style={styles.desc}>
          Choose your role to continue.
        </Typography>
        <HStack space="6">
          <Pressable
            alignItems={'center'}
            onPress={() => setSelectedRole('student')}>
            <VStack
              alignSelf={'center'}
              style={styles.img}
              borderRadius={'full'}
              borderWidth={selectedRole === 'student' ? 3 : 1}
              borderColor={getColor({
                color: selectedRole === 'student' ? 'primary.500' : 'gray.400',
              })}>
              <User3Icon
                width={93}
                height={selectedRole === 'student' ? 93 : 96}
              />
            </VStack>
            <Typography
              fontWeight={selectedRole === 'student' ? '500' : '400'}
              color={selectedRole === 'student' ? 'primary.500' : 'gray.800'}
              style={styles.role}>
              Student
            </Typography>
          </Pressable>
          <Pressable
            alignItems={'center'}
            onPress={() => setSelectedRole('educator')}>
            <VStack
              alignSelf={'center'}
              style={styles.img}
              borderRadius={'full'}
              borderWidth={selectedRole === 'educator' ? 3 : 1}
              borderColor={getColor({
                color: selectedRole === 'educator' ? 'primary.500' : 'gray.400',
              })}>
              <FemaleIcon
                width={93}
                height={selectedRole === 'educator' ? 94 : 97}
              />
            </VStack>
            <Typography
              color={
                selectedRole === 'educator' ? 'primary.500' : 'primary.800'
              }
              fontWeight={selectedRole === 'educator' ? '500' : '400'}
              style={styles.role}>
              Educator
            </Typography>
          </Pressable>
        </HStack>
      </Layer>
      <Button onPress={() => changeRole()}>Next</Button>
    </Screen>
  );
};

export default EducationSelectRole;

const styles = StyleSheet.create({
  desc: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
    lineHeight: 22,
    marginBottom: 56,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },

  txtContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},

  img: {
    width: 96,
    height: 96,
    borderRadius: 100,
    marginBottom: 18,
  },

  role: {
    fontSize: 16,
    lineHeight: 22,
  },
});
