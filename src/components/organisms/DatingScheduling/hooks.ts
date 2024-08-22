import {gql} from 'graphql-request';
import {useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export function useCreateAppointmentMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(MATCH_CREATE_APPOINTMENT, args);
  });
}

export function useUpdateAppointmentMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(MATCH_UPDATE_APPOINTMENT, args);
  });
}

const MATCH_CREATE_APPOINTMENT = gql`
  mutation match_createAppointment($input: MatchAppointmentInput) {
    match_createAppointment(input: $input) {
      status
    }
  }
`;
const MATCH_UPDATE_APPOINTMENT = gql`
  mutation match_updateAppointment($input: MatchAppointmentInput) {
    match_updateAppointment(input: $input) {
      status
    }
  }
`;
