import {cache, useQuery, AUTH_KEY, graphqlFetcher} from '..';
import {User, AuthInput, Provider} from '../types/auth';
// import {FirebaseApp} from 'firebase/app';
import auth, {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '764111974266-l082ov3f4vfu8elf0a8mvsvk7694nc3t.apps.googleusercontent.com',
});

export default function useAuth(appName?: string) {
  const {data} = useQuery<{user: any; error: any}>(AUTH_KEY, () => ({
    user: undefined,
    error: undefined,
  }));

  const {user, error} = data || {};

  cache.apply('onLoginSuccess', undefined);
  cache.apply('onError', undefined);

  return {
    user,
    error,
    login,
    getProfile,
    logout,
    register,
    resetPassword,
    setUser,
    setError,
  };

  // function getApp() {
  //   const {data: app} = cache.get(['app', appName]);

  //   return app;
  // }

  function setUser(user?: User) {
    if (JSON.stringify(user || {}) === JSON.stringify(user || {})) return;
    cache.set(AUTH_KEY, {user, error: undefined});
  }

  function setError(error: any) {
    cache.set(AUTH_KEY, {user: undefined, error});
  }

  async function login(input: AuthInput, {onSuccess, onError}: any = {}) {
    try {
      const {
        email,
        password,
        provider,
        // redirectUrl,
        gql,
        // method = 'redirect',
      } = input;

      // setRedirectUrl(redirectUrl);

      if (gql) {
        await AsyncStorage.setItem('gql', gql);
      }

      var unsbscribeSuccess = cache.subscribe('onLoginSuccess', state => {
        if (typeof unsbscribeSuccess !== 'function') return;
        if (state.data) onSuccess?.(state.data);

        unsbscribeSuccess();
      });

      var unsbscribeError = cache.subscribe('onError', state => {
        if (typeof unsbscribeError !== 'function') return;
        if (state.data) onError?.(state.data);

        unsbscribeError();
      });

      if (isValidProvider(provider)) {
        await authWithRedirect(provider);
      } else {
        // try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        if (!response?.user?.email) throw new Error('User Not Found');
        // } catch (error) {
        //   console.log('login with email error', error);
        // }
      }
    } catch (error) {
      setError(error);
      // onError?.(error);
      cache.set('onError', error);

      return error.message;
    }
  }

  async function getProfile(gql, {onSuccess, onError}: any = {}) {
    try {
      const response = await graphqlFetcher(gql);
      const user = getResult(response);

      setUser(user);
      onSuccess?.(user);

      return user;
    } catch (error) {
      onError?.(error);
    }
  }

  async function register<T extends AuthInput>(
    input: T,
    {onSuccess, onError}: any = {},
  ) {
    var unsbscribeSuccess, unsbscribeError;
    try {
      const {
        email,
        password,
        provider,
        gql,
        // redirectUrl,
        // method = 'redirect',
        ...rest
      } = input;

      if (gql) {
        await AsyncStorage.setItem('gql', gql);
      }

      await AsyncStorage.setItem('auth_input', JSON.stringify(rest || {}));

      unsbscribeSuccess = cache.subscribe('onLoginSuccess', state => {
        if (typeof unsbscribeSuccess !== 'function') return;
        if (state.data) onSuccess?.(state.data);

        unsbscribeSuccess();
      });

      unsbscribeError = cache.subscribe('onError', state => {
        if (typeof unsbscribeError !== 'function') return;
        if (state.data) onError?.(state.data);

        unsbscribeError();
      });

      // setRedirectUrl(redirectUrl);

      if (isValidProvider(provider)) {
        authWithRedirect(provider);
      } else {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        if (!response?.user?.email) throw new Error('Faild to create user');
      }
    } catch (error) {
      if (error.toString().includes('email-already-in-use')) {
        await AsyncStorage.removeItem('auth_input');
        console.log('reg ...', error.toString());
        if (typeof unsbscribeSuccess === 'function') unsbscribeSuccess();
        if (typeof unsbscribeError === 'function') unsbscribeError();

        login(input, {onSuccess, onError});

        return;
      }

      setError(error);
      console.log('register error', error);

      // onError?.(error);
      cache.set('onError', error);

      return error.message;
    }
  }

  async function logout({onSuccess, onError}: any = {}) {
    try {
      await firebase.auth().signOut();

      await AsyncStorage.removeItem('firebase_token');
      setUser();
      onSuccess?.();
    } catch (error) {
      setError(error);
      onError?.(error);

      return error.message;
    }
  }

  async function authWithRedirect(provider?: Provider) {
    switch (provider) {
      case 'facebook':
        //authProvider = FacebookAuthProvider;
        break;
      case 'github':
        //authProvider = new GithubAuthProvider();
        break;
      default:
        return await GoogleAuth();
    }
  }

  // function setRedirectUrl(redirectUrl) {
  //   if (redirectUrl) {
  //     localStorage.setItem('redirect', redirectUrl);
  //     window.history.replaceState({}, '', redirectUrl);
  //   }
  // }

  function isValidProvider(provider?: string): provider is Provider {
    return ['facebook', 'google', 'github'].includes(provider);
  }

  async function resetPassword(email: string, {onSuccess, onError}) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);

      onSuccess?.();
    } catch (error) {
      setError(error);
      onError?.(error);

      return error.message;
    }
  }

  async function GoogleAuth() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential =
      firebase.auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
}

export function getResult(object) {
  if (typeof object !== 'object') return;

  const keys = Object.keys(object);

  for (const key of keys) {
    const value = object[key];

    if (key === 'result') return value;

    const result = getResult(value);

    if (result) return result;
  }
}

export function getStatus(object) {
  if (typeof object !== 'object') return;

  const keys = Object.keys(object);

  for (const key of keys) {
    const value = object[key];

    if (key === 'status') return value;

    const result = getStatus(value);

    if (result) return result;
  }
}
