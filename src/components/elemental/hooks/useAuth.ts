import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, {firebase} from '@react-native-firebase/auth';
import {gql} from 'graphql-request';
import {useState} from 'react';
import {Alert} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import useIterestStore from '~/stores/interestStore';
import {print} from '~/utils/methods';
import {graphqlFetcher} from '../../atoms/Provider/AuthProvider';
import usePaymentStore from '~/stores/paymentStore';
import datingHomeStore from '~/stores/datingHomeStore';

type signUpTypes = {
  email: string;
  password?: any;
  fullName: string;
  phoneNumber?: any;
  firebaseToken?: any;
};
export default function useAuth() {
  const queryClient = useQueryClient();
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const setUser = useAuthStore(state => state?.setUser);
  const setToken = useAuthStore(state => state?.setToken);
  const setIntro = datingHomeStore(state => state.setIntro);
  const user = useAuthStore(state => state?.user);
  const setIsUserLoggedIn = useAuthStore(state => state?.setIsUserLoggedIn);
  const setIsIntroVisited = useAuthStore(state => state?.setIsIntroVisited);
  const setSelectedCategorys = useIterestStore(
    state => state?.setSelectedCategorys,
  );
  const setPayment = usePaymentStore(state => state?.setPayment);

  const {refetch} = useQuery(
    ['currentUser'],
    () => graphqlFetcher(GET_USER, {}),
    {
      enabled: false,
      onSuccess: async (data: any) => {
        setIsLoginLoading(false);
        setIsSignUpLoading(false);

        const user = data?.user_getCurrentUser?.result;

        if (data?.user_getCurrentUser?.status?.value === 'Success') {
          setIsUserLoggedIn(true);
          const token = await firebase.auth().currentUser.getIdToken();
          setToken(token);
          setUser({
            ...user,
            updatePassword: JSON.parse(user?.data)?.updatePassword,
          });

          setIsIntroVisited(user?.introSeen);
          await queryClient.invalidateQueries();
        } else {
          if (data?.user_getCurrentUser?.status?.value === 'UserNotFound') {
            const currentUser = await firebase.auth().currentUser;
            signUpUser({
              fullName: currentUser?.displayName,
              phoneNumber: currentUser?.phoneNumber,
            });
          } else {
            Alert.alert(
              'Failed',
              data?.user_getCurrentUser?.status?.description ||
                'You have an error while getting user data, please try again!',
            );
          }
        }
      },
      onError: () => {
        setIsLoginLoading(false);
        setIsSignUpLoading(false);

        Alert.alert(
          'Failed',
          'You have an error while getting user data, please try again!',
        );
      },
    },
  );

  const {mutate: signUpUser, mutateAsync: signUpUserAsync} = useMutation({
    mutationFn: (input: any) => graphqlFetcher(SET_USER, {userInput: input}),
    onSuccess: (data: any) => {
      const description = data?.user_signUp?.status?.description;
      print({description});
      setIsSignUpLoading(false);
      const emailVerified = firebase?.auth().currentUser.emailVerified;

      if (description === 'Authentication Failed') {
        Alert.alert('Failed', description, [{onPress: () => {}, text: 'OK'}]);
      } else if (
        !model?.metaData?.configs?.authConfig?.confirmation?.email ||
        emailVerified
      ) {
        refetch();
      }
    },
    onError: () => {
      setIsSignUpLoading(false);

      Alert.alert(
        'Failed',
        'You have an error while registering, please try again!',
      );
    },
  });

  const login = async ({email, password}) => {
    setIsLoginLoading(true);

    try {
      const response = await signInWithEmailAndPassword(email, password);
      const token = await response?.user?.getIdToken();

      if (token) {
        setToken(token);
        refetch();
      }
    } catch (error) {
      setIsLoginLoading(false);
      Alert.alert(
        'Error',
        error.message.includes('we know')
          ? 'Firebase login failed.'
          : String(error.message).replace(/\[.*\]/g, ''),
      );
    }
  };

  const signUp = async ({
    email,
    password,
    fullName,
    phoneNumber,
    firebaseToken,
  }: signUpTypes) => {
    try {
      setIsSignUpLoading(true);

      const response = !firebaseToken
        ? await createUserWithEmailAndPassword(email, password)
        : null;
      const token = firebaseToken || (await response?.user?.getIdToken());
      setToken(token);
      signUpUser({fullName, phoneNumber, email});
    } catch (error) {
      const message = error.message;

      if (message.includes('already-in-use')) {
        try {
          const response = await signInWithEmailAndPassword(email, password);
          const token = await response?.user?.getIdToken();

          setToken(token);

          const data: any = await signUpUserAsync({fullName, phoneNumber});
          const message = data?.user_signUp?.status?.description || '';

          if (message.includes('Already Exists')) refetch();
        } catch (e) {
          Alert.alert('Error', String(error.message).replace(/\[.*\]/g, ''));
        }
      } else {
        setIsSignUpLoading(false);
        Alert.alert(
          'Error',
          message.includes('we know')
            ? 'Firebase login failed'
            : String(error.message).replace(/\[.*\]/g, ''),
        );
      }
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      setIntro(2);
      await auth().signOut();
      await AsyncStorage.clear();
      setIsUserLoggedIn(false);
      setIsIntroVisited(false);
      setSelectedCategorys([]);
      setPayment([]);
    } catch (e) {
      Alert.alert('Logout error', String(e.message).replace(/\[.*\]/g, ''));
    }
  };

  return {
    isLoginLoading,
    isSignUpLoading,
    login,
    signUp,
    user,
    logout,
    signUpUser,
    refetch,
  };
}

async function signInWithEmailAndPassword(email: string, password: string) {
  return await auth().signInWithEmailAndPassword(email, password);
}

async function createUserWithEmailAndPassword(email, password) {
  return await auth().createUserWithEmailAndPassword(email, password);
}

export const GET_USER = gql`
  query user_getCurrentUser {
    user_getCurrentUser {
      status
      result {
        data
        fullName
        email
        phoneNumber
        photoUrl
        id
        about
        profession
        yearsOfExperience
        socialLinks
        userType
        userRole
        introSeen
        createdDate
        lastModifiedDate
        gender
        displayGender
        displayContactInfo
        username
        favoriteCategories
      }
    }
  }
`;

export const SET_USER = gql`
  mutation user_signUp($userInput: UserInput) {
    user_signUp(userInput: $userInput) {
      status
    }
  }
`;
