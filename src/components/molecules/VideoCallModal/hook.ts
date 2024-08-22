import {gql} from 'graphql-request';
import {useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export function useAcceptVideoCall() {
  return useMutation((args: any) => {
    return graphqlFetcher(ACCEPT_VIDEO_CALL, args);
  });
}

const ACCEPT_VIDEO_CALL = gql`
  mutation vonage_acceptOrRejectVideoCall(
    $vonageSessionId: Int!
    $accepted: Boolean!
  ) {
    vonage_acceptOrRejectVideoCall(
      vonageSessionId: $vonageSessionId
      accepted: $accepted
    ) {
      code
      value
      description
    }
  }
`;
