import {gql} from 'graphql-request';
import {useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';


export function useVonageCreateSessionToken() {
    return useMutation((args: any) => {
      return graphqlFetcher(VONAGE_CREATE_SESSION_TOKEN, args);
    });
  }

  export const VONAGE_CREATE_SESSION_TOKEN = gql`
  mutation vonage_createTokenForSession($vonageSessionId: Int!) {
    vonage_createTokenForSession(vonageSessionId: $vonageSessionId) {
      result {
        sessionId
        apiKey
        token
      }
      status
    }
  }
`;