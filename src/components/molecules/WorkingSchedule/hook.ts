import {gql} from 'graphql-request';
import {useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';
export function useCreateWorkingSchedules() {
  return useMutation(args => {
    return graphqlFetcher(CREATE_WORKING_SCHEDULES, args);
  });
}
export function useUpdateWorkingSchedule() {
  return useMutation(args => {
    return graphqlFetcher(UPDATE_WORK_SCHEDULE, args);
  });
}
const CREATE_WORKING_SCHEDULE = gql`
  mutation createWorkingSchedule($input: WorkingScheduleInput) {
    workingSchedule_createWorkingSchedule(input: $input) {
      status
    }
  }
`;
const CREATE_WORKING_SCHEDULES = gql`
  mutation createWorkingSchedules($input: [WorkingScheduleInput]) {
    workingSchedule_createWorkingSchedules(input: $input) {
      status
    }
  }
`;
const UPDATE_WORK_SCHEDULE = gql`
  mutation updateWorkingSchedule($input: WorkingScheduleInput) {
    workingSchedule_updateWorkingSchedule(input: $input) {
      status
    }
  }
`;
