import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import jwtDecode from 'jwt-decode';
import useAuthStore from '~/stores/authStore';
import {APIOptions} from '../../elemental/types/api';
import {GraphQLClient} from 'graphql-request';
import {cache, API} from '../../elemental';
import config from 'config';
import {useToast} from '../Toast';

type FirebaseToken = {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  user_id: string;
  auth_time: number;
  email_verified: boolean;
  firebase: {
    identities: {email?: Array<string>};
    sign_in_provider: 'password' | string;
  };
};

type ElementalProviderProps = {
  children: any;
  firebase?: any;
  api?: APIOptions;
  appName?: string;
  gqlLogin?: string;
};

export const client = new GraphQLClient(config.apiURL, {errorPolicy: 'ignore'});

let isToastShowed = false;

export async function graphqlFetcher<TData, TVariables>(
  GQL: string,
  args?: TVariables,
): Promise<TData> {
  const {toast} = useToast();
  return new Promise(async (resolve, reject) => {
    try {
      const token = useAuthStore.getState().token;

      if (token && isTokenExpired(token)) {
        const idToken = await auth().currentUser?.getIdToken(true);

        useAuthStore.setState({token: idToken});
        client.setHeader('Authorization', `Bearer ${idToken}`);
      } else if (token) {
        client.setHeader('Authorization', `Bearer ${token}`);
      }

      client.setHeader('Accept', 'application/json');

      const result = await client
        .request<TData, TVariables>(GQL, args)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          if (err?.response?.status === 403) {
            if (!isToastShowed) {
              isToastShowed = true;
              toast({
                message: 'Please check network connection.',
                type: 'error',
                containerStyle: {top: 70},
              });
            }
          }
        });
    } catch (e) {
      console.log('Error in graphqlFetcher:', e);
      if (String(e).includes('[auth/internal-error] ') && !isToastShowed) {
        isToastShowed = true;
        toast({
          message: 'Please check network connection.',
          type: 'error',
          containerStyle: {top: 70},
        });
      }
      reject();
    }
  });
}
var login_query;
export default function AuthProvider({
  children,
  firebase,
  gqlLogin,
  api,
  appName,
}: ElementalProviderProps) {
  const strOptions = JSON.stringify(firebase || {});
  const strAPI = JSON.stringify(api || {});
  const {setToken, logout} = useAuthStore(state => state);

  login_query = gqlLogin;

  useEffect(() => {
    const api = JSON.parse(strAPI);

    // client.setEndpoint(api?.apiURL);
    cache.set(API, api);
  }, [strAPI]);

  useEffect(() => {
    //logout();

    const unsubscribe = auth().onIdTokenChanged(async user => {
      try {
        if (!user) return;
        if (user) {
          const idToken = await auth().currentUser?.getIdToken();

          if (idToken) {
            setToken(idToken);

            client.setHeader('Authorization', 'Bearer ' + idToken);
          }
        } else {
          client.setHeader('Authorization', '');
          await logout();
        }
      } catch (error) {
        cache.set('auth', {user: undefined, error});
        cache.set('onError', error);
      }
    });

    return () => unsubscribe();
  }, [strOptions, appName]);

  return children;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const decoded = jwtDecode<FirebaseToken>(token);
  const isExpired = decoded.exp < Date.now() / 1000;

  return isExpired;
};
